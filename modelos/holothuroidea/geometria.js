/* ============================================================
   ZOO3D UFLA · modelos/holothuroidea/geometria.js
   GBI109 · Aula 2 · Echinodermata · classe Holothuroidea

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 25.
            Diagnose de Holothuroidea: corpo carnoso, vermiforme, alongado
            ao longo do eixo oral-aboral; esqueleto geralmente reduzido a
            ossículos isolados embebidos na parede corporal; simetria
            pentarradial evidenciada nos tentáculos circum-orais, derivados
            diretamente do vaso radial; madreporito suspenso do canal pétreo
            DENTRO do celoma; círculo de tentáculos alimentares ao redor da
            boca. Ambulacros C e D formam o BÍVIO; raios A, B e E formam o
            TRÍVIO. Ordem Aspidochirotida: pés tubulares formando sola
            achatada na face inferior, árvores respiratórias presentes.
            Túbulos de Cuvier em Holothuria forskali.
          · Slides de GBI109 de Marcel Gustavo Hermes e Renato Gregorin.
            Árvore respiratória e túbulos de Cuvier como blocos da aula.
          · Atlas de Aulas Práticas em Zoologia de Deuterostomados, UFLA.
   IMAGEM · Dissecção de Holothuria em vista dorsal aberta, mostrando
            intestino em alça tripla, árvores respiratórias e gônada;
            ossículos em microscopia, tipos roda e âncora.
   VÍDEO  · Evisceração e expulsão dos túbulos de Cuvier; deslocamento
            sobre a sola de pés ambulacrais.

   O animal está deitado, como no fundo do mar: eixo oral-aboral na
   horizontal. Boca à frente, cloaca atrás. Essa é a origem da
   bilateralidade secundária desta classe.

   Eixos: Z = eixo oral-aboral (oral em −Z) · Y = dorsal/ventral · X = lados
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'holothuroidea',
  titulo: 'Holothuroidea: pepino-do-mar',
  disciplina: 'GBI109',
  aula: 'Aula 2 · Echinodermata',
  grupo: 'Holothuroidea',
  dimensaoReal: 'corpo de 15 a 30 cm de comprimento',
  escala: { realPorUnidade: 28, unidade: 'mm' },
  simplificacoes: [
    'Corpo do tipo Aspidochirotida, com sola ventral de pés e árvores respiratórias. Em Apodida não há pés nem árvores respiratórias.',
    'Dez tentáculos orais. O número varia de dez a mais de vinte conforme a ordem.',
    'Os ossículos aparecem em uma janela da parede e em tamanho MUITO exagerado: no animal são microscópicos, da ordem de décimos de milímetro, e não seriam visíveis nesta escala.',
    'Intestino representado com três alças, que é o padrão, mas com comprimento reduzido.',
    'Número de pés ambulacrais e de papilas reduzido para manter a leitura da forma.',
  ],
  focos: [
    { nome: 'extremidade oral', centro: [0, 0, -3.4], raio: 2.2 },
    { nome: 'extremidade aboral', centro: [0, 0, 3.4], raio: 2.2 },
    { nome: 'meio do corpo', centro: [0, 0, 0], raio: 2.2 },
    { nome: 'face ventral', centro: [0, -1.4, 0], raio: 3.4 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'polo-oral',
    nome: 'Polo oral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Extremidade onde está a boca, cercada pela coroa de tentáculos. Nas outras quatro classes este polo aponta para baixo ou para cima; aqui ele aponta para a frente, porque o animal deitou sobre um dos lados. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'polo-aboral',
    nome: 'Polo aboral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Extremidade oposta à boca, ocupada pela cloaca e pelo ânus. O alongamento do eixo oral-aboral é a transformação que define o plano corporal desta classe. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'trivio',
    nome: 'Trívio',
    sinonimo: 'ambulacros ventrais, raios A, B e E',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Os três ambulacros que ficaram voltados para o substrato quando o animal deitou. Concentram pés ambulacrais com ventosa e formam uma sola achatada de reptação. É a face funcionalmente ventral do animal, e a origem da bilateralidade secundária de Holothuroidea.',
  },
  {
    id: 'bivio',
    nome: 'Bívio',
    sinonimo: 'ambulacros dorsais, raios C e D',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Os dois ambulacros que ficaram voltados para cima. Os pés perdem a função locomotora e viram papilas sensoriais, sem ventosa. Trívio e bívio somados são os cinco ambulacros do plano pentarradial: a simetria continua lá, só deixou de ser aparente.',
  },
  {
    id: 'interambulacro',
    nome: 'Interambulacro',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'As faixas de parede corporal entre dois ambulacros vizinhos, sem pés nem papilas. Aqui elas são muito mais extensas que nas outras classes, porque o corpo se alongou no eixo oral-aboral.',
  },
  {
    id: 'parede-corporal',
    nome: 'Parede corporal',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.9,
    descricao:
      'Espessa, carnosa e flexível, com derme rica em colágeno mutável, capaz de passar de rígida a fluida em segundos. Substitui funcionalmente a carapaça que o ouriço tem: aqui o esqueleto se reduziu a ossículos soltos dentro dela. A face interna aparece quando se aplica um plano de corte.',
  },
  {
    id: 'ossiculo',
    nome: 'Ossículo',
    sinonimo: 'espícula, ossículo dérmico',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Peças microscópicas de estereoma embebidas na parede corporal, em formas de roda, âncora, mesa ou botão. É tudo o que restou do endoesqueleto rígido do filo, e a forma dos ossículos é o principal caráter usado na identificação das espécies. ATENÇÃO: aqui aparecem em uma janela da parede e MUITO ampliados.',
  },
  {
    id: 'tentaculo',
    nome: 'Tentáculo oral',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Coroa de dez a vinte tentáculos ramificados ao redor da boca. NÃO são estruturas novas: são pés ambulacrais modificados, derivados diretamente do vaso radial, e por isso funcionam pelo mesmo mecanismo hidráulico. Recolhem depósito do fundo ou filtram partículas em suspensão, conforme a ordem.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura anterior, no centro da coroa de tentáculos. Os tentáculos são levados um a um até ela, que os limpa como quem lambe os dedos. Em muitas espécies pode ser retraída para dentro do corpo por músculos retratores.',
  },
  {
    id: 'pe-ambulacral',
    nome: 'Pé ambulacral',
    sinonimo: 'pé tubular, pódio',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Restrito ao trívio, com ventosa, agrupado em uma sola de reptação. Funciona pelo mesmo mecanismo de ampola e válvula das outras classes. Em Apodida e Molpadida os pés desapareceram por completo e a locomoção passou a ser peristáltica, como a de uma minhoca.',
  },
  {
    id: 'papila',
    nome: 'Papila',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.peTubular,
    descricao:
      'Projeções cônicas do bívio, sem ventosa, com função sensorial e não locomotora. São pés ambulacrais que perderam a função original quando aquela face deixou de tocar o substrato.',
  },
  {
    id: 'anel-calcario',
    nome: 'Anel calcário',
    sinonimo: 'anel perifaríngeo',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Círculo de dez placas de estereoma ao redor da faringe, cinco radiais e cinco interradiais. Serve de inserção para os músculos retratores e para a musculatura longitudinal da parede. É a peça esquelética mais conspícua que restou nesta classe, e um bom lembrete de que a pentarradia continua presente por dentro.',
  },
  {
    id: 'faringe',
    nome: 'Faringe',
    sinonimo: 'esôfago',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Trecho curto e muscular que segue à boca, envolvido pelo anel calcário, e conduz ao intestino. Junto com a boca e os tentáculos, forma o complexo que pode ser evertido e depois recolhido.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Tubo longo suspenso por mesentérios, dobrado em três alças: desce até a extremidade aboral, volta à oral e desce de novo, até a cloaca. O comprimento é o que permite extrair matéria orgânica de um sedimento pobre, que é o que a maior parte da classe come.',
  },
  {
    id: 'cloaca',
    nome: 'Cloaca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Câmara muscular final, aberta pelo ânus na extremidade aboral. Não serve só à defecação: é ela que bombeia água para dentro e para fora das árvores respiratórias, várias vezes por minuto. Digestório e respiratório compartilham a mesma porta.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Abertura da cloaca, na extremidade aboral. Por ela sai o sedimento processado, entra e sai a água da respiração, e são expelidos os túbulos de Cuvier na defesa. Em algumas espécies é também a porta de entrada de peixes comensais do gênero Carapus.',
  },
  {
    id: 'arvore-respiratoria',
    nome: 'Árvore respiratória',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Duas estruturas muito ramificadas que partem da cloaca e ocupam boa parte do celoma. A água bombeada pela cloaca entra nelas, e as trocas gasosas acontecem através das paredes finas dos ramos, para o líquido celomático. É uma solução respiratória interna, exclusiva desta classe entre os equinodermos, e contrasta com as pápulas externas de Asteroidea.',
  },
  {
    id: 'tubulo-de-cuvier',
    nome: 'Túbulo de Cuvier',
    sistema: 'defesa',
    nivel: 2,
    cor: CORES.defesa,
    descricao:
      'Feixe de tubos cegos ligados à base da árvore respiratória, presentes em parte das espécies. Sob ataque, o animal os expele violentamente pelo ânus; eles incham, ficam pegajosos e enredam o predador, e em alguns casos são tóxicos. São regenerados depois, assim como as vísceras perdidas na evisceração.',
  },
  {
    id: 'musculo-longitudinal',
    nome: 'Músculo longitudinal',
    sistema: 'muscular',
    nivel: 2,
    cor: CORES.musculo,
    descricao:
      'Cinco faixas musculares que correm por dentro da parede, uma sob cada ambulacro, do anel calcário até a cloaca. Junto com a musculatura circular, produzem os movimentos peristálticos de contração e alongamento do corpo. É a musculatura mais desenvolvida do filo, e reflete a perda da carapaça rígida.',
  },
  {
    id: 'madreporito',
    nome: 'Madreporito',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.madreporito,
    descricao:
      'Aqui ele NÃO se abre para fora: fica suspenso pelo canal pétreo DENTRO do celoma, banhado por líquido celômico e não por água do mar. É a diferença mais marcante do sistema ambulacral desta classe, e uma boa pergunta de prova comparativa com Asteroidea e Echinoidea.',
  },
  {
    id: 'canal-circular',
    nome: 'Canal circular',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ambulacral,
    descricao:
      'Anel ao redor da faringe, junto ao anel calcário. Dele partem os cinco canais radiais que percorrem o corpo inteiro no sentido do comprimento, e também os tentáculos orais.',
  },
  {
    id: 'canal-radial',
    nome: 'Canal radial',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.canalMenor,
    descricao:
      'Cinco canais que correm por dentro da parede, ao longo dos ambulacros, do anel até a extremidade aboral. Alimentam os pés do trívio e as papilas do bívio. Correm bem mais longe aqui do que nas outras classes, porque o corpo se alongou.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Um tufo ÚNICO de túbulos ramificados na região anterior dorsal, abrindo em um gonóporo entre os tentáculos. É a única classe de Echinodermata sem o arranjo de cinco gônadas: mais um efeito da bilateralidade secundária.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const COMP = 8.4;
  const RAIO = 1.5;
  const N_RAIOS = 5;
  const SETOR = TAU / N_RAIOS;
  const XI_A = 0.16;
  const U_VENTRAL = -Math.PI / 2;

  const rz = (t) => RAIO * Math.pow(Math.sin(Math.PI * t), 0.32);
  const zz = (t) => -COMP / 2 + t * COMP;

  const sup = (u, t, folga = 0) => {
    const r = rz(t) + folga;
    const achatar = 1 - 0.24 * Math.max(0, -Math.sin(u));
    return [r * Math.cos(u), r * Math.sin(u) * achatar, zz(t)];
  };

  const T0 = 0.035;
  const T1 = 0.965;
  const tt = (v) => T0 + v * (T1 - T0);

  /* -------- faixas ambulacrais e interambulacrais -------- */

  const faixa = (id, uIni, uFim, nU) =>
    A.superficie(id, {
      nU, nV: 46, u0: 0, u1: 1,
      fn: (a, v) => sup(uIni + a * (uFim - uIni), tt(v)),
    });

  const TRIVIO = [0, 1, 4];
  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = U_VENTRAL + k * SETOR;
    const id = TRIVIO.includes(k) ? 'trivio' : 'bivio';
    faixa(id, u0, u0 + XI_A * SETOR, 5);
    faixa(id, u0, u0 - XI_A * SETOR, 5);
    faixa('interambulacro', u0 + XI_A * SETOR, u0 + (1 - XI_A) * SETOR, 16);
  }

  /* -------- face interna e tampas -------- */

  A.superficie('parede-corporal', {
    nU: 72, nV: 50, fecharU: true, inverter: true,
    fn: (u, v) => sup(u, tt(v), -0.2),
  });
  A.superficie('parede-corporal', {
    nU: 72, nV: 2, fecharU: true, inverter: true,
    fn: (u, v) => sup(u, T0, -0.2 * v),
  });
  A.superficie('parede-corporal', {
    nU: 72, nV: 2, fecharU: true,
    fn: (u, v) => sup(u, T1, -0.2 * v),
  });

  /* -------- polos -------- */

  A.cilindro('polo-oral', 0.34, 0.34, 0.06, [0, 0, -COMP / 2 - 0.7], [0, 0, 1], 24);
  A.cilindro('polo-aboral', 0.34, 0.34, 0.06, [0, 0, COMP / 2 + 0.7], [0, 0, 1], 24);

  /* -------- boca, tentáculos, cloaca, ânus -------- */

  const zOral = zz(T0);
  A.cilindro('boca', 0.4, 0.34, 0.24, [0, 0, zOral + 0.1], [0, 0, 1], 22);

  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    const bx = Math.cos(a) * 0.62;
    const by = Math.sin(a) * 0.62;
    const dir = [bx * 0.7, by * 0.7, 1.5];
    A.cilindro('tentaculo', 0.075, 0.11, 0.8,
      [bx * 1.2, by * 1.2, zOral + 0.5], dir, 8);
    for (let j = 0; j < 5; j++) {
      const b = (j / 5) * TAU;
      A.esfera('tentaculo', 0.13,
        [bx * 1.75 + Math.cos(b) * 0.2, by * 1.75 + Math.sin(b) * 0.2, zOral + 0.95], 8);
    }
  }

  const zAb = zz(T1);
  A.esfera('cloaca', 0.62, [0, 0, zAb + 0.75], 18, [1, 1, 1.3]);
  A.cilindro('anus', 0.16, 0.2, 0.2, [0, 0, zAb - 0.06], [0, 0, 1], 14);

  /* -------- pés do trívio, papilas do bívio -------- */

  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = U_VENTRAL + k * SETOR;
    const doTrivio = TRIVIO.includes(k);
    const n = doTrivio ? 16 : 11;
    for (let i = 0; i < n; i++) {
      const t = T0 + 0.05 + ((i + 0.5) / n) * (T1 - T0 - 0.1);
      for (const lado of [-1, 1]) {
        const u = u0 + lado * 0.13;
        const b = sup(u, t);
        const nr = Math.hypot(b[0], b[1]) || 1;
        const dir = [b[0] / nr, b[1] / nr, 0];
        if (doTrivio) {
          const L = 0.62;
          A.cilindro('pe-ambulacral', 0.075, 0.09, L,
            [b[0] + dir[0] * L * 0.5, b[1] + dir[1] * L * 0.5, b[2]], dir, 8);
          A.cilindro('pe-ambulacral', 0.14, 0.09, 0.05,
            [b[0] + dir[0] * L, b[1] + dir[1] * L, b[2]], dir, 10);
        } else {
          A.cone('papila', 0.1, 0.5,
            [b[0] + dir[0] * 0.24, b[1] + dir[1] * 0.24, b[2]], dir, 7);
        }
      }
    }
  }

  /* -------- ossículos, janela ampliada na parede dorsal -------- */

  let semente = 91;
  const aleat = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };
  for (let i = 0; i < 16; i++) {
    const u = Math.PI / 2 + (aleat() - 0.5) * 0.7;
    const t = 0.44 + (aleat() - 0.5) * 0.14;
    const b = sup(u, t, 0.03);
    const nr = Math.hypot(b[0], b[1]) || 1;
    const dir = [b[0] / nr, b[1] / nr, 0];
    if (i % 2 === 0) {
      A.toro('ossiculo', 0.11, 0.03, b, dir, TAU, 12);
      for (let j = 0; j < 6; j++) {
        const a = (j / 6) * TAU;
        A.caixa('ossiculo', [0.11, 0.02, 0.02],
          [b[0] + dir[0] * 0.0, b[1], b[2]], 0, 0, a);
      }
    } else {
      A.caixa('ossiculo', [0.2, 0.03, 0.05], b, 0, 0, aleat() * 3);
      A.caixa('ossiculo', [0.05, 0.03, 0.16], b, 0, 0, 0);
    }
  }

  /* -------- anel calcário, faringe, sistema ambulacral -------- */

  const zAnel = zz(0.14);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU;
    A.caixa('anel-calcario', [0.2, 0.34, 0.3],
      [Math.cos(a) * 0.6, Math.sin(a) * 0.6, zAnel], -a);
  }
  A.cilindro('faringe', 0.34, 0.36, 1.1, [0, 0, zAnel + 0.2], [0, 0, 1], 18);

  A.toro('canal-circular', 0.5, 0.07, [0, 0, zAnel - 0.28], [0, 0, 1], TAU, 36);
  A.esfera('madreporito', 0.2, [0.25, 0.62, zAnel - 0.5], 14, [1, 1.2, 0.9]);
  A.entre('canal-circular', [0.25, 0.62, zAnel - 0.5], [0.2, 0.46, zAnel - 0.3], 0.055, 8);

  for (let k = 0; k < N_RAIOS; k++) {
    const u = U_VENTRAL + k * SETOR;
    const pontos = [];
    for (let i = 0; i <= 12; i++) {
      const t = 0.12 + (i / 12) * (T1 - 0.16);
      pontos.push(sup(u, t, -0.14));
    }
    A.tubo('canal-radial', [[Math.cos(u) * 0.5, Math.sin(u) * 0.5, zAnel - 0.28], ...pontos], 0.055, 60, 7);

    // músculo longitudinal, faixa larga sob o mesmo ambulacro
    const mus = [];
    for (let i = 0; i <= 12; i++) {
      const t = 0.13 + (i / 12) * (T1 - 0.18);
      mus.push(sup(u, t, -0.3));
    }
    A.tubo('musculo-longitudinal', mus, 0.16, 50, 7);
  }

  /* -------- intestino em três alças -------- */

  const alca = [];
  const empurrar = (u, t, folga) => alca.push(sup(u, t, folga));
  empurrar(0, 0.2, -0.6);
  for (let i = 0; i <= 14; i++) empurrar(0.5, 0.2 + (i / 14) * 0.7, -0.62);
  for (let i = 0; i <= 14; i++) empurrar(2.6, 0.9 - (i / 14) * 0.72, -0.62);
  for (let i = 0; i <= 14; i++) empurrar(4.4, 0.18 + (i / 14) * 0.76, -0.6);
  alca.push([0, 0, zAb + 0.75]);
  A.tubo('intestino', alca, 0.2, 200, 9);

  /* -------- árvores respiratórias e túbulos de Cuvier -------- */

  for (const lado of [-1, 1]) {
    const tronco = [];
    for (let i = 0; i <= 10; i++) {
      const t = 0.94 - (i / 10) * 0.62;
      const b = sup(lado > 0 ? 0.9 : 2.3, t, -0.55);
      tronco.push(b);
    }
    A.tubo('arvore-respiratoria', [[0, 0, zAb + 0.6], ...tronco], 0.13, 60, 8);
    for (let i = 1; i <= 9; i++) {
      const t = 0.9 - (i / 10) * 0.6;
      const b = sup(lado > 0 ? 0.9 : 2.3, t, -0.55);
      for (let j = 0; j < 3; j++) {
        const dx = (aleat() - 0.5) * 0.7;
        const dy = (aleat() - 0.5) * 0.7;
        A.esfera('arvore-respiratoria', 0.17, [b[0] + dx, b[1] + dy, b[2] + (aleat() - 0.5) * 0.3], 8);
      }
    }
    for (let j = 0; j < 5; j++) {
      const pontos = [
        [0, 0, zAb + 0.62],
        [lado * (0.3 + j * 0.12), -0.3 - j * 0.1, zAb + 1.3],
        [lado * (0.4 + j * 0.14), -0.5 - j * 0.12, zAb + 2.1],
      ];
      A.tubo('tubulo-de-cuvier', pontos, 0.05, 24, 6);
    }
  }

  /* -------- gônada -------- */

  for (let j = 0; j < 9; j++) {
    const pontos = [];
    const fase = (j / 9) * TAU;
    for (let i = 0; i <= 8; i++) {
      const t = 0.17 + (i / 8) * 0.3;
      pontos.push([
        Math.cos(fase) * (0.15 + i * 0.05),
        0.5 + Math.sin(fase) * (0.15 + i * 0.05),
        zz(t),
      ]);
    }
    A.tubo('gonada', pontos, 0.07, 30, 6);
  }

  return A.grupo();
}
