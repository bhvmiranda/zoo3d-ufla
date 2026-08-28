/* ============================================================
   ZOO3D UFLA · motor/placar.js
   Adaptador de classificação (ranking).

   Duas implementações intercambiáveis:
     PlacarLocal  · zero custo, zero servidor, zero dado pessoal.
                    Guarda no navegador do próprio aluno.
     PlacarRemoto · ranking compartilhado da turma. Precisa de um
                    backend. Stub pronto para Supabase (plano gratuito).

   Trocar de um para outro é UMA linha em visualizador.js.
   ============================================================ */

const CHAVE = 'zoo3d:placar:v1';

/* ---------- utilitários ---------- */

function agora() {
  return new Date().toISOString();
}

function ordenar(registros) {
  return [...registros].sort((a, b) => {
    if (b.pontos !== a.pontos) return b.pontos - a.pontos;
    return a.tempoSegundos - b.tempoSegundos;
  });
}

/* ---------- implementação local ---------- */

class PlacarLocal {
  constructor(modeloId) {
    this.modeloId = modeloId;
    this.memoria = [];
    this.persistente = this._testarArmazenamento();
  }

  _testarArmazenamento() {
    // localStorage não existe em alguns ambientes (artifacts).
    // Quando não existir, o placar vive só na sessão.
    try {
      const t = '__zoo3d_teste__';
      window.localStorage.setItem(t, '1');
      window.localStorage.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  }

  _ler() {
    if (!this.persistente) return this.memoria;
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      const todos = bruto ? JSON.parse(bruto) : [];
      return todos.filter((r) => r.modeloId === this.modeloId);
    } catch (e) {
      return this.memoria;
    }
  }

  _escrever(registro) {
    this.memoria.push(registro);
    if (!this.persistente) return;
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      const todos = bruto ? JSON.parse(bruto) : [];
      todos.push(registro);
      // mantém no máximo 300 registros para não crescer sem limite
      const podado = todos.slice(-300);
      window.localStorage.setItem(CHAVE, JSON.stringify(podado));
    } catch (e) {
      /* silencioso: o registro continua em memória */
    }
  }

  async registrar({ apelido, nivel, pontos, acertos, total, tempoSegundos }) {
    const registro = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      modeloId: this.modeloId,
      apelido: (apelido || 'anônimo').slice(0, 24),
      nivel,
      pontos,
      acertos,
      total,
      tempoSegundos,
      quando: agora(),
      local: true,
    };
    this._escrever(registro);
    return registro;
  }

  async listar(nivel = null) {
    const todos = this._ler();
    const filtrados = nivel ? todos.filter((r) => r.nivel === nivel) : todos;
    return ordenar(filtrados);
  }

  async limpar() {
    this.memoria = [];
    if (!this.persistente) return;
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      const todos = bruto ? JSON.parse(bruto) : [];
      const restantes = todos.filter((r) => r.modeloId !== this.modeloId);
      window.localStorage.setItem(CHAVE, JSON.stringify(restantes));
    } catch (e) {
      /* silencioso */
    }
  }

  get compartilhado() {
    return false;
  }

  get aviso() {
    return this.persistente
      ? 'Classificação salva apenas neste navegador. Ninguém mais vê os seus resultados.'
      : 'Classificação válida somente nesta sessão. Ao fechar a página, os resultados são descartados.';
  }
}

/* ---------- implementação remota (stub) ----------
   Para ativar o ranking compartilhado da turma:

   1. Criar projeto gratuito no Supabase.
   2. Criar a tabela:
        create table placar (
          id uuid primary key default gen_random_uuid(),
          modelo_id text not null,
          apelido text not null,
          nivel text not null,
          pontos int not null,
          acertos int not null,
          total int not null,
          tempo_segundos int not null,
          quando timestamptz default now()
        );
   3. Ativar RLS com duas policies: insert liberado para anon,
      select liberado para anon. Nada de update ou delete.
   4. Preencher URL e CHAVE_ANON abaixo (a chave anon é pública
      por design; não é segredo).
   5. Em visualizador.js, trocar a criação do placar.
--------------------------------------------------- */

const SUPABASE_URL = '';       // ex.: https://xxxx.supabase.co
const SUPABASE_ANON = '';      // chave pública anon

class PlacarRemoto {
  constructor(modeloId) {
    this.modeloId = modeloId;
    this.ativo = Boolean(SUPABASE_URL && SUPABASE_ANON);
    this.reserva = new PlacarLocal(modeloId);
  }

  _cabecalhos() {
    return {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    };
  }

  async registrar(dados) {
    if (!this.ativo) return this.reserva.registrar(dados);
    try {
      const corpo = {
        modelo_id: this.modeloId,
        apelido: (dados.apelido || 'anônimo').slice(0, 24),
        nivel: dados.nivel,
        pontos: dados.pontos,
        acertos: dados.acertos,
        total: dados.total,
        tempo_segundos: dados.tempoSegundos,
      };
      const r = await fetch(`${SUPABASE_URL}/rest/v1/placar`, {
        method: 'POST',
        headers: this._cabecalhos(),
        body: JSON.stringify(corpo),
      });
      if (!r.ok) throw new Error('falha ao registrar');
      return (await r.json())[0];
    } catch (e) {
      // sem rede na sala de aula: cai para o local, sem quebrar o jogo
      return this.reserva.registrar(dados);
    }
  }

  async listar(nivel = null) {
    if (!this.ativo) return this.reserva.listar(nivel);
    try {
      const filtroNivel = nivel ? `&nivel=eq.${encodeURIComponent(nivel)}` : '';
      const url =
        `${SUPABASE_URL}/rest/v1/placar` +
        `?modelo_id=eq.${encodeURIComponent(this.modeloId)}${filtroNivel}` +
        `&order=pontos.desc,tempo_segundos.asc&limit=50`;
      const r = await fetch(url, { headers: this._cabecalhos() });
      if (!r.ok) throw new Error('falha ao listar');
      const linhas = await r.json();
      return linhas.map((l) => ({
        id: l.id,
        apelido: l.apelido,
        nivel: l.nivel,
        pontos: l.pontos,
        acertos: l.acertos,
        total: l.total,
        tempoSegundos: l.tempo_segundos,
        quando: l.quando,
        local: false,
      }));
    } catch (e) {
      return this.reserva.listar(nivel);
    }
  }

  async limpar() {
    return this.reserva.limpar();
  }

  get compartilhado() {
    return this.ativo;
  }

  get aviso() {
    return this.ativo
      ? 'Classificação compartilhada com a turma. Use apelido, não o seu nome completo.'
      : 'Servidor não configurado. A classificação está funcionando apenas neste navegador.';
  }
}

/* ---------- fábrica ---------- */

export function criarPlacar(modeloId, modo = 'local') {
  return modo === 'remoto' ? new PlacarRemoto(modeloId) : new PlacarLocal(modeloId);
}

export { PlacarLocal, PlacarRemoto };
