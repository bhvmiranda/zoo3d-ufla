/* ============================================================
   ZOO3D UFLA · motor/visualizador.js
   Motor único. Não editar para criar um modelo novo.
   Um modelo novo = um MODELO + um ESTRUTURAS + uma geometria.

   Convenção de eixos obrigatória para a geometria:
     X  esquerda (-) / direita (+)   → plano SAGITAL
     Y  ventral   (-) / dorsal  (+)  → plano FRONTAL
     Z  posterior (-) / anterior (+) → plano TRANSVERSAL
   ============================================================ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { criarPlacar } from './placar.js';

const NIVEIS = {
  facil:   { rotulo: 'Fácil',   niveisEstrutura: [1],       multiplicador: 1.0, mostraDescricao: true,  mostraColuna: true  },
  medio:   { rotulo: 'Médio',   niveisEstrutura: [1, 2],    multiplicador: 1.5, mostraDescricao: false, mostraColuna: true  },
  dificil: { rotulo: 'Difícil', niveisEstrutura: [1, 2, 3], multiplicador: 2.0, mostraDescricao: false, mostraColuna: false },
};

const PLANOS = [
  { chave: 'sagital',     rotulo: 'Sagital',     eixo: 'x' },
  { chave: 'frontal',     rotulo: 'Frontal',     eixo: 'y' },
  { chave: 'transversal', rotulo: 'Transversal', eixo: 'z' },
];

export function iniciarVisualizador({
  MODELO,
  ESTRUTURAS,
  construirGeometria,
  alvo = document.body,
  modoPlacar = 'local',
}) {
  /* ---------------- estado ---------------- */

  const est = {
    modo: 'explorar',
    nivel: null,
    colunaVisivel: true,
    destacada: null,
    filtroSistema: null,
    filtroIds: null,
    busca: '',
    jogo: null,
    bloqueado: false,
  };

  const porId = new Map();          // id → { estrutura, malhas: [] }
  ESTRUTURAS.forEach((e) => porId.set(e.id, { estrutura: e, malhas: [] }));

  const placar = criarPlacar(MODELO.id, modoPlacar);

  /* ---------------- DOM ---------------- */

  const raiz = document.createElement('div');
  raiz.className = 'zoo3d';
  raiz.dataset.modo = 'explorar';
  raiz.dataset.coluna = 'visivel';
  raiz.innerHTML = montarHTML(MODELO);
  alvo.appendChild(raiz);

  const $ = (sel) => raiz.querySelector(sel);
  const palco = $('.z-palco');
  const sobreposicao = $('.z-sobreposicao');
  const svgGuia = $('.z-sobreposicao svg');
  const rotulo = $('.z-rotulo');
  const linhaGuia = $('.z-linhaguia');
  const lista = $('.z-lista');
  const painelJogo = $('.z-painel-jogo');

  /* ---------------- three.js ---------------- */

  const cena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.01, 5000);

  const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderizador.localClippingEnabled = true;
  renderizador.shadowMap.enabled = true;
  renderizador.shadowMap.type = THREE.PCFSoftShadowMap;
  renderizador.toneMapping = THREE.ACESFilmicToneMapping;
  renderizador.toneMappingExposure = 1.05;
  palco.insertBefore(renderizador.domElement, sobreposicao);

  const controles = new OrbitControls(camera, renderizador.domElement);
  controles.enableDamping = true;
  controles.dampingFactor = 0.08;
  controles.screenSpacePanning = true;

  // ambiente de iluminação: é o que tira o aspecto de plástico dos materiais
  const pmrem = new THREE.PMREMGenerator(renderizador);
  cena.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // iluminação de três pontos, complementar ao ambiente
  cena.add(new THREE.AmbientLight(0xffffff, 0.18));
  const principal = new THREE.DirectionalLight(0xfff4e2, 2.1);
  principal.position.set(3, 5, 4);
  principal.castShadow = true;
  cena.add(principal);
  const preenchimento = new THREE.DirectionalLight(0xbcd6dd, 0.45);
  preenchimento.position.set(-4, 1, 2);
  cena.add(preenchimento);
  const contraluz = new THREE.DirectionalLight(0xffe0a8, 0.35);
  contraluz.position.set(0, -3, -5);
  cena.add(contraluz);

  /* ---------------- geometria ---------------- */

  const grupo = construirGeometria(THREE);
  cena.add(grupo);

  const caixa = new THREE.Box3().setFromObject(grupo);
  const centro = caixa.getCenter(new THREE.Vector3());
  const tamanho = caixa.getSize(new THREE.Vector3());
  const raioModelo = Math.max(tamanho.x, tamanho.y, tamanho.z) * 0.5 || 1;

  // sombra proporcional ao modelo, com plano receptor abaixo da base
  principal.position.copy(centro).add(
    new THREE.Vector3(1.1, 2.0, 1.5).multiplyScalar(raioModelo)
  );
  principal.target.position.copy(centro);
  cena.add(principal.target);
  principal.shadow.mapSize.set(2048, 2048);
  const camSombra = principal.shadow.camera;
  camSombra.left = -raioModelo * 2.4;
  camSombra.right = raioModelo * 2.4;
  camSombra.top = raioModelo * 2.4;
  camSombra.bottom = -raioModelo * 2.4;
  camSombra.near = raioModelo * 0.1;
  camSombra.far = raioModelo * 14;
  camSombra.updateProjectionMatrix();
  principal.shadow.bias = -0.0009;
  principal.shadow.normalBias = 0.02;

  const chao = new THREE.Mesh(
    new THREE.PlaneGeometry(raioModelo * 16, raioModelo * 16),
    new THREE.ShadowMaterial({ opacity: 0.38 })
  );
  chao.rotation.x = -Math.PI / 2;
  chao.position.set(centro.x, caixa.min.y - raioModelo * 0.03, centro.z);
  chao.receiveShadow = true;
  cena.add(chao);

  const semDono = [];
  grupo.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = true;
    o.receiveShadow = true;
    const id = o.userData.estruturaId || o.name;
    const reg = porId.get(id);
    if (!reg) { semDono.push(id || '(sem nome)'); return; }
    o.userData.estruturaId = id;
    const cor = new THREE.Color(reg.estrutura.cor || '#9fb4b8');
    const e = reg.estrutura;
    o.material = new THREE.MeshStandardMaterial({
      color: cor,
      roughness: e.rugosidade ?? 0.68,
      metalness: e.metalicidade ?? 0.0,
      envMapIntensity: e.brilho ?? 0.6,
      flatShading: e.facetado === true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
      emissive: new THREE.Color(0x000000),
      emissiveIntensity: 1,
    });
    o.userData.corBase = cor.clone();
    reg.malhas.push(o);
  });

  const orfas = [];
  porId.forEach((reg, id) => { if (reg.malhas.length === 0) orfas.push(id); });
  if (semDono.length || orfas.length) {
    console.warn(
      '[zoo3d] verificação de integridade\n' +
      (semDono.length ? `  malhas sem estrutura declarada: ${semDono.join(', ')}\n` : '') +
      (orfas.length ? `  estruturas sem malha no modelo: ${orfas.join(', ')}` : '')
    );
  }

  /* ---------------- planos de corte ---------------- */

  const corte = {};
  PLANOS.forEach((p) => {
    corte[p.chave] = {
      ativo: false,
      sinal: 1,
      pos: centro[p.eixo],
      plano: new THREE.Plane(new THREE.Vector3(), 0),
      def: p,
    };
  });

  function atualizarCortes() {
    const ativos = [];
    let nomeAtivo = '';
    PLANOS.forEach((p) => {
      const c = corte[p.chave];
      const n = new THREE.Vector3(
        p.eixo === 'x' ? -c.sinal : 0,
        p.eixo === 'y' ? -c.sinal : 0,
        p.eixo === 'z' ? -c.sinal : 0
      );
      c.plano.normal.copy(n);
      c.plano.constant = c.pos * c.sinal;
      if (c.ativo) { ativos.push(c.plano); nomeAtivo = nomeAtivo ? 'múltiplos planos' : `plano ${p.rotulo.toLowerCase()}`; }
    });
    renderizador.clippingPlanes = ativos;
    const ind = $('.z-plano-ativo');
    ind.textContent = nomeAtivo;
    ind.dataset.visivel = ativos.length > 0 ? 'true' : 'false';
  }

  function pontoVisivel(p) {
    return PLANOS.every((d) => {
      const c = corte[d.chave];
      return !c.ativo || c.plano.distanceToPoint(p) >= -1e-6;
    });
  }

  /* ---------------- câmera ---------------- */

  /* ---------------- câmera e foco ---------------- */

  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focoAtual = { centro: centro.clone(), raio: raioModelo };
  let animCam = null;

  camera.near = raioModelo / 400;
  camera.far = raioModelo * 80;
  camera.updateProjectionMatrix();
  controles.minDistance = raioModelo * 0.06;
  controles.maxDistance = raioModelo * 14;

  function animarCamera(posDestino, alvoDestino, duracao = 520) {
    if (semAnimacao) {
      camera.position.copy(posDestino);
      controles.target.copy(alvoDestino);
      controles.update();
      return;
    }
    animCam = {
      t0: performance.now(),
      dur: duracao,
      p0: camera.position.clone(),
      p1: posDestino.clone(),
      a0: controles.target.clone(),
      a1: alvoDestino.clone(),
    };
  }

  function passoAnimacao() {
    if (!animCam) return;
    const k = Math.min(1, (performance.now() - animCam.t0) / animCam.dur);
    const s = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    camera.position.lerpVectors(animCam.p0, animCam.p1, s);
    controles.target.lerpVectors(animCam.a0, animCam.a1, s);
    if (k >= 1) animCam = null;
  }

  // enquadra a partir do foco corrente: mudar de vista não perde o foco
  function enquadrar(direcao = null, animar = false) {
    const dir = direcao
      ? direcao.clone().normalize()
      : camera.position.clone().sub(controles.target).normalize();
    const base = dir.lengthSq() < 1e-6 ? new THREE.Vector3(0.8, 0.5, 1.2).normalize() : dir;
    // camera.fov é o campo de visão VERTICAL. Em tela retrato (aspect < 1)
    // é a largura que aperta primeiro: sem isso a figura passa da borda
    // lateral em vez de caber, que é o que o celular em pé mostrava.
    const meioFovVertical = (camera.fov * Math.PI) / 360;
    const meioFov = camera.aspect < 1
      ? Math.atan(Math.tan(meioFovVertical) * camera.aspect)
      : meioFovVertical;
    const dist = (focoAtual.raio / Math.tan(meioFov)) * 1.5;
    const novaPos = focoAtual.centro.clone().add(base.multiplyScalar(dist));
    if (animar) animarCamera(novaPos, focoAtual.centro);
    else {
      camera.position.copy(novaPos);
      controles.target.copy(focoAtual.centro);
      controles.update();
    }
  }

  function definirFoco(novoCentro, novoRaio, animar = true) {
    focoAtual.centro.copy(novoCentro);
    focoAtual.raio = Math.max(novoRaio, raioModelo * 0.05);
    enquadrar(null, animar);
  }

  const VISTAS = {
    anterior:  new THREE.Vector3(0, 0, 1),
    posterior: new THREE.Vector3(0, 0, -1),
    dorsal:    new THREE.Vector3(0, 1, 0.001),
    ventral:   new THREE.Vector3(0, -1, 0.001),
    esquerda:  new THREE.Vector3(-1, 0, 0),
    direita:   new THREE.Vector3(1, 0, 0),
  };

  /* ---------------- realce ---------------- */

  function aplicarRealce(id, cor = null) {
    est.destacada = id;
    const algumaAtiva = Boolean(id);
    porId.forEach((reg, chave) => {
      const ativa = chave === id;
      reg.malhas.forEach((m) => {
        m.material.opacity = !algumaAtiva || ativa ? 1 : 0.32;
        m.material.depthWrite = m.material.opacity === 1;
        if (ativa) {
          m.material.emissive.set(cor || 0xf2b23e);
          m.material.emissiveIntensity = cor ? 0.85 : 0.55;
        } else {
          m.material.emissive.set(0x000000);
        }
      });
    });
    lista.querySelectorAll('.z-item').forEach((el) => {
      el.dataset.ativo = el.dataset.id === id ? 'true' : 'false';
    });
    if (id && est.modo === 'explorar') desenharRotulo(id);
    else esconderRotulo();
  }

  function piscar(id, cor, vezes = 3) {
    let n = 0;
    const t = setInterval(() => {
      aplicarRealce(n % 2 === 0 ? id : null, cor);
      if (++n >= vezes * 2) { clearInterval(t); aplicarRealce(null); }
    }, 220);
  }

  /* ---------------- rótulo com linha-guia ---------------- */

  const vetorAux = new THREE.Vector3();

  function desenharRotulo(id) {
    const reg = porId.get(id);
    if (!reg || reg.malhas.length === 0) return esconderRotulo();
    const cx = new THREE.Box3();
    reg.malhas.forEach((m) => cx.expandByObject(m));
    cx.getCenter(vetorAux).project(camera);
    const w = palco.clientWidth, h = palco.clientHeight;
    const px = (vetorAux.x * 0.5 + 0.5) * w;
    const py = (-vetorAux.y * 0.5 + 0.5) * h;
    const paraDireita = px < w * 0.6;
    const lx = Math.max(12, Math.min(w - 12, px + (paraDireita ? 96 : -96)));
    const ly = Math.max(24, Math.min(h - 24, py - 54));
    rotulo.textContent = reg.estrutura.nome;
    rotulo.style.display = 'block';
    rotulo.style.left = paraDireita ? `${lx}px` : 'auto';
    rotulo.style.right = paraDireita ? 'auto' : `${w - lx}px`;
    rotulo.style.top = `${ly}px`;
    linhaGuia.setAttribute('x1', px);
    linhaGuia.setAttribute('y1', py);
    linhaGuia.setAttribute('x2', lx);
    linhaGuia.setAttribute('y2', ly);
    svgGuia.style.display = 'block';
  }

  function esconderRotulo() {
    rotulo.style.display = 'none';
    svgGuia.style.display = 'none';
  }

  /* ---------------- interação com o modelo ---------------- */

  const raio = new THREE.Raycaster();
  const ponteiro = new THREE.Vector2();

  function alvoSob(evento) {
    const r = renderizador.domElement.getBoundingClientRect();
    ponteiro.x = ((evento.clientX - r.left) / r.width) * 2 - 1;
    ponteiro.y = -((evento.clientY - r.top) / r.height) * 2 + 1;
    raio.setFromCamera(ponteiro, camera);
    const hits = raio.intersectObject(grupo, true);
    for (const h of hits) {
      if (!h.object.isMesh) continue;
      if (!pontoVisivel(h.point)) continue;
      const id = h.object.userData.estruturaId;
      if (id && porId.has(id)) return id;
    }
    return null;
  }

  // enquanto o ponteiro está pressionado, o gesto é girar a câmera, não
  // sobrevoar estrutura: raycasting de hover fica pausado, senão o realce
  // pisca a cada pixel de arrasto e atrapalha o giro (queixa recorrente
  // no celular, onde o dedo sempre está "sobre" alguma malha).
  let pressionado = false;

  renderizador.domElement.addEventListener('pointermove', (ev) => {
    if (est.modo !== 'explorar' || est.bloqueado || pressionado) return;
    const id = alvoSob(ev);
    renderizador.domElement.style.cursor = id ? 'pointer' : 'grab';
    if (id !== est.destacada) aplicarRealce(id);
  });

  renderizador.domElement.addEventListener('pointerleave', () => {
    if (est.modo === 'explorar' && !pressionado) aplicarRealce(null);
  });

  let arrastou = false;
  renderizador.domElement.addEventListener('pointerdown', () => {
    arrastou = false;
    pressionado = true;
    renderizador.domElement.style.cursor = 'grabbing';
  });
  renderizador.domElement.addEventListener('pointermove', () => { arrastou = true; }, { capture: true });
  window.addEventListener('pointerup', () => { pressionado = false; });
  renderizador.domElement.addEventListener('pointerup', (ev) => {
    if (arrastou) return;
    const id = alvoSob(ev);
    if (!id) return;
    if (est.modo === 'jogar') responder(id);
    else expandirItem(id, true);
  });

  // duplo clique centraliza a câmera no ponto clicado
  renderizador.domElement.addEventListener('dblclick', (ev) => {
    const r = renderizador.domElement.getBoundingClientRect();
    ponteiro.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
    ponteiro.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
    raio.setFromCamera(ponteiro, camera);
    const hits = raio.intersectObject(grupo, true);
    for (const h of hits) {
      if (!h.object.isMesh || !pontoVisivel(h.point)) continue;
      definirFoco(h.point.clone(), raioModelo * 0.34);
      return;
    }
    definirFoco(centro, raioModelo);
  });

  /* ---------------- coluna lateral ---------------- */

  const sistemas = [...new Set(ESTRUTURAS.map((e) => e.sistema))];

  function estruturasVisiveis() {
    let arr = ESTRUTURAS;
    if (est.filtroIds) arr = arr.filter((e) => est.filtroIds.includes(e.id));
    if (est.filtroSistema) arr = arr.filter((e) => e.sistema === est.filtroSistema);
    if (est.busca) {
      const b = est.busca.toLowerCase();
      arr = arr.filter((e) =>
        e.nome.toLowerCase().includes(b) ||
        (e.sinonimo || '').toLowerCase().includes(b)
      );
    }
    if (est.modo === 'jogar' && est.nivel) {
      arr = arr.filter((e) => NIVEIS[est.nivel].niveisEstrutura.includes(e.nivel));
    }
    return arr;
  }

  function renderizarLista() {
    const arr = estruturasVisiveis();
    const mostrarDesc = est.modo === 'explorar' || NIVEIS[est.nivel]?.mostraDescricao;
    lista.innerHTML = '';
    sistemas.forEach((sis) => {
      const doSistema = arr.filter((e) => e.sistema === sis);
      if (doSistema.length === 0) return;
      const h = document.createElement('div');
      h.className = 'z-grupo-titulo';
      h.textContent = sis;
      lista.appendChild(h);
      doSistema.forEach((e) => {
        const b = document.createElement('button');
        b.className = 'z-item';
        b.dataset.id = e.id;
        b.dataset.expandido = 'false';
        b.innerHTML =
          `<span class="nome">${e.nome}</span>` +
          (mostrarDesc ? `<p class="descricao">${e.descricao}</p>` : '');
        b.addEventListener('mouseenter', () => { if (est.modo === 'explorar') aplicarRealce(e.id); });
        b.addEventListener('mouseleave', () => { if (est.modo === 'explorar') aplicarRealce(null); });
        b.addEventListener('click', () => expandirItem(e.id));
        lista.appendChild(b);
      });
    });
    $('.z-contador').textContent =
      `${arr.length} de ${ESTRUTURAS.length} estruturas` +
      (est.filtroIds ? ' · revisão' : '');
  }

  function expandirItem(id, rolar = false) {
    const el = lista.querySelector(`.z-item[data-id="${id}"]`);
    if (!el) return;
    const abrindo = el.dataset.expandido !== 'true';
    lista.querySelectorAll('.z-item').forEach((o) => { o.dataset.expandido = 'false'; });
    el.dataset.expandido = abrindo ? 'true' : 'false';
    if (rolar) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    aplicarRealce(abrindo ? id : null);
  }

  /* ---------------- jogo ---------------- */

  function embaralhar(a) {
    const c = [...a];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  }

  function iniciarRodada(nivel) {
    est.nivel = nivel;
    est.modo = 'jogar';
    raiz.dataset.modo = 'jogar';
    raiz.dataset.nivel = nivel;
    est.filtroIds = null;
    est.filtroSistema = null;
    est.busca = '';
    $('.z-busca').value = '';

    const cfg = NIVEIS[nivel];
    const elegiveis = ESTRUTURAS.filter((e) => cfg.niveisEstrutura.includes(e.nivel));
    const perguntas = embaralhar(elegiveis).slice(0, Math.min(10, elegiveis.length));

    est.jogo = {
      perguntas,
      indice: 0,
      acertos: 0,
      pontos: 0,
      erradas: [],
      inicio: Date.now(),
    };

    fecharPainel();
    renderizarLista();
    aplicarRealce(null);
    mostrarPergunta();
  }

  function mostrarPergunta() {
    const j = est.jogo;
    const q = j.perguntas[j.indice];
    const cfg = NIVEIS[est.nivel];
    $('.z-jogo-cabecalho .contagem').textContent = `${j.indice + 1} / ${j.perguntas.length}`;
    $('.z-jogo-cabecalho .nivel').textContent = cfg.rotulo;
    $('.z-jogo-cabecalho .pontos').textContent = `${j.pontos} pts`;
    $('.z-pergunta').textContent = q.nome;
    const d = $('.z-pergunta-descricao');
    if (cfg.mostraDescricao) { d.textContent = q.descricao; d.style.display = 'block'; }
    else { d.style.display = 'none'; }
    $('.z-feedback').textContent = '';
    $('.z-feedback').dataset.tipo = '';
    $('.z-progresso i').style.width = `${(j.indice / j.perguntas.length) * 100}%`;
  }

  function responder(idClicado) {
    if (est.bloqueado) return;
    const j = est.jogo;
    const q = j.perguntas[j.indice];
    const fb = $('.z-feedback');
    est.bloqueado = true;

    if (idClicado === q.id) {
      j.acertos += 1;
      j.pontos += Math.round(100 * NIVEIS[est.nivel].multiplicador);
      fb.dataset.tipo = 'acerto';
      fb.textContent = 'Correto.';
      aplicarRealce(q.id, 0x58b57d);
      setTimeout(() => { aplicarRealce(null); avancar(); }, 800);
    } else {
      const errada = porId.get(idClicado)?.estrutura;
      j.erradas.push({ pedida: q, marcada: errada });
      fb.dataset.tipo = 'erro';
      fb.textContent = errada
        ? `Isso é ${errada.nome}. A estrutura pedida está piscando.`
        : 'Não é essa. A estrutura pedida está piscando.';
      aplicarRealce(idClicado, 0xdd5b54);
      setTimeout(() => { piscar(q.id, 0xf2b23e, 2); }, 600);
      setTimeout(() => { aplicarRealce(null); avancar(); }, 2200);
    }
  }

  function avancar() {
    est.bloqueado = false;
    const j = est.jogo;
    j.indice += 1;
    if (j.indice >= j.perguntas.length) encerrarRodada();
    else mostrarPergunta();
  }

  async function encerrarRodada() {
    const j = est.jogo;
    const tempo = Math.round((Date.now() - j.inicio) / 1000);
    j.tempoSegundos = tempo;
    // bônus de ritmo: até 100 pontos, decrescente com o tempo por questão
    const porQuestao = tempo / j.perguntas.length;
    const bonus = Math.max(0, Math.round((20 - porQuestao) * 5));
    j.pontos += j.acertos === j.perguntas.length ? bonus : 0;
    await abrirResultado();
  }

  /* ---------------- painéis ---------------- */

  function fecharPainel() { painelJogo.dataset.visivel = 'false'; painelJogo.innerHTML = ''; }

  function abrirSelecaoNivel() {
    painelJogo.dataset.visivel = 'true';
    painelJogo.innerHTML = `
      <div class="z-cartao">
        <h2>Modo jogo</h2>
        <p class="sub">Uma estrutura é pedida por vez. Clique nela no modelo. Dez perguntas por rodada, sem repetição.</p>
        <div class="z-niveis">
          ${Object.entries(NIVEIS).map(([k, v]) => {
            const n = ESTRUTURAS.filter((e) => v.niveisEstrutura.includes(e.nivel)).length;
            const apoio = k === 'facil'
              ? 'Coluna lateral com nomes e descrições completas.'
              : k === 'medio'
                ? 'Coluna lateral apenas com os nomes, sem descrição.'
                : 'Sem coluna lateral. Nenhum apoio na tela.';
            return `<button class="z-nivel" data-nivel="${k}">
              <strong>${v.rotulo}</strong>
              <span>${apoio} ${n} estruturas no conjunto.</span>
              <em>pontuação x${v.multiplicador.toFixed(1)}</em>
            </button>`;
          }).join('')}
        </div>
        <div class="z-acoes" style="margin-top:20px">
          <button class="z-botao secundario" data-acao="classificacao">Ver classificação</button>
          <button class="z-botao secundario" data-acao="voltar">Voltar a explorar</button>
        </div>
      </div>`;
    painelJogo.querySelectorAll('.z-nivel').forEach((b) =>
      b.addEventListener('click', () => iniciarRodada(b.dataset.nivel)));
    painelJogo.querySelector('[data-acao="voltar"]').addEventListener('click', irParaExplorar);
    painelJogo.querySelector('[data-acao="classificacao"]').addEventListener('click', () => abrirClassificacao());
  }

  async function abrirResultado() {
    const j = est.jogo;
    const total = j.perguntas.length;
    const erradasUnicas = [...new Map(j.erradas.map((e) => [e.pedida.id, e.pedida])).values()];
    painelJogo.dataset.visivel = 'true';
    painelJogo.innerHTML = `
      <div class="z-cartao">
        <h2>${j.acertos === total ? 'Rodada perfeita' : 'Fim da rodada'}</h2>
        <p class="sub">${NIVEIS[est.nivel].rotulo} · ${MODELO.titulo}</p>
        <div class="z-resumo">
          <div><strong>${j.pontos}</strong><span>pontos</span></div>
          <div><strong>${j.acertos}</strong><span>acertos</span></div>
          <div><strong>${total - j.acertos}</strong><span>erros</span></div>
          <div><strong>${j.tempoSegundos}s</strong><span>tempo</span></div>
        </div>
        ${erradasUnicas.length ? `<div class="z-erradas">
          <b>Estruturas a revisar:</b><br>${erradasUnicas.map((e) => e.nome).join(' · ')}
        </div>` : ''}
        <div class="z-apelido">
          <input class="z-campo-apelido" maxlength="24" placeholder="Seu apelido para a classificação">
          <button class="z-botao" data-acao="salvar">Registrar</button>
        </div>
        <p class="z-aviso">${placar.aviso}</p>
        <div class="z-acoes">
          ${erradasUnicas.length ? '<button class="z-botao secundario" data-acao="revisar">Revisar essas estruturas</button>' : ''}
          <button class="z-botao secundario" data-acao="denovo">Jogar de novo</button>
          <button class="z-botao secundario" data-acao="voltar">Voltar a explorar</button>
        </div>
      </div>`;

    const campo = painelJogo.querySelector('.z-campo-apelido');
    campo.value = localStorageSeguro('zoo3d:apelido') || '';
    painelJogo.querySelector('[data-acao="salvar"]').addEventListener('click', async (ev) => {
      const apelido = campo.value.trim() || 'anônimo';
      localStorageSeguro('zoo3d:apelido', apelido);
      ev.target.disabled = true;
      ev.target.textContent = 'Registrado';
      await placar.registrar({
        apelido, nivel: NIVEIS[est.nivel].rotulo,
        pontos: j.pontos, acertos: j.acertos, total, tempoSegundos: j.tempoSegundos,
      });
      abrirClassificacao(apelido);
    });
    const rev = painelJogo.querySelector('[data-acao="revisar"]');
    if (rev) rev.addEventListener('click', () => {
      est.filtroIds = erradasUnicas.map((e) => e.id);
      irParaExplorar();
    });
    painelJogo.querySelector('[data-acao="denovo"]').addEventListener('click', abrirSelecaoNivel);
    painelJogo.querySelector('[data-acao="voltar"]').addEventListener('click', irParaExplorar);
  }

  async function abrirClassificacao(destaque = null) {
    const registros = await placar.listar();
    painelJogo.dataset.visivel = 'true';
    painelJogo.innerHTML = `
      <div class="z-cartao">
        <h2>Classificação</h2>
        <p class="sub">${MODELO.titulo}</p>
        <p class="z-aviso">${placar.aviso}</p>
        ${registros.length === 0
          ? '<p class="sub">Nenhum resultado registrado ainda.</p>'
          : `<table class="z-tabela">
              <thead><tr><th></th><th>Apelido</th><th>Nível</th><th>Acertos</th><th>Tempo</th><th style="text-align:right">Pontos</th></tr></thead>
              <tbody>${registros.slice(0, 20).map((r, i) => `
                <tr data-eu="${destaque && r.apelido === destaque ? 'true' : 'false'}">
                  <td class="pos">${i + 1}</td>
                  <td class="nome">${r.apelido}</td>
                  <td>${r.nivel}</td>
                  <td>${r.acertos}/${r.total}</td>
                  <td>${r.tempoSegundos}s</td>
                  <td class="pts">${r.pontos}</td>
                </tr>`).join('')}</tbody>
            </table>`}
        <div class="z-acoes">
          <button class="z-botao" data-acao="jogar">Nova rodada</button>
          <button class="z-botao secundario" data-acao="voltar">Voltar a explorar</button>
        </div>
      </div>`;
    painelJogo.querySelector('[data-acao="jogar"]').addEventListener('click', abrirSelecaoNivel);
    painelJogo.querySelector('[data-acao="voltar"]').addEventListener('click', irParaExplorar);
  }

  function irParaExplorar() {
    est.modo = 'explorar';
    est.nivel = null;
    est.jogo = null;
    est.bloqueado = false;
    raiz.dataset.modo = 'explorar';
    raiz.removeAttribute('data-nivel');
    fecharPainel();
    atualizarAlternador();
    renderizarLista();
    aplicarRealce(null);
  }

  function localStorageSeguro(chave, valor) {
    try {
      if (valor === undefined) return window.localStorage.getItem(chave);
      window.localStorage.setItem(chave, valor);
      return valor;
    } catch (e) { return null; }
  }

  /* ---------------- controles da interface ---------------- */

  function atualizarAlternador() {
    raiz.querySelectorAll('.z-alternador button').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.modo === est.modo ? 'true' : 'false');
    });
  }

  raiz.querySelectorAll('.z-alternador button').forEach((b) =>
    b.addEventListener('click', () => {
      if (b.dataset.modo === 'jogar') { est.modo = 'jogar'; raiz.dataset.modo = 'jogar'; atualizarAlternador(); abrirSelecaoNivel(); }
      else irParaExplorar();
    }));

  raiz.querySelector('.z-aba-coluna').addEventListener('click', () => {
    est.colunaVisivel = !est.colunaVisivel;
    raiz.dataset.coluna = est.colunaVisivel ? 'visivel' : 'oculta';
    raiz.querySelector('.z-aba-coluna').textContent = est.colunaVisivel ? '›' : '‹';
    redimensionar();
  });

  let controlesVisiveis = true;
  raiz.querySelector('.z-aba-controles').addEventListener('click', () => {
    controlesVisiveis = !controlesVisiveis;
    raiz.dataset.controles = controlesVisiveis ? 'visivel' : 'oculto';
    raiz.querySelector('.z-aba-controles').textContent = controlesVisiveis ? '‹' : '›';
  });

  raiz.querySelectorAll('.z-vistas button[data-vista]').forEach((b) =>
    b.addEventListener('click', () => enquadrar(VISTAS[b.dataset.vista].clone(), true)));

  $('.z-reset').addEventListener('click', () => definirFoco(centro, raioModelo));

  // botões de foco declarados pelo modelo em MODELO.focos
  const blocoFocos = $('.z-bloco-focos');
  if (Array.isArray(MODELO.focos) && MODELO.focos.length) {
    const caixaFocos = blocoFocos.querySelector('.z-focos');
    const lista = [
      ...MODELO.focos,
      { nome: 'conjunto', centro: [centro.x, centro.y, centro.z], raio: raioModelo },
    ];
    lista.forEach((f) => {
      const b = document.createElement('button');
      b.textContent = f.nome;
      b.addEventListener('click', () =>
        definirFoco(new THREE.Vector3(...f.centro), f.raio ?? raioModelo * 0.4));
      caixaFocos.appendChild(b);
    });
  } else {
    blocoFocos.remove();
  }

  PLANOS.forEach((p) => {
    const linha = raiz.querySelector(`.z-corte-linha[data-plano="${p.chave}"]`);
    const chk = linha.querySelector('input[type=checkbox]');
    const rng = linha.querySelector('input[type=range]');
    const min = caixa.min[p.eixo], max = caixa.max[p.eixo];
    rng.min = min; rng.max = max; rng.step = (max - min) / 200 || 0.01; rng.value = centro[p.eixo];
    chk.addEventListener('change', () => {
      corte[p.chave].ativo = chk.checked;
      linha.dataset.ativo = chk.checked ? 'true' : 'false';
      atualizarCortes();
    });
    rng.addEventListener('input', () => { corte[p.chave].pos = parseFloat(rng.value); atualizarCortes(); });
    linha.querySelector('.z-inverter').addEventListener('click', () => {
      corte[p.chave].sinal *= -1; atualizarCortes();
    });
  });

  $('.z-busca').addEventListener('input', (e) => { est.busca = e.target.value; renderizarLista(); });

  const filtros = $('.z-filtros');
  filtros.innerHTML =
    `<button data-sis="" aria-pressed="true">todos</button>` +
    sistemas.map((s) => `<button data-sis="${s}" aria-pressed="false">${s}</button>`).join('');
  filtros.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      est.filtroSistema = b.dataset.sis || null;
      est.filtroIds = null;
      filtros.querySelectorAll('button').forEach((o) =>
        o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
      renderizarLista();
    }));

  /* ---------------- régua de escala ---------------- */

  const barra = $('.z-escala .barra');
  const valorEscala = $('.z-escala .valor');

  function numeroRedondo(v) {
    const exp = Math.floor(Math.log10(v));
    const base = Math.pow(10, exp);
    const m = v / base;
    const escolha = m >= 5 ? 5 : m >= 2 ? 2 : 1;
    return escolha * base;
  }

  function atualizarEscala() {
    const dist = camera.position.distanceTo(controles.target);
    const alturaVisivel = 2 * Math.tan((camera.fov * Math.PI) / 360) * dist;
    const mundoPorPixel = alturaVisivel / palco.clientHeight;
    const realPorUnidade = MODELO.escala?.realPorUnidade ?? 1;
    const unidade = MODELO.escala?.unidade ?? 'mm';
    const bruto = 130 * mundoPorPixel * realPorUnidade;
    if (!isFinite(bruto) || bruto <= 0) return;
    const bonito = numeroRedondo(bruto);
    const px = bonito / realPorUnidade / mundoPorPixel;
    barra.style.width = `${Math.max(30, Math.min(220, px))}px`;
    const texto = bonito >= 1 ? bonito.toLocaleString('pt-BR') : bonito.toPrecision(2);
    valorEscala.textContent = `${texto} ${unidade}`;
  }

  /* ---------------- laço ---------------- */

  function redimensionar() {
    const w = palco.clientWidth, h = palco.clientHeight;
    if (w === 0 || h === 0) return;
    const aspectAntigo = camera.aspect;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderizador.setSize(w, h, false);
    sobreposicao.style.width = `${w}px`;
    sobreposicao.style.height = `${h}px`;
    // aspecto mudou de verdade (girar o celular, recolher a coluna): a
    // distância da câmera foi calculada pro aspecto anterior e precisa
    // reenquadrar, senão a figura fica descentralizada ou cortada.
    if (Math.abs(camera.aspect - aspectAntigo) > 0.01) enquadrar();
  }

  const observador = new ResizeObserver(redimensionar);
  observador.observe(palco);
  window.addEventListener('resize', redimensionar);

  function laco() {
    requestAnimationFrame(laco);
    passoAnimacao();
    controles.update();
    if (est.destacada && est.modo === 'explorar') desenharRotulo(est.destacada);
    atualizarEscala();
    renderizador.render(cena, camera);
  }

  /* ---------------- partida ---------------- */

  atualizarCortes();
  enquadrar();
  redimensionar();
  renderizarLista();
  atualizarAlternador();
  esconderRotulo();
  laco();

  return {
    destacar: aplicarRealce,
    enquadrar,
    focar: definirFoco,
    jogar: abrirSelecaoNivel,
    explorar: irParaExplorar,
    cena, camera, grupo, porId,
  };
}

/* ============================================================
   Casca HTML
   ============================================================ */

function montarHTML(M) {
  const vistas = [
    ['anterior', 'anterior'], ['dorsal', 'dorsal'], ['esquerda', 'lat. esq.'],
    ['posterior', 'posterior'], ['ventral', 'ventral'], ['direita', 'lat. dir.'],
  ];
  return `
  <div class="z-palco">
    <div class="z-sobreposicao">
      <svg><line class="z-linhaguia" x1="0" y1="0" x2="0" y2="0"></line></svg>
      <div class="z-rotulo"></div>
    </div>

    <div class="z-topo">
      <div class="z-identificacao">
        <h1>${M.titulo}</h1>
        <p>${[M.disciplina, M.aula, M.grupo].filter(Boolean).join(' · ')}</p>
      </div>
      <div class="z-alternador">
        <button data-modo="explorar" aria-pressed="true">Explorar</button>
        <button data-modo="jogar" aria-pressed="false">Jogar</button>
      </div>
    </div>

    <div class="z-plano-ativo" data-visivel="false"></div>

    <div class="z-controles">
      <div class="z-bloco">
        <h2>Planos de corte</h2>
        <div class="z-corte">
          ${['sagital', 'frontal', 'transversal'].map((p) => `
            <div class="z-corte-linha" data-plano="${p}" data-ativo="false">
              <input type="checkbox" id="chk-${p}">
              <label for="chk-${p}">${p[0].toUpperCase() + p.slice(1)}</label>
              <button class="z-inverter" title="Inverter o lado removido">inverter</button>
              <input type="range">
            </div>`).join('')}
        </div>
      </div>
      <div class="z-bloco z-bloco-focos">
        <h2>Foco</h2>
        <div class="z-vistas z-focos"></div>
        <p class="z-dica">duplo clique no modelo centraliza no ponto</p>
      </div>
      <div class="z-bloco">
        <h2>Vistas</h2>
        <div class="z-vistas">
          ${vistas.map(([v, r]) => `<button data-vista="${v}">${r}</button>`).join('')}
        </div>
        <button class="z-mini z-reset" style="width:100%;margin-top:5px">ver o conjunto</button>
      </div>
    </div>
    <button class="z-aba-controles" aria-label="Mostrar ou esconder os controles">‹</button>

    <div class="z-escala">
      <span class="valor">—</span>
      <div class="barra"></div>
      <span class="real">${M.dimensaoReal || ''}</span>
    </div>

    <div class="z-jogo">
      <div class="z-jogo-cabecalho">
        <span class="nivel"></span><span class="contagem"></span><span class="pontos"></span>
      </div>
      <p class="z-pergunta"></p>
      <p class="z-pergunta-descricao"></p>
      <p class="z-instrucao">Clique na estrutura correspondente no modelo.</p>
      <div class="z-progresso"><i style="width:0%"></i></div>
      <p class="z-feedback"></p>
    </div>

    <div class="z-painel-jogo" data-visivel="false"></div>
  </div>

  <button class="z-aba-coluna" title="Mostrar ou ocultar a coluna de estruturas">›</button>

  <aside class="z-coluna">
    <div class="z-coluna-topo">
      <input class="z-busca" type="search" placeholder="Buscar estrutura">
      <div class="z-filtros"></div>
      <p class="z-contador"></p>
    </div>
    <div class="z-lista"></div>
    ${M.simplificacoes ? `<div class="z-nota"><b>O que este modelo simplifica:</b> ${M.simplificacoes}</div>` : ''}
  </aside>`;
}
