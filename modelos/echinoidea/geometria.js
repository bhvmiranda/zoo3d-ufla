/* ============================================================
   ZOO3D UFLA · modelos/echinoidea/geometria.js
   GBI109 · Aula 2 · Echinodermata · classe Echinoidea

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 25.
            Diagnose de Echinoidea: placas do estereoma suturadas por
            tecido conjuntivo e interdigitações de calcita formando a testa
            rígida; testa dividida em região coronal e sistema apical;
            pedicelárias sempre presentes; espinhos móveis montados sobre
            tubérculos; vasos aquíferos radiais totalmente contidos dentro
            da testa; aparelho mandibular interno, a lanterna de Aristóteles.
            Sistema apical ao redor do polo aboral, contendo o madreporito;
            cada canal radial termina em tentáculo terminal que protrai por
            uma placa ocular. Canal anelar acima da lanterna, com corpúsculos
            de Tiedemann e vesículas de Poli. Figuras 25.3 E e F.
          · Slides de GBI109 de Marcel Gustavo Hermes e Renato Gregorin.
            Lanterna de Aristóteles como bloco próprio da aula.
          · Atlas de Aulas Práticas em Zoologia de Deuterostomados, UFLA.
            Rótulos de bancada: boca, ânus, madreporito, petalóide, lúnula.
   IMAGEM · Testa desnuda de Echinus e de Strongylocentrotus em vista
            aboral, com as cinco placas genitais e as cinco oculares;
            periprocto; lanterna dissecada.
   VÍDEO  · Lanterna de Aristóteles raspando alga, movimento dos cinco dentes.

   Modelo de ouriço REGULAR. Bolachas-do-mar e ouriços-coração são
   irregulares, com simetria bilateral secundária e ânus deslocado; ver o
   modelo companheiro quando existir.

   Eixos: Y = eixo oral-aboral (oral para baixo) · X e Z = plano equatorial
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'echinoidea',
  titulo: 'Echinoidea: ouriço-do-mar',
  disciplina: 'GBI109',
  aula: 'Aula 2 · Echinodermata',
  grupo: 'Echinoidea',
  dimensaoReal: 'testa de 5 a 8 cm de diâmetro, sem contar os espinhos',
  escala: { realPorUnidade: 11, unidade: 'mm' },
  simplificacoes: [
    'Ouriço regular, do tipo de Echinometra lucunter, comum nos costões rochosos brasileiros.',
    'Número de espinhos, tubérculos e pés ambulacrais muito reduzido: uma testa real tem milhares.',
    'As placas coronais não aparecem uma a uma; as áreas ambulacral e interambulacral aparecem como faixas contínuas.',
    'A lanterna de Aristóteles está simplificada a cinco pirâmides e cinco dentes; o aparelho real tem dezenas de peças e dezenas de músculos.',
    'Pedicelárias muito ampliadas, senão seriam invisíveis nesta escala.',
  ],
  focos: [
    { nome: 'polo aboral', centro: [0, 2.1, 0], raio: 1.9 },
    { nome: 'polo oral', centro: [0, -2.1, 0], raio: 1.9 },
    { nome: 'lanterna', centro: [0, -1.35, 0], raio: 1.6 },
    { nome: 'equador', centro: [2.4, 0, 0], raio: 2.0 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'polo-aboral',
    nome: 'Polo aboral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Topo do eixo, oposto à boca. Aqui se concentra o sistema apical, com o periprocto e o ânus no centro. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'polo-oral',
    nome: 'Polo oral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Base do eixo, voltada para o substrato, ocupada pelo peristoma e pela boca de onde saem os cinco dentes. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'testa',
    nome: 'Testa',
    sinonimo: 'carapaça',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.55,
    descricao:
      'Esqueleto rígido formado por placas de estereoma suturadas umas às outras por tecido conjuntivo e por interdigitações de calcita. É a mesma natureza esquelética da estrela-do-mar, com uma diferença decisiva: aqui as placas estão soldadas e o animal perdeu a flexibilidade do corpo. A face interna aparece quando se aplica um plano de corte.',
  },
  {
    id: 'ambulacro',
    nome: 'Ambulacro',
    sinonimo: 'área ambulacral',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Cinco faixas estreitas que sobem da boca ao polo aboral como meridianos de um globo. Cada faixa é uma dupla coluna de placas perfuradas por pares de poros, por onde passam os pés ambulacrais. O sulco é FECHADO: o canal radial corre por dentro da testa, não na superfície.',
  },
  {
    id: 'interambulacro',
    nome: 'Interambulacro',
    sinonimo: 'área interambulacral',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Cinco faixas largas alternando com os ambulacros, sem poros e sem pés. Concentram os maiores tubérculos e os espinhos primários. A testa inteira é a soma de dez faixas: cinco ambulacrais e cinco interambulacrais.',
  },
  {
    id: 'sistema-apical',
    nome: 'Sistema apical',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Anel de placas ao redor do polo aboral, de origem extra-axial, que fecha a testa por cima. Nele estão as cinco placas genitais, as cinco oculares e o periprocto. Imagine uma estrela-do-mar cuja face aboral foi reduzida a este broto: é a leitura que Brusca propõe para entender o plano corporal do ouriço.',
  },
  {
    id: 'placa-genital',
    nome: 'Placa genital',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Cinco placas do sistema apical, cada uma perfurada por um gonóporo, por onde saem os gametas. Uma delas é modificada e funciona como madreporito. Ficam alinhadas com os interambulacros.',
  },
  {
    id: 'placa-ocular',
    nome: 'Placa ocular',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Cinco placas menores, alternando com as genitais e alinhadas com os ambulacros. Cada uma é perfurada pelo tentáculo terminal, a ponta sensorial do canal radial. Marcam onde cada ambulacro termina.',
  },
  {
    id: 'madreporito',
    nome: 'Madreporito',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.madreporito,
    descricao:
      'Uma das cinco placas genitais, crivada de poros, funcionando como entrada de água do sistema ambulacral. Fica na face aboral, como em Asteroidea, mas incorporada ao sistema apical. Conduz a uma glândula da ampola axial e ao canal pétreo.',
  },
  {
    id: 'periprocto',
    nome: 'Periprocto',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Membrana com plaquinhas móveis que ocupa o centro do sistema apical e contém o ânus. Em ouriços regulares fica no polo aboral; nos irregulares, como bolachas e ouriços-coração, desloca-se para trás ou até para a face oral, e essa migração é o primeiro sinal da bilateralidade secundária.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Abertura no centro do periprocto. Sua posição em relação ao sistema apical separa ouriços regulares de irregulares. Compare com Ophiuroidea, onde não existe ânus nenhum.',
  },
  {
    id: 'peristoma',
    nome: 'Peristoma',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.oral,
    descricao:
      'Membrana flexível que fecha a testa em torno da boca, na face oral. Nela se inserem pés ambulacrais modificados e, em vários grupos, cinco pares de brânquias peristomiais. É por ela que a lanterna assoma para fora.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura central da face oral, voltada para o substrato, ocupada pelas cinco pontas de dente. Compare a orientação com Crinoidea, onde a boca aponta para cima.',
  },
  {
    id: 'lanterna-de-aristoteles',
    nome: 'Lanterna de Aristóteles',
    sinonimo: 'aparelho mandibular',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.musculo,
    rugosidade: 0.6,
    descricao:
      'Aparelho mastigador interno formado por cinco pirâmides de estereoma movidas por dezenas de músculos, exclusivo de Echinoidea entre os equinodermos vivos. Raspa algas do substrato e, em algumas espécies, escava a própria rocha. O nome vem da comparação que o próprio Aristóteles fez com uma lanterna de chifre. Está ausente em ouriços-coração e ouriços-lâmpada adultos.',
  },
  {
    id: 'dente',
    nome: 'Dente',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.35,
    descricao:
      'Cinco lâminas calcárias longas que convergem para a boca e assomam por ela. Crescem continuamente pela base e se autoafiam pelo desgaste da ponta, como os incisivos de um roedor. Cada dente é sustentado por uma pirâmide da lanterna.',
  },
  {
    id: 'tuberculo',
    nome: 'Tubérculo',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Saliência arredondada da testa que funciona como a cabeça de uma articulação esférica. Sobre cada tubérculo encaixa a base oca de um espinho, movida por músculos em anel. É a articulação que permite ao ouriço orientar cada espinho separadamente.',
  },
  {
    id: 'espinho',
    nome: 'Espinho',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.espinho,
    descricao:
      'Peça de estereoma articulada sobre o tubérculo, coberta por epiderme. Serve à defesa, à locomoção lenta, ao escoramento dentro de fendas e, em algumas espécies, à escavação. Os espinhos primários, maiores, ficam nos interambulacros.',
  },
  {
    id: 'pedicelaria',
    nome: 'Pedicelária',
    sistema: 'defesa',
    nivel: 3,
    cor: CORES.defesa,
    descricao:
      'Pinça minúscula de haste flexível e três valvas, sempre presente em Echinoidea. Limpa a superfície e defende o animal; em alguns gêneros as valvas são glandulares e injetam veneno. Aqui aparece muito ampliada.',
  },
  {
    id: 'pe-ambulacral',
    nome: 'Pé ambulacral',
    sinonimo: 'pé tubular, pódio',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Sai por um par de poros da placa ambulacral, atravessando a testa. Longo e fino, passa entre os espinhos e alcança bem além deles. Serve à fixação, à locomoção, à alimentação e às trocas gasosas; pode ou não ter ventosa.',
  },
  {
    id: 'ampola',
    nome: 'Ampola',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.ampola,
    descricao:
      'Bolsa muscular interna, encostada na face de dentro da testa, ligada ao pé por dois canais que atravessam o par de poros. O mesmo mecanismo hidráulico de Asteroidea, com a diferença de que aqui o líquido atravessa a parede esquelética.',
  },
  {
    id: 'canal-circular',
    nome: 'Canal circular',
    sinonimo: 'canal anelar',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ambulacral,
    descricao:
      'Anel situado logo acima da lanterna de Aristóteles. Recebe o canal pétreo vindo do madreporito e emite os cinco canais radiais, além dos corpúsculos de Tiedemann e das vesículas de Poli.',
  },
  {
    id: 'canal-radial',
    nome: 'Canal radial',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.canalMenor,
    descricao:
      'Sobe pela face interna da testa sob cada ambulacro, do canal circular até a placa ocular, onde termina em tentáculo terminal. Estar totalmente contido dentro da testa é uma característica diagnóstica de Echinoidea.',
  },
  {
    id: 'canal-petreo',
    nome: 'Canal pétreo',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.ambulacral,
    descricao:
      'Desce do madreporito, no sistema apical, até o canal circular sobre a lanterna. Atravessa toda a altura do corpo, bem mais longa aqui do que em uma estrela-do-mar.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Cinco massas alongadas presas à face interna da testa, sob os interambulacros, cada uma abrindo em um gonóporo de placa genital. São elas o produto pesqueiro conhecido como uni.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Tubo longo que dá duas voltas completas encostado na face interna da testa, do esôfago que desce da lanterna até o reto, que sobe ao periprocto. O comprimento acomoda a digestão lenta de algas.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const R = 3.0;       // raio equatorial
  const H = 2.35;      // semi-altura
  const N_RAIOS = 5;
  const SETOR = TAU / N_RAIOS;
  const XI_A = 0.165;  // meia-largura da faixa ambulacral, em fração de setor

  const PHI_AP = 0.36;              // limite do sistema apical
  const PHI_PE = Math.PI - 0.5;     // limite do peristoma

  const sup = (u, phi, folga = 0) => [
    (R + folga) * Math.sin(phi) * Math.cos(u),
    (H + folga) * Math.cos(phi),
    (R + folga) * Math.sin(phi) * Math.sin(u),
  ];

  /* -------- faixas ambulacrais e interambulacrais -------- */

  const faixa = (id, uIni, uFim, nU) =>
    A.superficie(id, {
      nU, nV: 26, u0: 0, u1: 1,
      fn: (a, v) => sup(uIni + a * (uFim - uIni), PHI_AP + v * (PHI_PE - PHI_AP)),
    });

  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = k * SETOR;
    faixa('ambulacro', u0, u0 + XI_A * SETOR, 6);
    faixa('ambulacro', u0 + SETOR, u0 + SETOR - XI_A * SETOR, 6);
    faixa('interambulacro', u0 + XI_A * SETOR, u0 + (1 - XI_A) * SETOR, 20);
  }

  /* -------- face interna da testa, aparece com o corte -------- */

  A.superficie('testa', {
    nU: 96, nV: 30, fecharU: true, inverter: true,
    fn: (u, phi01) => sup(u, PHI_AP + phi01 * (PHI_PE - PHI_AP), -0.16),
  });
  // borda superior e inferior, fechando a espessura da parede
  A.superficie('testa', {
    nU: 96, nV: 2, fecharU: true,
    fn: (u, v) => sup(u, PHI_AP, -0.16 * v),
  });
  A.superficie('testa', {
    nU: 96, nV: 2, fecharU: true, inverter: true,
    fn: (u, v) => sup(u, PHI_PE, -0.16 * v),
  });

  /* -------- sistema apical -------- */

  A.superficie('sistema-apical', {
    nU: 64, nV: 6, fecharU: true,
    fn: (u, v) => sup(u, 0.14 + v * (PHI_AP - 0.14)),
  });

  for (let k = 0; k < N_RAIOS; k++) {
    const uG = k * SETOR + SETOR / 2; // genital, alinhada ao interambulacro
    const uO = k * SETOR;             // ocular, alinhada ao ambulacro
    const pg = sup(uG, 0.26, 0.05);
    const po = sup(uO, 0.24, 0.05);
    A.cilindro('placa-genital', 0.26, 0.28, 0.09, pg, [pg[0], pg[1] * 1.6, pg[2]], 6);
    A.cilindro('placa-ocular', 0.17, 0.19, 0.08, po, [po[0], po[1] * 1.6, po[2]], 6);
  }
  const uMad = SETOR / 2;
  const pm = sup(uMad, 0.26, 0.1);
  A.cilindro('madreporito', 0.2, 0.21, 0.07, pm, [pm[0], pm[1] * 1.6, pm[2]], 18);

  A.cilindro('periprocto', 0.42, 0.44, 0.1, [0, H + 0.02, 0], [0, 1, 0], 24);
  A.cilindro('anus', 0.12, 0.14, 0.16, [0, H + 0.06, 0], [0, 1, 0], 14);

  /* -------- peristoma, boca -------- */

  A.superficie('peristoma', {
    nU: 64, nV: 6, fecharU: true, inverter: true,
    fn: (u, v) => sup(u, PHI_PE + v * (Math.PI - 0.18 - PHI_PE)),
  });
  A.cilindro('boca', 0.4, 0.34, 0.18, [0, -H + 0.06, 0], [0, 1, 0], 22);

  /* -------- polos -------- */

  A.cilindro('polo-aboral', 0.4, 0.4, 0.06, [0, H + 0.72, 0], [0, 1, 0], 26);
  A.cilindro('polo-oral', 0.4, 0.4, 0.06, [0, -H - 0.72, 0], [0, 1, 0], 26);

  /* -------- espinhos, tubérculos, pedicelárias -------- */

  let semente = 23;
  const aleat = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };

  const N_ESP = 300;
  for (let i = 0; i < N_ESP; i++) {
    const phi = PHI_AP + 0.08 + aleat() * (PHI_PE - PHI_AP - 0.16);
    const u = aleat() * TAU;
    // distância angular ao eixo do ambulacro mais próximo
    const passo = SETOR;
    let d = ((u % passo) + passo) % passo;
    d = Math.min(d, passo - d);
    const emAmbulacro = d < XI_A * SETOR;
    const base = sup(u, phi);
    const n = [base[0] / R, (base[1] / H) * 0.9, base[2] / R];

    const sorte = aleat();
    if (sorte < 0.08) {
      const pb = sup(u, phi, 0.18);
      A.cone('pedicelaria', 0.07, 0.24, [pb[0] - n[2] * 0.06, pb[1], pb[2] + n[0] * 0.06],
        [n[0] - n[2] * 0.5, n[1], n[2] + n[0] * 0.5], 6);
      A.cone('pedicelaria', 0.07, 0.24, [pb[0] + n[2] * 0.06, pb[1], pb[2] - n[0] * 0.06],
        [n[0] + n[2] * 0.5, n[1], n[2] - n[0] * 0.5], 6);
      continue;
    }

    const comp = emAmbulacro ? 0.7 + aleat() * 0.3 : 1.05 + aleat() * 0.5;
    const esp = emAmbulacro ? 0.07 : 0.1;
    A.esfera('tuberculo', esp * 1.5, sup(u, phi, 0.04), 8);
    A.cone('espinho', esp, comp,
      [base[0] + n[0] * comp * 0.55, base[1] + n[1] * comp * 0.55, base[2] + n[2] * comp * 0.55],
      n, 7);
  }

  /* -------- pés ambulacrais, ampolas, canais radiais -------- */

  A.toro('canal-circular', 0.95, 0.08, [0, -H + 0.55, 0], [0, 1, 0], TAU, 40);

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR;
    const pontos = [];
    for (let i = 0; i <= 12; i++) {
      const phi = PHI_PE - (i / 12) * (PHI_PE - PHI_AP);
      const q = sup(u, phi, -0.2);
      pontos.push(q);
      if (i === 0 || i === 12) continue;

      for (const lado of [-1, 1]) {
        const uu = u + (lado * 0.11) / Math.max(0.35, Math.sin(phi));
        const b = sup(uu, phi);
        const n = [b[0] / R, (b[1] / H) * 0.9, b[2] / R];
        const L = 1.9;
        A.cilindro('pe-ambulacral', 0.055, 0.075,
          L, [b[0] + n[0] * L * 0.5, b[1] + n[1] * L * 0.5, b[2] + n[2] * L * 0.5], n, 8);
        A.cilindro('pe-ambulacral', 0.11, 0.07, 0.05,
          [b[0] + n[0] * L, b[1] + n[1] * L, b[2] + n[2] * L], n, 10);
        A.esfera('ampola', 0.13, sup(uu, phi, -0.3), 10, [1, 1, 0.7]);
      }
    }
    A.tubo('canal-radial', [[0, -H + 0.6, 0], ...pontos], 0.06, 50, 8);
  }

  A.tubo('canal-petreo', [
    sup(uMad, 0.3, -0.15),
    sup(uMad, 0.8, -0.5),
    sup(uMad, 1.4, -0.8),
    [0.95 * Math.cos(uMad), -H + 0.55, 0.95 * Math.sin(uMad)],
  ], 0.07, 30, 8);

  /* -------- lanterna de Aristóteles -------- */

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR + SETOR / 2;
    const cx = Math.cos(u);
    const cz = Math.sin(u);
    // pirâmide inclinada, convergindo para a boca
    A.cone('lanterna-de-aristoteles', 0.34, 1.2,
      [cx * 0.52, -H + 1.02, cz * 0.52], [cx * 0.42, 1, cz * 0.42], 4);
    A.caixa('lanterna-de-aristoteles', [0.42, 0.5, 0.42],
      [cx * 0.66, -H + 1.5, cz * 0.66], -u);
    // dente, da pirâmide até assomar pela boca
    A.entre('dente',
      [cx * 0.62, -H + 1.62, cz * 0.62],
      [cx * 0.13, -H - 0.14, cz * 0.13], 0.075, 8);
    A.cone('dente', 0.09, 0.26, [cx * 0.11, -H - 0.24, cz * 0.11], [cx * 0.3, -1, cz * 0.3], 6);
  }

  /* -------- gônadas e intestino -------- */

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR + SETOR / 2;
    for (let i = 0; i < 4; i++) {
      const phi = 0.55 + i * 0.28;
      A.esfera('gonada', 0.3 - i * 0.03, sup(u, phi, -0.45), 12, [1, 1.3, 1]);
    }
  }

  const espiral = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const u = t * TAU * 2;
    const phi = PHI_PE - 0.25 - t * (PHI_PE - PHI_AP - 0.7);
    espiral.push(sup(u, phi, -0.55));
  }
  A.tubo('intestino', [[0, -H + 0.9, 0], ...espiral, [0, H - 0.3, 0]], 0.15, 130, 9);

  return A.grupo();
}
