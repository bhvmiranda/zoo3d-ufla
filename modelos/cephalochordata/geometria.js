/* ============================================================
   ZOO3D UFLA · modelos/cephalochordata/geometria.js
   GBI109 · Aula 3 · Cephalochordata · anfioxo (Branchiostoma)

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 27.
            Até 200 fendas branquiais separadas por barras branquiais; as
            fendas funcionam basicamente como estruturas ALIMENTARES e pouco
            contribuem para as trocas gasosas. Endóstilo (= sulco
            hipobranquial) na superfície VENTRAL da faringe, captador de
            iodo, considerado homólogo ao endóstilo dos tunicados e possível
            precursor da tireoide dos vertebrados. Ceco digestivo (= ceco
            hepático, divertículo hepático) projetando-se anteriormente na
            junção faringe-esôfago. Notocorda estendendo-se até a região da
            nadadeira caudal. Câmaras de armazenamento dorsal e ventral
            longitudinais posteriores ao atrióporo. Pregas metapleurais como
            abas finas afastadas da parede do corpo, logo à frente do
            atrióporo. Sangue levado às barras branquiais por artérias
            branquiais aferentes a partir da aorta ventral.
          · Minha aula GBI109 Aula 3: anfioxo como o único subfilo fora de
            Vertebrata que retém TODAS as sinapomorfias de Chordata na vida
            adulta; miótomos em V; pregas metapleurais e metapleurocele;
            filtrador psamófilo, parcialmente enterrado.
   IMAGEM · Esquemas laterais e cortes transversais de Branchiostoma na
            altura da faringe; preparações totais coradas mostrando os
            miótomos em V e as gônadas seriadas.
   VÍDEO  · Anfioxo nadando por ondulação lateral, filmagem noturna.

   Eixos: Z = ântero-posterior, anterior em +Z · Y = dorsal/ventral
   Corpo comprimido lateralmente: X é o eixo estreito.
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'cephalochordata',
  titulo: 'Cephalochordata: anfioxo',
  disciplina: 'GBI109',
  aula: 'Aula 3 · Hemichordata, Cephalochordata e Urochordata',
  grupo: 'Cephalochordata',
  dimensaoReal: 'de 3 a 7 cm de comprimento',
  escala: { realPorUnidade: 4, unidade: 'mm' },
  simplificacoes: [
    'Vinte e quatro pares de fendas branquiais. O animal chega a duzentas.',
    'Miótomos representados como cordões em V sobre a parede; no animal são blocos musculares maciços que ocupam quase toda a espessura do corpo.',
    'Cirros bucais em número reduzido e sem as barbatanas ciliares finas.',
    'Sistema circulatório reduzido à aorta ventral e às aferentes branquiais; a rede completa não está representada.',
    'O animal aparece inteiro e livre; no ambiente vive enterrado na areia, com só a extremidade anterior exposta.',
  ],
  caracteres: [
    { nome: 'Notocorda', estado: 'presente', estrutura: 'notocorda',
      nota: 'Presente a vida inteira e estendendo-se ATÉ A PONTA ANTERIOR, além do tubo nervoso. É daí que vem o nome do grupo: cordado com a corda na cabeça.' },
    { nome: 'Tubo nervoso dorsal', estado: 'presente', estrutura: 'tubo-nervoso-dorsal',
      nota: 'Oco, dorsal à notocorda, com uma vesícula cerebral anterior. Não há cérebro centralizado nem cabeça verdadeira.' },
    { nome: 'Fendas faríngeas', estado: 'presente', estrutura: 'fenda-faringea',
      nota: 'Até duzentas, em faringe muito desenvolvida. Servem sobretudo à ALIMENTAÇÃO por filtração, e pouco às trocas gasosas.' },
    { nome: 'Endóstilo', estado: 'presente', estrutura: 'endostilo',
      nota: 'Sulco ciliado e mucoso na face ventral da faringe, captador de iodo. Homólogo ao dos tunicados e possível precursor da tireoide dos vertebrados.' },
    { nome: 'Cauda pós-anal', estado: 'presente', estrutura: 'cauda-pos-anal',
      nota: 'A musculatura e a notocorda seguem para além do ânus. É o quinto caráter, e o anfioxo é o único grupo fora de Vertebrata que mantém os cinco no adulto.' },
  ],
  focos: [
    { nome: 'extremidade anterior', centro: [0, 0, 6.0], raio: 1.7 },
    { nome: 'faringe', centro: [0, 0, 2.6], raio: 2.6 },
    { nome: 'atrióporo', centro: [0, -0.7, -1.6], raio: 1.6 },
    { nome: 'cauda pós-anal', centro: [0, 0, -5.4], raio: 1.9 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'parede-corporal',
    nome: 'Parede corporal',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.oral,
    rugosidade: 0.6,
    descricao:
      'Corpo fusiforme, pontudo nas duas extremidades e comprimido lateralmente, coberto por epiderme de camada única. A translucidez do animal vivo é o que torna o anfioxo um material didático clássico: em preparação total, todas as estruturas internas aparecem sem dissecção.',
  },
  {
    id: 'notocorda',
    nome: 'Notocorda',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.35,
    descricao:
      'Bastão de células vacuoladas envolvido por bainha de colágeno, rígido e flexível ao mesmo tempo, que serve de eixo contra o qual os miótomos se contraem. CARÁTER DE CHORDATA. Aqui ela é permanente e chega até a ponta anterior do corpo, à frente do tubo nervoso, o que não acontece em nenhum vertebrado.',
  },
  {
    id: 'tubo-nervoso-dorsal',
    nome: 'Tubo nervoso dorsal',
    sinonimo: 'cordão nervoso dorsal',
    sistema: 'nervoso',
    nivel: 1,
    cor: CORES.nervoso,
    descricao:
      'Tubo OCO situado dorsalmente à notocorda, com uma dilatação anterior chamada vesícula cerebral. CARÁTER DE CHORDATA. Não forma um cérebro verdadeiro nem há crânio: o anfioxo tem corda na cabeça, mas não tem cabeça.',
  },
  {
    id: 'vesicula-cerebral',
    nome: 'Vesícula cerebral',
    sinonimo: 'mancha ocular, olho frontal',
    sistema: 'nervoso',
    nivel: 2,
    cor: CORES.nervoso,
    descricao:
      'Dilatação anterior do tubo nervoso, com um pigmento fotossensível que responde à luz e orienta o animal a se manter enterrado. É o mais próximo de um encéfalo que existe aqui, e sua expressão gênica corresponde às regiões anteriores do encéfalo dos vertebrados.',
  },
  {
    id: 'miotomo',
    nome: 'Miótomo',
    sinonimo: 'miômero',
    sistema: 'muscular',
    nivel: 1,
    cor: CORES.musculo,
    descricao:
      'Blocos musculares segmentados, com formato de V apontado para a frente quando vistos de lado. Contraindo alternadamente de um lado e do outro contra a notocorda, produzem a ondulação lateral da natação. É a mesma organização que reencontraremos nos peixes.',
  },
  {
    id: 'cirro-bucal',
    nome: 'Cirro bucal',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Projeções em cerca ao redor da abertura do vestíbulo bucal, sustentadas por bastonetes esqueléticos. Não capturam alimento: funcionam como uma grade que barra partículas grandes demais antes de a água entrar na faringe.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sinonimo: 'vestíbulo bucal',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura anterior ventral que dá no vestíbulo bucal, um átrio de entrada delimitado pelo capuz oral e pelos cirros. A água entra por aqui puxada pelos cílios da faringe, e não por bombeamento muscular.',
  },
  {
    id: 'faringe',
    nome: 'Faringe',
    sinonimo: 'cesta branquial',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Ocupa quase metade do comprimento do corpo, perfurada por até duzentas fendas. É um filtro, antes de um pulmão: a água atravessa as fendas e sai no átrio, enquanto as partículas ficam retidas no muco e seguem para o intestino.',
  },
  {
    id: 'fenda-faringea',
    nome: 'Fenda faríngea',
    sinonimo: 'fenda branquial',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Aberturas oblíquas e numerosas na parede da faringe, separadas umas das outras por barras branquiais. CARÁTER DE CHORDATA. Nesta classe elas funcionam basicamente para alimentação e pouco contribuem para as trocas gasosas, que acontecem pela superfície do corpo.',
  },
  {
    id: 'barra-branquial',
    nome: 'Barra branquial',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Hastes que separam fendas vizinhas, sustentadas por bastonetes de colágeno e revestidas de cílios. Levam uma artéria branquial aferente, que recebe sangue da aorta ventral. O batimento dos cílios laterais é o que move toda a corrente de água do animal.',
  },
  {
    id: 'endostilo',
    nome: 'Endóstilo',
    sinonimo: 'sulco hipobranquial',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.glandula,
    descricao:
      'Sulco ciliado e glandular ao longo da face VENTRAL da faringe, que produz uma folha de muco e a espalha para os lados, prendendo as partículas. CARÁTER DE CHORDATA. Capta iodo do ambiente e é considerado homólogo ao endóstilo dos tunicados e precursor da glândula tireoide dos vertebrados.',
  },
  {
    id: 'sulco-epibranquial',
    nome: 'Sulco epibranquial',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.glandula,
    descricao:
      'Canal ciliado ao longo da face DORSAL da faringe, para onde converge o muco carregado de partículas depois de subir pelas barras branquiais. Dali o cordão de muco segue para o esôfago. Endóstilo embaixo e sulco epibranquial em cima fecham o circuito de captura.',
  },
  {
    id: 'atrio',
    nome: 'Átrio',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.celoma,
    descricao:
      'Câmara que envolve a faringe pelos lados e por baixo, recebendo a água que atravessou as fendas. Não é celoma: é uma cavidade formada por dobras da parede do corpo. Existe também em Urochordata, e é a razão de a água não sair diretamente para fora nos dois grupos.',
  },
  {
    id: 'atrioporo',
    nome: 'Atrióporo',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Abertura única na face ventral, situada bem atrás da faringe, por onde a água acumulada no átrio deixa o corpo. Marca o fim das pregas metapleurais e é o ponto de referência para dividir o corpo em região faríngea e região pós-atrial.',
  },
  {
    id: 'prega-metapleural',
    nome: 'Prega metapleural',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Duas dobras longitudinais afastadas da parede do corpo, que correm ventrolateralmente até logo à frente do atrióporo. Delimitam a metapleurocele, ajudam a estabilizar o animal na natação e protegem a saída da água.',
  },
  {
    id: 'nadadeira',
    nome: 'Nadadeira',
    sinonimo: 'nadadeira dorsal, caudal e ventral',
    sistema: 'parede corporal',
    nivel: 2,
    cor: CORES.interambulacro,
    descricao:
      'Cristas medianas contínuas ao longo do dorso, da cauda e da face ventral pós-atrial, sem raios ósseos. Dentro das cristas dorsal e ventral ficam câmaras de armazenamento onde o animal acumula reservas.',
  },
  {
    id: 'ceco-digestivo',
    nome: 'Ceco digestivo',
    sinonimo: 'ceco hepático, divertículo hepático',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.glandula,
    descricao:
      'Bolsa que se levanta na junção entre a faringe e o esôfago e se projeta PARA A FRENTE, ao longo do lado direito da faringe. Secreta enzimas e absorve nutrientes. Já foi comparada ao fígado dos vertebrados, comparação hoje tratada com cautela.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Tubo reto que segue da faringe até o ânus, sem alças. A digestão é em parte intracelular, o que é incomum entre os cordados e aproxima o anfioxo dos invertebrados filtradores.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura ventral situada perto da extremidade posterior, ligeiramente deslocada para o lado esquerdo. Tudo o que fica atrás dele é a cauda pós-anal. Não confundir com o atrióporo, que fica bem mais à frente e é por onde sai a água, não o resíduo.',
  },
  {
    id: 'cauda-pos-anal',
    nome: 'Cauda pós-anal',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Trecho do corpo posterior ao ânus, com notocorda e musculatura segmentada continuando até a ponta. CARÁTER DE CHORDATA. Localizar o ânus é o único jeito de delimitá-la, e é por isso que a pergunta de prova costuma vir nessa ordem: primeiro ache o ânus, depois nomeie a cauda.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Série de massas pareadas alinhadas ao longo da parede do átrio, na região faríngea. Os sexos são separados e não há gonoduto: os gametas caem no átrio e saem pelo atrióporo. As gônadas seriadas são um dos caracteres mais visíveis em preparação total.',
  },
  {
    id: 'aorta-ventral',
    nome: 'Aorta ventral',
    sistema: 'circulatório',
    nivel: 3,
    cor: CORES.musculo,
    descricao:
      'Vaso contrátil situado abaixo da faringe, que distribui sangue às barras branquiais pelas artérias branquiais aferentes. Não há coração: a propulsão vem da contração dos próprios vasos. O padrão de vasos parecido com o dos peixes foi um dos argumentos da hipótese, hoje contestada, de que o anfioxo seria o grupo-irmão de Vertebrata.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const Z_ANT = 7.0, Z_POST = -7.0;
  const zz = (t) => Z_ANT + t * (Z_POST - Z_ANT);

  const T_BOCA = 0.075, T_FAR_I = 0.1, T_FAR_F = 0.5,
        T_ATRIO = 0.62, T_ANUS = 0.87;

  // perfil fusiforme, pontudo nas duas extremidades
  const perfil = (t) => Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, t))), 0.42);
  const RY = 0.95, RX = 0.42;

  const sup = (u, t, folga = 0) => {
    const f = perfil(t);
    return [
      (RX * f + folga) * Math.cos(u),
      (RY * f + folga) * Math.sin(u),
      zz(t),
    ];
  };

  A.superficie('parede-corporal', {
    nU: 44, nV: 90, fecharU: true,
    fn: (u, v) => sup(u, 0.004 + v * 0.992),
  });

  /* -------- nadadeiras -------- */

  const crista = (id, sinal, t0, t1, altura) => {
    A.superficie(id, {
      nU: 60, nV: 2, u0: t0, u1: t1, v0: -1, v1: 1,
      fn: (t, w) => {
        const f = perfil(t);
        const h = altura * Math.sin(Math.PI * Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
        return [w * 0.035, sinal * (RY * f + h), zz(t)];
      },
    });
  };
  crista('nadadeira', 1, 0.03, 0.985, 0.34);           // dorsal, contínua
  crista('nadadeira', -1, T_ATRIO + 0.02, 0.985, 0.3); // ventral pós-atrial
  // expansão caudal
  A.superficie('nadadeira', {
    nU: 26, nV: 2, u0: 0.9, u1: 0.995, v0: -1, v1: 1,
    fn: (t, w) => {
      const s = (t - 0.9) / 0.095;
      const h = 0.62 * Math.sin(Math.PI * s);
      return [w * 0.04, h, zz(t)];
    },
  });
  A.superficie('nadadeira', {
    nU: 26, nV: 2, u0: 0.9, u1: 0.995, v0: -1, v1: 1,
    fn: (t, w) => {
      const s = (t - 0.9) / 0.095;
      const h = 0.62 * Math.sin(Math.PI * s);
      return [w * 0.04, -h, zz(t)];
    },
  });

  /* -------- pregas metapleurais -------- */

  for (const lado of [-1, 1]) {
    const pontos = [];
    for (let i = 0; i <= 16; i++) {
      const t = T_BOCA + (i / 16) * (T_ATRIO - T_BOCA);
      const f = perfil(t);
      pontos.push([lado * (RX * f + 0.1), -(RY * f) * 0.62, zz(t)]);
    }
    A.tubo('prega-metapleural', pontos, 0.09, 50, 6);
  }

  /* -------- notocorda e tubo nervoso -------- */

  const noto = [];
  const nervo = [];
  for (let i = 0; i <= 30; i++) {
    const t = 0.012 + (i / 30) * 0.975;
    const f = perfil(t);
    noto.push([0, 0.1 * f, zz(t)]);
    if (t > 0.035) nervo.push([0, 0.1 * f + 0.2 * Math.max(0.4, f), zz(t)]);
  }
  A.tubo('notocorda', noto, 0.13, 90, 10);
  A.tubo('tubo-nervoso-dorsal', nervo, 0.085, 90, 9);
  A.esfera('vesicula-cerebral', 0.14, [0, 0.28, zz(0.055)], 12, [1, 1, 1.6]);

  /* -------- miótomos em V -------- */

  for (let i = 0; i < 30; i++) {
    const t = 0.055 + (i / 30) * 0.9;
    const f = perfil(t);
    if (f < 0.15) continue;
    for (const lado of [-1, 1]) {
      const pontos = [];
      for (let j = 0; j <= 8; j++) {
        const w = -1 + (j / 8) * 2;               // de ventral a dorsal
        const dz = 0.42 * (1 - Math.abs(w));      // ápice do V apontado para a frente
        const tt = Math.min(0.99, t + dz / Math.abs(Z_POST - Z_ANT));
        const ff = perfil(tt);
        pontos.push([lado * RX * ff * 0.96, w * RY * ff * 0.92, zz(tt)]);
      }
      A.tubo('miotomo', pontos, 0.035, 14, 5);
    }
  }

  /* -------- boca, cirros bucais -------- */

  A.cilindro('boca', 0.2, 0.24, 0.2, [0, -0.14, zz(T_BOCA)], [0, -0.35, 1], 16);
  for (let i = 0; i < 11; i++) {
    const a = -0.35 + (i / 10) * (Math.PI + 0.7);
    const bx = Math.cos(a) * 0.3;
    const by = -0.14 + Math.sin(a) * 0.3 * -1;
    A.cone('cirro-bucal', 0.035, 0.42, [bx * 1.25, by * 1.25, zz(T_BOCA - 0.022)],
      [bx * 0.8, by * 0.8, 1.1], 6);
  }

  /* -------- faringe, fendas, barras, endóstilo, sulco epibranquial -------- */

  const farRaioX = (t) => 0.3 * perfil(t);
  const farRaioY = (t) => 0.5 * perfil(t);

  A.superficie('faringe', {
    nU: 34, nV: 26, fecharU: true, inverter: true,
    fn: (u, v) => {
      const t = T_FAR_I + v * (T_FAR_F - T_FAR_I);
      return [farRaioX(t) * Math.cos(u), farRaioY(t) * Math.sin(u) + 0.02, zz(t)];
    },
  });

  const N_FENDAS = 24;
  for (let i = 0; i < N_FENDAS; i++) {
    const t = T_FAR_I + 0.012 + (i / N_FENDAS) * (T_FAR_F - T_FAR_I - 0.02);
    for (const lado of [-1, 1]) {
      const pontos = [];
      const barra = [];
      for (let j = 0; j <= 6; j++) {
        const w = -0.72 + (j / 6) * 1.35;
        const dz = 0.09 * (j / 6); // fenda oblíqua, inclinada para trás
        const tt = t + dz / 14;
        const f = perfil(tt);
        pontos.push([lado * farRaioX(tt) * 1.02, w * farRaioY(tt), zz(tt)]);
        barra.push([lado * farRaioX(tt) * 1.02, w * farRaioY(tt), zz(tt + 0.006)]);
      }
      A.tubo('fenda-faringea', pontos, 0.028, 12, 5);
      A.tubo('barra-branquial', barra, 0.022, 12, 5);
    }
  }

  const endo = [], epi = [], aorta = [];
  for (let i = 0; i <= 14; i++) {
    const t = T_FAR_I + (i / 14) * (T_FAR_F - T_FAR_I);
    endo.push([0, -farRaioY(t) * 0.94, zz(t)]);
    epi.push([0, farRaioY(t) * 0.94, zz(t)]);
    aorta.push([0, -farRaioY(t) * 1.2, zz(t)]);
  }
  A.tubo('endostilo', endo, 0.075, 50, 8);
  A.tubo('sulco-epibranquial', epi, 0.055, 50, 7);
  A.tubo('aorta-ventral', aorta, 0.045, 50, 6);

  /* -------- átrio, atrióporo -------- */

  A.superficie('atrio', {
    nU: 34, nV: 22, fecharU: true, inverter: true,
    fn: (u, v) => {
      const t = T_FAR_I + v * (T_ATRIO - T_FAR_I);
      const f = perfil(t);
      return [RX * f * 0.86 * Math.cos(u), RY * f * 0.82 * Math.sin(u) - 0.05, zz(t)];
    },
  });
  A.cilindro('atrioporo', 0.11, 0.14, 0.16,
    [0, -RY * perfil(T_ATRIO) - 0.02, zz(T_ATRIO)], [0, -1, 0.2], 14);

  /* -------- digestório posterior -------- */

  const ceco = [];
  for (let i = 0; i <= 8; i++) {
    const t = T_FAR_F - (i / 8) * 0.24;
    ceco.push([0.24 * perfil(t), -0.1, zz(t)]);
  }
  A.tubo('ceco-digestivo', ceco, 0.1, 30, 8);

  const intes = [];
  for (let i = 0; i <= 12; i++) {
    const t = T_FAR_F + (i / 12) * (T_ANUS - T_FAR_F);
    intes.push([0, -0.08 * perfil(t), zz(t)]);
  }
  A.tubo('intestino', intes, 0.13, 40, 8);
  A.cilindro('anus', 0.08, 0.1, 0.14,
    [-0.06, -RY * perfil(T_ANUS) * 0.95, zz(T_ANUS)], [-0.3, -1, 0], 12);

  /* -------- cauda pós-anal, marcada como região -------- */

  A.superficie('cauda-pos-anal', {
    nU: 32, nV: 12, fecharU: true,
    fn: (u, v) => sup(u, T_ANUS + v * (0.99 - T_ANUS), 0.012),
  });

  /* -------- gônadas seriadas -------- */

  for (let i = 0; i < 13; i++) {
    const t = T_FAR_I + 0.03 + (i / 13) * (T_ATRIO - T_FAR_I - 0.06);
    const f = perfil(t);
    for (const lado of [-1, 1]) {
      A.esfera('gonada', 0.11, [lado * RX * f * 0.66, -RY * f * 0.42, zz(t)], 10, [1, 1.5, 1.3]);
    }
  }

  return A.grupo();
}
