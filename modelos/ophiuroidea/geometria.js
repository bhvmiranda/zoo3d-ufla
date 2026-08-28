/* ============================================================
   ZOO3D UFLA · modelos/ophiuroidea/geometria.js
   GBI109 · Aula 2 · Echinodermata · classe Ophiuroidea

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 25.
            Diagnose de Ophiuroidea: braços articulados nitidamente
            demarcados do disco central; placas orais dos braços cobrem o
            sulco ambulacral; celoma dos braços muito reduzido; pés
            tubulares SEM ampolas internas e SEM ventosas; ÂNUS AUSENTE;
            madreporito na placa interambulacral CD, na superfície ORAL.
            Figura 25.3 C, disco central de Amphiura em vista oral.
          · Slides de GBI109 de Marcel Gustavo Hermes e Renato Gregorin.
          · Atlas de Aulas Práticas em Zoologia de Deuterostomados, UFLA.
            Rótulos usados na bancada: escudo oral, fendas bursais.
   IMAGEM · Vista oral do disco de Ophioderma e de Ophiothrix, com escudos
            orais, fendas bursais e mandíbulas; placas braquiais em detalhe.
   VÍDEO  · Locomoção por ondulação dos braços, contraste com a marcha por
            pés ambulacrais de Asteroidea.

   As três diferenças que mais caem em prova, todas presentes no modelo:
   braço demarcado do disco, sulco ambulacral fechado por placas,
   ausência de ânus.

   Eixos: Y = eixo oral-aboral (oral para baixo) · X e Z = plano do disco
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'ophiuroidea',
  titulo: 'Ophiuroidea: serpente-do-mar',
  disciplina: 'GBI109',
  aula: 'Aula 2 · Echinodermata',
  grupo: 'Ophiuroidea',
  dimensaoReal: 'disco de 1 a 3 cm, braços de 5 a 15 cm',
  escala: { realPorUnidade: 9, unidade: 'mm' },
  simplificacoes: [
    'Braços não ramificados, como em Ophiurida. Em Euryalida, as estrelas-cesto, os braços se ramificam muitas vezes.',
    'Dezoito segmentos por braço. Um braço real tem dezenas a mais de cem.',
    'As placas braquiais aparecem separadas para dar a ler a articulação; no animal elas se encaixam com folga mínima.',
    'Bursas e gônadas representadas em número reduzido.',
    'O estereoma aparece como parede contínua; a estrutura porosa das placas exige modelo ampliado.',
  ],
  focos: [
    { nome: 'disco central', centro: [0, 0.05, 0], raio: 2.1 },
    { nome: 'base do braço', centro: [2.6, 0.05, 0], raio: 1.5 },
    { nome: 'meio do braço', centro: [5.2, 0.15, 0], raio: 1.7 },
    { nome: 'face oral', centro: [0, -0.5, 0], raio: 3.0 },
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
      'Centro da face voltada para cima. Em Ophiuroidea não há nada de digestório aqui: não existe ânus em nenhuma espécie da classe. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'polo-oral',
    nome: 'Polo oral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Centro da face voltada para o substrato, onde está a boca cercada pelas cinco mandíbulas. Como não há ânus, esta é a única abertura do tubo digestório. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'disco-aboral',
    nome: 'Parede aboral do disco',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.8,
    descricao:
      'Face superior do disco, coberta por escamas ou grânulos de estereoma. Note que os braços saem da margem do disco e são nitidamente demarcados dele por uma articulação, ao contrário de Asteroidea, onde disco e braço passam um no outro sem limite claro.',
  },
  {
    id: 'ambulacro',
    nome: 'Ambulacro',
    sinonimo: 'área ambulacral',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Faixa radial que sai da boca e percorre a linha média oral de cada braço. Aqui o sulco ambulacral é FECHADO: as placas braquiais ventrais o cobrem por inteiro, e o canal radial corre por dentro do braço, não exposto na superfície. Compare com o sulco aberto de Asteroidea.',
  },
  {
    id: 'interambulacro',
    nome: 'Interambulacro',
    sinonimo: 'interrádio',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Os cinco setores da face oral do disco situados entre dois braços. É neles que ficam os escudos orais e as fendas bursais. O madreporito ocupa o interambulacro CD, e por isso serve de referência para orientar o animal.',
  },
  {
    id: 'escudo-oral',
    nome: 'Escudo oral',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Placa maior e bem delimitada de estereoma, uma em cada interambulacro da face oral do disco. É um dos caracteres que o atlas de práticas pede para reconhecer na bancada. Um dos cinco escudos, o do interambulacro CD, é perfurado e funciona como madreporito.',
  },
  {
    id: 'madreporito',
    nome: 'Madreporito',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.madreporito,
    descricao:
      'Entrada de água do sistema ambulacral. Diferente de Asteroidea, aqui ele fica na face ORAL, sobre a placa interambulacral CD, geralmente reduzido e difícil de ver a olho nu. Essa mudança de face é uma das perguntas comparativas mais diretas entre as duas classes.',
  },
  {
    id: 'fenda-bursal',
    nome: 'Fenda bursal',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Abertura alongada na face oral do disco, junto à base de cada braço, em geral duas por braço, dez ao todo. Por ela entra e sai a água que ventila a bursa. É também a via de saída dos gametas e, em espécies vivíparas, dos filhotes.',
  },
  {
    id: 'bursa',
    nome: 'Bursa',
    sistema: 'respiratório',
    nivel: 2,
    cor: CORES.celoma,
    descricao:
      'Bolsa interna achatada ligada à fenda bursal, onde ocorre a maior parte das trocas gasosas e da excreção. Faz o papel que as pápulas fazem em Asteroidea. As gônadas se abrem na sua parede.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura central da face oral, com contorno de estrela de cinco pontas por causa das mandíbulas que a cercam. Como não existe ânus, os resíduos não digeridos voltam por ela. O estômago é um saco cego.',
  },
  {
    id: 'mandibula',
    nome: 'Mandíbula',
    sinonimo: 'papilas orais, dentes',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Cinco cunhas de ossículos móveis que convergem sobre a boca, cada uma armada com papilas orais e dentes. Prendem e fragmentam o alimento. São formadas por ossículos do primeiro segmento de cada braço incorporados ao disco.',
  },
  {
    id: 'vertebra',
    nome: 'Ossículo vertebral',
    sinonimo: 'vértebra',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.5,
    descricao:
      'Peça maciça de estereoma que ocupa quase toda a secção do braço, articulada com a vizinha por superfícies encaixadas e movida por quatro feixes musculares. É a articulação que dá ao braço o movimento de chicote e o nome de serpente-do-mar. Deriva de dois ossículos ambulacrais fundidos.',
  },
  {
    id: 'placa-braquial-dorsal',
    nome: 'Placa braquial dorsal',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Série de placas que cobre a face aboral do braço, uma por segmento. Ausente em Euryalida, onde a pele espessa toma o lugar. Junto com as ventrais e as laterais, forma a armadura articulada do braço.',
  },
  {
    id: 'placa-braquial-ventral',
    nome: 'Placa braquial ventral',
    sinonimo: 'placa oral do braço',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Série de placas que cobre a face oral do braço, e é justamente ela que fecha o sulco ambulacral. Este é o caráter que separa Ophiuroidea de Asteroidea na prova prática: aqui não se vê o sulco por fora.',
  },
  {
    id: 'placa-braquial-lateral',
    nome: 'Placa braquial lateral',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Par de placas em cada segmento, uma de cada lado, que sustenta os espinhos braquiais. Entre a placa lateral e a ventral fica o poro por onde sai o pé ambulacral.',
  },
  {
    id: 'espinho-braquial',
    nome: 'Espinho braquial',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.espinho,
    descricao:
      'Espinhos articulados nas placas laterais, em geral três a sete por lado em cada segmento. Podem ser curtos e apostos ao braço ou longos e eriçados, conforme o gênero, e em alguns casos ganchosos, usados para prender-se ao substrato.',
  },
  {
    id: 'pe-ambulacral',
    nome: 'Pé ambulacral',
    sinonimo: 'pé tubular, pódio',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Projeção que sai entre a placa ventral e a lateral, SEM ventosa e SEM ampola interna, ao contrário de Asteroidea. Não serve para caminhar: coleta partículas alimentares e as passa de pé em pé até a boca, e participa das trocas gasosas. A locomoção fica por conta da ondulação do braço inteiro.',
  },
  {
    id: 'canal-radial',
    nome: 'Canal radial',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.canalMenor,
    descricao:
      'Percorre o braço por dentro, sobre a face oral dos ossículos vertebrais e coberto pelas placas ventrais. Emite um canal lateral para cada pé ambulacral. A interiorização do canal radial é uma novidade de Ophiuroidea entre os asterozoários.',
  },
  {
    id: 'canal-circular',
    nome: 'Canal circular',
    sinonimo: 'canal circumbucal',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ambulacral,
    descricao:
      'Anel que circunda a boca e distribui o sistema ambulacral aos cinco braços. Recebe o canal pétreo vindo do madreporito, aqui muito curto porque o madreporito está na mesma face oral.',
  },
  {
    id: 'estomago',
    nome: 'Estômago',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Saco amplo e lobado, restrito ao disco: NÃO entra nos braços e NÃO tem continuação em intestino nem em ânus. Compare com Asteroidea, onde os cecos pilóricos ocupam quase todo o volume dos braços.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 3,
    cor: CORES.gonada,
    descricao:
      'Massas presas à parede das bursas, dentro do disco. Os gametas são liberados na bursa e saem pela fenda bursal. Várias espécies incubam os embriões dentro da bursa e liberam juvenis já formados.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const R_DISCO = 1.75;
  const N_RAIOS = 5;
  const SETOR = TAU / N_RAIOS;
  const N_SEG = 18;
  const L_BRACO = 6.6;

  const rDisco = (u) => R_DISCO * (1 + 0.07 * Math.cos(N_RAIOS * u));
  const yAb = (u, rho) => {
    const s = Math.min(1, rho / rDisco(u));
    return 0.5 * Math.pow(Math.max(0, 1 - s * s), 0.55);
  };
  const yOr = (u, rho) => {
    const s = Math.min(1, rho / rDisco(u));
    return -0.3 * Math.pow(Math.max(0, 1 - s * s), 0.5);
  };
  const p = (u, rho, y) => [rho * Math.cos(u), y, rho * Math.sin(u)];

  /* -------- disco -------- */

  A.superficie('disco-aboral', {
    nU: 130, nV: 14, fecharU: true,
    fn: (u, v) => {
      const rho = v * rDisco(u);
      return p(u, rho, yAb(u, rho));
    },
  });

  const RHO_BOCA = 0.42;
  const oral = (u, v) => {
    const rho = RHO_BOCA + v * (rDisco(u) - RHO_BOCA);
    return p(u, rho, yOr(u, rho));
  };
  const XI_A = 0.19; // fração do setor ocupada pela meia-faixa ambulacral

  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = k * SETOR;
    A.superficie('ambulacro', {
      nU: 8, nV: 14, u0: 0, u1: 1, inverter: true,
      fn: (a, v) => oral(u0 + a * XI_A * SETOR, v),
    });
    A.superficie('ambulacro', {
      nU: 8, nV: 14, u0: 0, u1: 1, inverter: true,
      fn: (a, v) => oral(u0 + SETOR - a * XI_A * SETOR, v),
    });
    A.superficie('interambulacro', {
      nU: 22, nV: 14, u0: 0, u1: 1, inverter: true,
      fn: (a, v) => oral(u0 + (XI_A + a * (1 - 2 * XI_A)) * SETOR, v),
    });
  }

  /* -------- boca, mandíbulas, escudos, madreporito, bursas -------- */

  A.cilindro('boca', 0.3, 0.36, 0.22, [0, -0.28, 0], [0, 1, 0], 20);

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR;

    // mandíbula: cunha convergindo para a boca
    A.caixa('mandibula', [0.5, 0.26, 0.34], p(u, 0.66, -0.24), -u, 0, 0.18);
    for (let j = -1; j <= 1; j++) {
      A.cone('mandibula', 0.055, 0.16, p(u + j * 0.16, 0.44, -0.3),
        [-Math.cos(u), -0.4, -Math.sin(u)], 6);
    }

    // escudo oral no interambulacro
    const uI = u + SETOR / 2;
    A.cilindro('escudo-oral', 0.27, 0.3, 0.09, p(uI, 1.02, yOr(uI, 1.02) + 0.01), [0, 1, 0], 6);

    // fendas bursais, uma de cada lado da base do braço
    for (const lado of [-1, 1]) {
      const uB = u + lado * 0.36;
      A.caixa('fenda-bursal', [0.62, 0.07, 0.14], p(uB, 1.24, yOr(uB, 1.24) + 0.02), -uB);
      A.esfera('bursa', 0.34, p(uB, 1.2, 0.02), 12, [1.1, 0.5, 0.7]);
      A.esfera('gonada', 0.15, p(uB, 1.16, 0.24), 10, [1, 0.7, 1]);
      A.esfera('gonada', 0.12, p(uB, 0.95, 0.2), 10, [1, 0.7, 1]);
    }
  }

  // madreporito sobre o escudo oral do interambulacro CD
  const uMad = SETOR / 2;
  A.cilindro('madreporito', 0.15, 0.16, 0.07, p(uMad, 1.02, yOr(uMad, 1.02) - 0.03), [0, 1, 0], 16);

  /* -------- polos -------- */

  A.cilindro('polo-aboral', 0.4, 0.4, 0.06, [0, 0.86, 0], [0, 1, 0], 26);
  A.cilindro('polo-oral', 0.4, 0.4, 0.06, [0, -0.72, 0], [0, 1, 0], 26);

  /* -------- sistema ambulacral do disco -------- */

  A.toro('canal-circular', 0.72, 0.07, [0, -0.06, 0], [0, 1, 0], TAU, 40);
  A.entre('canal-circular',
    p(uMad, 1.0, yOr(uMad, 1.0)), p(uMad, 0.74, -0.06), 0.055, 8);

  /* -------- estômago, saco cego dentro do disco -------- */

  A.esfera('estomago', 1.02, [0, 0.02, 0], 24, [1, 0.42, 1]);
  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR + SETOR / 2;
    A.esfera('estomago', 0.34, p(u, 1.0, 0.06), 12, [1, 0.5, 1]);
  }

  /* -------- braços -------- */

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR;
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const eixo = [cu, 0, su];
    const lateral = [-su, 0, cu];

    const pontosCanal = [];

    for (let i = 0; i < N_SEG; i++) {
      const t = i / (N_SEG - 1);
      const dist = R_DISCO * 0.92 + t * L_BRACO;
      const rr = 0.36 * (1 - 0.78 * t); // raio do braço, afinando
      const onda = 0.34 * Math.sin(t * 3.4) * t; // ondulação do braço
      const cx = cu * dist + lateral[0] * onda;
      const cz = su * dist + lateral[2] * onda;
      const cy = 0.04;
      const centro = [cx, cy, cz];
      const compSeg = (L_BRACO / N_SEG) * 0.86;

      // ossículo vertebral, o volume interno do braço
      A.caixa('vertebra', [compSeg, rr * 1.15, rr * 1.15], centro, -u);

      // placas braquiais
      A.caixa('placa-braquial-dorsal', [compSeg, rr * 0.3, rr * 1.5],
        [cx, cy + rr * 0.8, cz], -u);
      A.caixa('placa-braquial-ventral', [compSeg, rr * 0.28, rr * 1.15],
        [cx, cy - rr * 0.82, cz], -u);
      A.caixa('ambulacro', [compSeg * 0.95, rr * 0.16, rr * 0.55],
        [cx, cy - rr * 0.62, cz], -u);

      for (const lado of [-1, 1]) {
        const lx = cx + lateral[0] * lado * rr * 0.9;
        const lz = cz + lateral[2] * lado * rr * 0.9;
        A.caixa('placa-braquial-lateral', [compSeg, rr * 1.3, rr * 0.3],
          [lx, cy, lz], -u);

        // espinhos braquiais
        for (let e = 0; e < 3; e++) {
          const alt = rr * (2.4 - e * 0.45);
          const py = cy + (e - 1) * rr * 0.42;
          A.cone('espinho-braquial', rr * 0.16, alt,
            [lx + lateral[0] * lado * alt * 0.45, py, lz + lateral[2] * lado * alt * 0.45],
            [lateral[0] * lado, 0.25, lateral[2] * lado], 6);
        }

        // pé ambulacral, sem ventosa, saindo entre a placa lateral e a ventral
        const px = cx + lateral[0] * lado * rr * 0.7;
        const pz = cz + lateral[2] * lado * rr * 0.7;
        A.cone('pe-ambulacral', rr * 0.22, rr * 1.5,
          [px + lateral[0] * lado * rr * 0.5, cy - rr * 0.9, pz + lateral[2] * lado * rr * 0.5],
          [lateral[0] * lado * 0.7, -1, lateral[2] * lado * 0.7], 7);
      }

      pontosCanal.push([cx, cy - rr * 0.42, cz]);
    }

    // canal radial percorrendo o interior do braço
    A.tubo('canal-radial', [p(u, 0.74, -0.06), ...pontosCanal], 0.055, 70, 7);
  }

  return A.grupo();
}
