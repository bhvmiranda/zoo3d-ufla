/* ============================================================
   ZOO3D UFLA · modelos/asteroidea/geometria.js
   GBI109 · Aula 2 · Echinodermata · classe Asteroidea

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 25.
            Diagnose de Asteroidea: braços não demarcados do disco por
            articulações; ânus na superfície aboral; boca voltada para o
            substrato; sulcos ambulacrais com vaso aquífero radial externo;
            pés tubulares com ampolas internas; madreporito aboral no
            espaço interambulacral CD.
            Trajeto do sistema ambulacral e válvula do canal lateral.
          · Slides de GBI109 de Marcel Gustavo Hermes e Renato Gregorin.
            Nomenclatura da disciplina: sistema ambulacral, madreporito,
            canal pétreo, canal circular, canal radial, canal lateral,
            ampola, pé ambulacral.
          · Atlas de Aulas Práticas em Zoologia de Deuterostomados, UFLA.
            Rótulos usados na bancada: boca, braços, espinhos, pés
            tubulares, sulcos ambulacrais, disco central, ânus, madreporito.
   IMAGEM · Esquemas de dissecção da superfície oral e aboral de Asterias,
            corte transversal de braço, esquema do sistema vascular aquífero.
   VÍDEO  · Deep Look, coordenação dos pés ambulacrais na locomoção.

   Nomenclatura segue a da disciplina. "Pé tubular" aparece como sinônimo
   de pé ambulacral porque é o rótulo do atlas de práticas.

   Eixos: Y = eixo oral-aboral (oral para baixo) · X e Z = plano do disco
   ============================================================ */

import { Acervo, TAU, distanciaAoRaio, suavizar } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'asteroidea',
  titulo: 'Asteroidea: estrela-do-mar',
  disciplina: 'GBI109',
  aula: 'Aula 2 · Echinodermata',
  grupo: 'Asteroidea',
  dimensaoReal: 'disco com braços de 12 a 20 cm de diâmetro',
  escala: { realPorUnidade: 12, unidade: 'mm' },
  simplificacoes: [
    'Cinco braços. Há espécies de Asteroidea com muito mais, até cerca de cinquenta.',
    'Duas fileiras de pés ambulacrais por sulco. Várias espécies têm quatro fileiras.',
    'Número de pés, espinhos e pápulas reduzido para manter a leitura da forma.',
    'O estereoma aparece como uma parede contínua. A estrutura porosa da placa exige o modelo ampliado de parede corporal.',
    'Pedicelárias representadas em tamanho exagerado, senão seriam invisíveis nesta escala.',
  ],
  focos: [
    { nome: 'disco central', centro: [0, 0.55, 0], raio: 2.3 },
    { nome: 'um braço', centro: [3.7, 0.45, 0], raio: 2.6 },
    { nome: 'face oral', centro: [0, -0.2, 0], raio: 4.2 },
    { nome: 'face aboral', centro: [0, 1.2, 0], raio: 4.2 },
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
      'Extremidade do eixo oposta à boca, voltada para cima nesta classe. Marca o centro da face aboral, onde ficam o ânus e o madreporito. O disco que aparece aqui é uma marcação de referência, não uma estrutura anatômica.',
  },
  {
    id: 'polo-oral',
    nome: 'Polo oral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Extremidade do eixo onde está a boca, voltada para o substrato em Asteroidea. Os cinco sulcos ambulacrais convergem para este ponto. O disco que aparece aqui é uma marcação de referência, não uma estrutura anatômica.',
  },
  {
    id: 'parede-aboral',
    nome: 'Parede corporal aboral',
    sinonimo: 'face aboral',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.85,
    descricao:
      'Superfície voltada para cima, oposta à boca. Sustentada pelo endoesqueleto de placas calcárias, o estereoma, com tecido mole ocupando os poros das placas. Traz o ânus, o madreporito, espinhos, pápulas e pedicelárias.',
  },
  {
    id: 'ambulacro',
    nome: 'Ambulacro',
    sinonimo: 'sulco ambulacral, área ambulacral',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Faixa radial que percorre a linha média oral de cada braço, a partir da boca. Em Asteroidea o sulco é aberto: o canal radial e os pés ambulacrais ficam expostos na superfície, protegidos apenas por espinhos móveis nas margens. Cinco ambulacros, um por raio.',
  },
  {
    id: 'interambulacro',
    nome: 'Interambulacro',
    sinonimo: 'área interambulacral, interrádio',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Toda a superfície entre dois ambulacros vizinhos. Não tem pés ambulacrais nem canal radial. O madreporito ocupa um interambulacro específico, o CD, e é ele que quebra a simetria pentarradial perfeita do animal.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura central da face oral, voltada para o substrato. Cercada pela membrana peristomial. O estômago pode ser evertido por ela para digerir a presa fora do corpo, o que permite à estrela consumir bivalves maiores que a própria boca.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Abertura minúscula da face aboral, ligeiramente deslocada do centro. Presente na maioria das ordens de Asteroidea e ausente em algumas, como parte de Paxillosida. Compare com Ophiuroidea, onde o ânus não existe em nenhuma espécie.',
  },
  {
    id: 'madreporito',
    nome: 'Madreporito',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.madreporito,
    rugosidade: 0.45,
    descricao:
      'Placa circular crivada, porosa e ciliada, na face aboral, dentro do interambulacro CD. É a porta de entrada de água do sistema ambulacral. Sua posição fora do centro é a referência que permite orientar o animal e nomear cada raio.',
  },
  {
    id: 'pe-ambulacral',
    nome: 'Pé ambulacral',
    sinonimo: 'pé tubular, pódio',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Projeção carnosa que sai do sulco ambulacral e termina em ventosa nesta classe. Estende-se quando a ampola se contrai e empurra líquido para dentro dele, e retrai quando a musculatura própria devolve o líquido à ampola. Centenas deles atuam de forma coordenada na locomoção, na respiração e na abertura de presas.',
  },
  {
    id: 'ampola',
    nome: 'Ampola',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ampola,
    descricao:
      'Bolsa muscular interna, ligada ao pé ambulacral pelo canal lateral. Contrai e força o líquido para dentro do pé, estendendo-o. Uma válvula no canal lateral isola o par ampola-pé do resto do sistema, o que permite acionar cada pé separadamente. Ampolas internas existem em Asteroidea e faltam em Ophiuroidea.',
  },
  {
    id: 'canal-circular',
    nome: 'Canal circular',
    sinonimo: 'canal circumbucal, canal anelar',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ambulacral,
    descricao:
      'Anel de líquido que circunda a boca e distribui o sistema ambulacral para os cinco raios. Recebe o canal pétreo e dá origem aos cinco canais radiais. É o ponto de convergência de todo o sistema.',
  },
  {
    id: 'canal-radial',
    nome: 'Canal radial',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.canalMenor,
    descricao:
      'Um por braço. Parte do canal circular e percorre o sulco ambulacral até a ponta do braço, emitindo canais laterais para cada par de ampola e pé. Em Asteroidea fica externo, dentro do sulco aberto.',
  },
  {
    id: 'canal-petreo',
    nome: 'Canal pétreo',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.ambulacral,
    descricao:
      'Liga o madreporito, na face aboral, ao canal circular, junto à boca. Recebe esse nome pelos depósitos esqueléticos na parede. Funciona como uma bomba ciliar que puxa líquido para dentro do sistema.',
  },
  {
    id: 'ossiculo-ambulacral',
    nome: 'Ossículo ambulacral',
    sinonimo: 'placa ambulacral',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Placas de estereoma dispostas em duas fileiras que formam as paredes e o teto do sulco ambulacral, como duas águas de um telhado. Os pés ambulacrais passam entre elas. A musculatura entre as placas permite fechar o sulco.',
  },
  {
    id: 'espinho',
    nome: 'Espinho',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.espinho,
    descricao:
      'Projeção do estereoma coberta por epiderme, articulada e móvel. Dá nome ao filo, pele com espinhos. Nas margens do sulco ambulacral formam uma cerca que protege os pés; na face aboral são mais curtos e esparsos.',
  },
  {
    id: 'papula',
    nome: 'Pápula',
    sinonimo: 'brânquia dérmica',
    sistema: 'respiratório',
    nivel: 2,
    cor: CORES.respiratorio,
    descricao:
      'Evaginação fina da parede corporal, entre as placas do estereoma, com celoma dentro e epiderme fora. É a principal superfície de trocas gasosas do animal e participa também da excreção de amônia. Existe só na face aboral.',
  },
  {
    id: 'pedicelaria',
    nome: 'Pedicelária',
    sistema: 'esquelético',
    nivel: 3,
    cor: CORES.defesa,
    descricao:
      'Estrutura minúscula em forma de pinça, formada por duas ou três valvas móveis de estereoma. Limpa a superfície do corpo, removendo detritos e larvas que tentam se fixar, e em alguns casos defende ativamente contra pequenos predadores. Aqui aparece muito ampliada.',
  },
  {
    id: 'estomago',
    nome: 'Estômago',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Saco amplo e achatado que ocupa o disco central, dividido em porção cárdica, evertível pela boca, e porção pilórica, que recebe os cecos. É a estrutura que a estrela projeta para fora do corpo sobre a presa.',
  },
  {
    id: 'ceco-pilorico',
    nome: 'Ceco pilórico',
    sinonimo: 'glândula digestiva',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.glandula,
    descricao:
      'Par de glândulas ramificadas que ocupa quase todo o interior de cada braço, ligadas à porção pilórica do estômago. Secretam enzimas e absorvem os produtos da digestão. São o que ocupa mais volume dentro do braço.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 3,
    cor: CORES.gonada,
    descricao:
      'Par de massas em cada braço, junto à base, ligadas a gonóporos que se abrem entre os braços. Os sexos são em geral separados e a fecundação é externa. As gônadas crescem muito no período reprodutivo e chegam a preencher o braço.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const R_DISCO = 1.7;
  const R_BRACO = 6.2;
  const H0 = 1.16;
  const N_RAIOS = 5;

  const raio = (u) => {
    const w = (1 + Math.cos(N_RAIOS * u)) / 2;
    return R_DISCO + (R_BRACO - R_DISCO) * Math.pow(w, 2.2);
  };

  const yAboral = (u, rho) => {
    const s = Math.min(1, rho / raio(u));
    const base = H0 * Math.pow(Math.max(0, 1 - s * s), 0.55);
    const crista = 1 + 0.09 * Math.exp(-Math.pow((distanciaAoRaio(u, N_RAIOS) * rho) / 1.0, 2));
    return base * crista;
  };

  const yOral = (u, rho) => {
    const arco = distanciaAoRaio(u, N_RAIOS) * rho;
    const sulco = 0.36 * Math.exp(-Math.pow(arco / 0.42, 2));
    const regiaoBucal = 0.62 * (1 - suavizar((rho - 0.55) / 1.15));
    const y = Math.max(sulco, regiaoBucal);
    return Math.min(y, 0.74 * yAboral(u, rho));
  };

  const p = (u, rho, y) => [rho * Math.cos(u), y, rho * Math.sin(u)];

  /* -------- face aboral -------- */

  A.superficie('parede-aboral', {
    nU: 190, nV: 20, fecharU: true,
    fn: (u, v) => {
      const rho = v * raio(u);
      return p(u, rho, yAboral(u, rho));
    },
  });

  /* -------- face oral, dividida em ambulacro e interambulacro -------- */

  const RHO_BOCA = 0.55;
  const SETOR = TAU / N_RAIOS;
  // meia-largura angular da faixa ambulacral, função apenas de v:
  // assim as duas superfícies calculam a mesma fronteira e a costura fecha
  const xiB = (v) => {
    const rhoRef = RHO_BOCA + v * (R_BRACO - RHO_BOCA);
    const ang = Math.min(0.55, 0.48 / Math.max(0.45, rhoRef));
    return ang / SETOR;
  };

  const oral = (u, v) => {
    const rho = RHO_BOCA + v * (raio(u) - RHO_BOCA);
    return p(u, rho, yOral(u, rho));
  };

  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = k * SETOR;
    // metade da faixa ambulacral de cada lado do eixo do braço
    A.superficie('ambulacro', {
      nU: 12, nV: 30, u0: 0, u1: 1, fecharU: false, inverter: true,
      fn: (a, v) => oral(u0 + a * xiB(v) * SETOR, v),
    });
    A.superficie('ambulacro', {
      nU: 12, nV: 30, u0: 0, u1: 1, fecharU: false, inverter: true,
      fn: (a, v) => oral(u0 + SETOR - a * xiB(v) * SETOR, v),
    });
    A.superficie('interambulacro', {
      nU: 34, nV: 30, u0: 0, u1: 1, fecharU: false, inverter: true,
      fn: (a, v) => {
        const b = xiB(v);
        return oral(u0 + (b + a * (1 - 2 * b)) * SETOR, v);
      },
    });
  }

  /* -------- boca e região peristomial -------- */

  A.toro('boca', RHO_BOCA, 0.09, [0, 0.62, 0]);
  A.cilindro('boca', 0.44, 0.5, 0.26, [0, 0.72, 0], [0, 1, 0], 24);

  /* -------- polos, marcações de referência -------- */

  A.cilindro('polo-aboral', 0.44, 0.44, 0.06, [0, H0 + 0.34, 0], [0, 1, 0], 28);
  A.cilindro('polo-oral', 0.44, 0.44, 0.06, [0, -0.34, 0], [0, 1, 0], 28);

  /* -------- ânus e madreporito -------- */

  A.cilindro('anus', 0.09, 0.12, 0.14, [0.24, H0 - 0.02, 0.14], [0, 1, 0], 12);

  const uMad = SETOR / 2; // interambulacro
  const rhoMad = 1.15;
  A.cilindro(
    'madreporito', 0.3, 0.32, 0.1,
    p(uMad, rhoMad, yAboral(uMad, rhoMad) - 0.02), [0, 1, 0], 26
  );

  /* -------- sistema ambulacral -------- */

  A.toro('canal-circular', 0.86, 0.075, [0, 0.8, 0], [0, 1, 0], TAU, 48);

  const pmC = p(uMad, rhoMad, yAboral(uMad, rhoMad) - 0.1);
  A.tubo('canal-petreo', [
    pmC,
    p(uMad, 1.0, 1.0),
    p(uMad, 0.9, 0.86),
    p(uMad, 0.86, 0.8),
  ], 0.07, 20, 8);

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR;
    const pontos = [];
    for (let i = 0; i <= 14; i++) {
      const rho = 0.86 + (i / 14) * (R_BRACO - 1.35);
      pontos.push(p(u, rho, yOral(u, rho) + 0.24));
    }
    A.tubo('canal-radial', pontos, 0.065, 60, 8);

    /* pés ambulacrais, ampolas, canais laterais, ossículos, espinhos do sulco */
    for (let i = 0; i < 12; i++) {
      const rho = 1.05 + i * 0.4;
      if (rho > R_BRACO - 0.75) break;
      for (const lado of [-1, 1]) {
        const du = (lado * 0.19) / rho;
        const uu = u + du;
        const yS = yOral(uu, rho);
        const base = p(uu, rho, yS + 0.1);
        const ponta = p(uu, rho, -0.18);

        A.entre('pe-ambulacral', base, ponta, 0.075, 8);
        A.cilindro('pe-ambulacral', 0.13, 0.09, 0.06, p(uu, rho, -0.2), [0, 1, 0], 12);

        A.esfera('ampola', 0.135, p(uu, rho, yS + 0.35), 12, [1, 0.8, 1]);
        A.entre('canal-radial', p(u, rho, yOral(u, rho) + 0.24), p(uu, rho, yS + 0.3), 0.035, 6);

        // ossículo ambulacral: telhado de duas águas sobre o sulco
        const duO = (lado * 0.42) / rho;
        A.caixa(
          'ossiculo-ambulacral', [0.3, 0.13, 0.3],
          p(u + duO, rho, yOral(u + duO, rho) + 0.12),
          -u, 0, lado * 0.5
        );

        // espinhos marginais do sulco, voltados para baixo e para fora
        const duE = (lado * 0.72) / rho;
        const pe = p(u + duE, rho, yOral(u + duE, rho) - 0.02);
        A.cone('espinho', 0.085, 0.36, pe, [Math.cos(u + duE) * lado * 0.5, -1, Math.sin(u + duE) * lado * 0.5], 8);
      }
    }
  }

  /* -------- digestório -------- */

  A.esfera('estomago', 1.02, [0, 0.86, 0], 26, [1, 0.34, 1]);

  for (let k = 0; k < N_RAIOS; k++) {
    const u = k * SETOR;
    for (const lado of [-1, 1]) {
      const pontos = [];
      for (let i = 0; i <= 10; i++) {
        const rho = 1.2 + (i / 10) * (R_BRACO - 2.0);
        const du = (lado * 0.34) / Math.max(1.2, rho * 0.55);
        pontos.push(p(u + du, rho, yAboral(u + du, rho) * 0.62));
      }
      A.tubo('ceco-pilorico', pontos, 0.1, 40, 8);
      for (let i = 1; i <= 7; i++) {
        const rho = 1.5 + (i / 7) * (R_BRACO - 2.6);
        const du = (lado * 0.34) / Math.max(1.2, rho * 0.55);
        const y = yAboral(u + du, rho) * 0.62;
        A.esfera('ceco-pilorico', 0.19, p(u + du, rho, y), 10, [1, 0.7, 1]);
      }
      // gônada na base do braço
      const duG = (lado * 0.4) / 1.7;
      A.esfera('gonada', 0.2, p(u + duG, 1.75, 0.5), 12, [1, 0.7, 1.5]);
      A.esfera('gonada', 0.16, p(u + duG, 2.15, 0.46), 12, [1, 0.7, 1.4]);
    }
  }

  /* -------- superfície aboral: espinhos, pápulas, pedicelárias -------- */

  let semente = 7;
  const aleatorio = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };

  for (let i = 0; i < 340; i++) {
    const u = aleatorio() * TAU;
    const rho = 0.5 + aleatorio() * (raio(u) - 0.8);
    if (rho > raio(u) - 0.25) continue;
    const y = yAboral(u, rho);
    const tipo = aleatorio();
    if (tipo < 0.42) {
      A.cone('espinho', 0.075, 0.24, p(u, rho, y + 0.08), [0.2 * Math.cos(u), 1, 0.2 * Math.sin(u)], 7);
    } else if (tipo < 0.88) {
      A.esfera('papula', 0.085, p(u, rho, y + 0.05), 9, [1, 1.5, 1]);
    } else {
      const pb = p(u, rho, y + 0.06);
      A.cone('pedicelaria', 0.055, 0.2, [pb[0] - 0.035, pb[1] + 0.08, pb[2]], [-0.35, 1, 0], 6);
      A.cone('pedicelaria', 0.055, 0.2, [pb[0] + 0.035, pb[1] + 0.08, pb[2]], [0.35, 1, 0], 6);
    }
  }

  return A.grupo();
}
