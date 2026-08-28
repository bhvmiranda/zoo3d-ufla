/* ============================================================
   ZOO3D UFLA · modelos/crinoidea/geometria.js
   GBI109 · Aula 2 · Echinodermata · classe Crinoidea

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 25.
            Diagnose de Crinoidea: braços irradiam da concavidade central,
            o cálice; boca e superfície oral voltadas PARA CIMA; pedúnculo
            aboral, quando existe, origina-se do lado aboral do cálice;
            ambulacro nos braços, que contêm PÍNULAS; ambulacro não
            calcificado, com canal aquífero radial EXTERNO; cada lado do
            ambulacro tem paliçada de placas de cobertura; pés tubulares
            diminutos, SEM ventosas, em grupos de três (Figura 25.3 D);
            madreporito, boca e ânus na superfície oral do cálice.
            Ordem Isocrinida: pedúnculo com elementos nodais, que portam
            cirros, e internodais. Comatulida perde o pedúnculo no adulto.
          · Slides de GBI109 de Marcel Gustavo Hermes e Renato Gregorin.
            Crinoidea como linhagem mais antiga entre as classes viventes,
            com boca voltada para cima e pedúnculo de fixação.
   IMAGEM · Isocrinus e Neocrinus em vista lateral; cálice e tégmen com
            tubo anal; pínulas com sulco ambulacral aberto; fósseis de
            Pentacrinites para a leitura dos columnais.
   VÍDEO  · Comátulas nadando pela ondulação alternada dos braços;
            captura de partículas pelos pés tubulares nas pínulas.

   Modelo de um lírio-do-mar PEDUNCULADO. Comátulas, que são a maioria
   das espécies viventes, perdem o pedúnculo e prendem-se pelos cirros.

   Eixos: Y = eixo oral-aboral, e aqui o ORAL APONTA PARA CIMA
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'crinoidea',
  titulo: 'Crinoidea: lírio-do-mar',
  disciplina: 'GBI109',
  aula: 'Aula 2 · Echinodermata',
  grupo: 'Crinoidea',
  dimensaoReal: 'coroa de 8 a 15 cm, pedúnculo de 10 a 60 cm',
  escala: { realPorUnidade: 22, unidade: 'mm' },
  simplificacoes: [
    'Pedúnculo encurtado para caber no enquadramento. No animal ele é várias vezes mais longo que a coroa.',
    'Dez braços, resultado de uma bifurcação na base dos cinco raios. Há espécies com muito mais, até duzentos.',
    'Pínulas em número reduzido e apenas de um tipo. No animal alternam pínulas orais, genitais e distais.',
    'Pés tubulares representados apenas em parte das pínulas, e em grupos de três como no animal.',
    'Columnais representados como discos empilhados iguais; em Isocrinida alternam elementos nodais, com cirros, e internodais.',
  ],
  focos: [
    { nome: 'cálice e tégmen', centro: [0, 0.35, 0], raio: 1.9 },
    { nome: 'coroa de braços', centro: [0, 2.6, 0], raio: 4.6 },
    { nome: 'pedúnculo', centro: [0, -3.4, 0], raio: 2.6 },
    { nome: 'uma pínula', centro: [2.9, 2.7, 0], raio: 1.6 },
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
      'Centro do tégmen, onde está a boca, VOLTADO PARA CIMA. Esta é a orientação incomum da classe: nas outras quatro o polo oral aponta para o substrato ou para a frente. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'polo-aboral',
    nome: 'Polo aboral',
    sistema: 'eixo do corpo',
    nivel: 1,
    cor: CORES.eixo,
    descricao:
      'Base do cálice, de onde parte o pedúnculo. É o lado que fica preso ao substrato. Compare com Asteroidea, onde este mesmo polo é o que aponta para cima. Marcação de referência, não estrutura anatômica.',
  },
  {
    id: 'pedunculo',
    nome: 'Pedúnculo',
    sinonimo: 'pedicelo, coluna',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.7,
    descricao:
      'Haste articulada que sai do lado aboral do cálice e fixa o animal ao fundo, formada por uma pilha de ossículos discoides. Os lírios-do-mar o mantêm a vida inteira; as comátulas, que são a maioria das espécies atuais, o perdem depois do estágio pós-larval e passam a viver soltas.',
  },
  {
    id: 'columnal',
    nome: 'Columnal',
    sinonimo: 'ossículo columnar',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Cada disco de estereoma da pilha que forma o pedúnculo, unido ao vizinho por ligamento e com um canal central para o cordão celômico. São eles que se desarticulam depois da morte e formam os fósseis em forma de moeda, tão abundantes em calcários do Paleozoico que dão nome a rochas inteiras.',
  },
  {
    id: 'cirro',
    nome: 'Cirro',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Apêndice articulado e preênsil que sai em verticilos dos columnais nodais do pedúnculo. Ancora o animal ao substrato. Nas comátulas, que não têm pedúnculo, os cirros nascem na base do cálice e são o único meio de fixação, permitindo soltar-se e nadar.',
  },
  {
    id: 'calice',
    nome: 'Cálice',
    sinonimo: 'teca, taça aboral',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.65,
    descricao:
      'Concavidade central em forma de taça, feita de placas de estereoma, que aloja as vísceras. Dela irradiam os braços, e do seu lado aboral parte o pedúnculo. É a única parte do corpo que corresponde ao disco de uma estrela-do-mar: os braços são todo o resto.',
  },
  {
    id: 'tegmen',
    nome: 'Tégmen',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.oral,
    descricao:
      'Membrana coriácea, com placas calcárias, que fecha o cálice por cima e forma a superfície oral. Traz a boca no centro, os cinco sulcos ambulacrais que a alcançam, o tubo anal e os poros do sistema ambulacral. A face de baixo aparece quando se aplica um plano de corte.',
  },
  {
    id: 'ambulacro',
    nome: 'Ambulacro',
    sinonimo: 'sulco ambulacral',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.ambulacro,
    descricao:
      'Sulco ABERTO que corre pela face oral de cada braço e de cada pínula, e converge para a boca pelo tégmen. Não é calcificado: fecha as cavidades celômicas do braço com tecido mole, e o canal aquífero radial corre por fora, dentro dele. Aberto como em Asteroidea, mas aqui voltado para CIMA, o que faz dele um sistema de coleta e não de locomoção.',
  },
  {
    id: 'interambulacro',
    nome: 'Interambulacro',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Os setores do tégmen entre dois sulcos ambulacrais vizinhos. É em um deles que se ergue o tubo anal, deslocado do centro, o que quebra a simetria pentarradial perfeita da face oral.',
  },
  {
    id: 'placa-de-cobertura',
    nome: 'Placa de cobertura',
    sistema: 'esquelético',
    nivel: 3,
    cor: CORES.esqueleto,
    descricao:
      'Paliçada de plaquinhas móveis ao longo dos dois lados de cada sulco ambulacral. Fecham-se sobre o sulco protegendo os pés tubulares e o alimento em trânsito, e abrem-se quando o animal está alimentando. Estão em toda a extensão do sulco, do braço à pínula.',
  },
  {
    id: 'braco',
    nome: 'Braço',
    sinonimo: 'ossículo braquial',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Cinco raios que quase sempre se bifurcam logo na base, resultando em dez ou mais braços, sustentados por ossículos braquiais articulados. Estendem-se em leque contra a corrente, formando uma superfície de filtragem. Ao contrário de Asteroidea, os braços contêm extensões das somatoceles em continuidade com o cálice.',
  },
  {
    id: 'pinula',
    nome: 'Pínula',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Ramificação fina e articulada que sai alternadamente dos lados de cada braço, dando ao conjunto o aspecto de pena. É a estrutura que multiplica a superfície de captura de partículas em suspensão, e é exclusiva desta classe entre os equinodermos viventes.',
  },
  {
    id: 'pe-ambulacral',
    nome: 'Pé ambulacral',
    sinonimo: 'pé tubular, pódio',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.peTubular,
    descricao:
      'Diminutos, SEM ventosa, dispostos em GRUPOS DE TRÊS ao longo dos sulcos das pínulas, cada grupo servido por um ramo do canal radial. Não caminham: capturam partículas com papilas adesivas e as empurram, envoltas em muco, sulco abaixo até a boca. São também os principais órgãos sensoriais do animal.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura central do tégmen, voltada para CIMA, para onde convergem os cinco sulcos ambulacrais carregando o cordão de muco com as partículas capturadas. Boca e ânus ficam na mesma face, o que não acontece em nenhuma das outras classes.',
  },
  {
    id: 'tubo-anal',
    nome: 'Tubo anal',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Cone erguido em um dos interambulacros do tégmen, com o ânus na ponta. Ergue-se justamente para lançar os resíduos acima do tégmen e longe dos sulcos que trazem o alimento, resolvendo o problema de ter as duas aberturas na mesma face.',
  },
  {
    id: 'madreporito',
    nome: 'Madreporito',
    sinonimo: 'hidroporos',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.madreporito,
    descricao:
      'Aqui a entrada de água do sistema ambulacral fica na superfície oral do cálice, sobre o tégmen, e em geral não é uma placa única: aparece como muitos poros pequenos espalhados. É a classe em que essa estrutura está menos individualizada.',
  },
  {
    id: 'canal-radial',
    nome: 'Canal radial',
    sinonimo: 'canal aquífero radial',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.canalMenor,
    descricao:
      'Corre dentro do sulco ambulacral, portanto EXTERNO, do cálice até a ponta de cada braço, ramificando-se para cada pínula e para cada grupo de três pés. É a mesma condição externa de Asteroidea, e o oposto de Echinoidea, onde o canal fica trancado dentro da testa.',
  },
  {
    id: 'canal-circular',
    nome: 'Canal circular',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.ambulacral,
    descricao:
      'Anel dentro do cálice, ao redor do esôfago, de onde partem os canais radiais para os braços. Recebe água pelos poros do tégmen, por vias mais difusas que o canal pétreo único das outras classes.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Tubo enrolado dentro do cálice, que faz uma volta quase completa entre o esôfago, que desce da boca, e o reto, que sobe ao tubo anal. Todo o digestório cabe no cálice: os braços não o alojam, ao contrário do que acontece em Asteroidea.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Não ficam no cálice: alojam-se dentro das pínulas genitais, próximas à base dos braços, que incham visivelmente na estação reprodutiva. Os gametas saem pela ruptura da parede da pínula. É um arranjo sem paralelo nas outras classes.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const N_RAIOS = 5;
  const SETOR = TAU / N_RAIOS;
  const N_BRACOS = 10;

  /* -------- pedúnculo e cirros -------- */

  const Y_BASE = -6.0;
  const Y_CALICE = -0.75;
  const N_COL = 26;
  for (let i = 0; i < N_COL; i++) {
    const t = i / (N_COL - 1);
    const y = Y_BASE + t * (Y_CALICE - Y_BASE);
    const r = 0.24 + 0.1 * t;
    A.cilindro('columnal', r, r, 0.14, [0, y, 0], [0, 1, 0], 14);
    A.cilindro('pedunculo', r * 0.82, r * 0.82, (Y_CALICE - Y_BASE) / N_COL, [0, y + 0.09, 0], [0, 1, 0], 12);

    // verticilos de cirros nos columnais nodais
    if (i % 8 === 3) {
      for (let c = 0; c < 8; c++) {
        const a = (c / 8) * TAU;
        const pontos = [];
        for (let j = 0; j <= 6; j++) {
          const s = j / 6;
          pontos.push([
            Math.cos(a) * (r + s * 1.1),
            y - s * s * 0.9,
            Math.sin(a) * (r + s * 1.1),
          ]);
        }
        A.tubo('cirro', pontos, 0.05, 18, 6);
      }
    }
  }

  /* -------- cálice -------- */

  const perfilCalice = (v) => {
    // v de 0 (base aboral) a 1 (borda do tégmen)
    const y = Y_CALICE + v * 1.35;
    const r = 0.34 + 0.82 * Math.pow(v, 0.72);
    return [r, y];
  };

  A.superficie('calice', {
    nU: 72, nV: 18, fecharU: true,
    fn: (u, v) => {
      const [r, y] = perfilCalice(v);
      return [r * Math.cos(u), y, r * Math.sin(u)];
    },
  });
  A.superficie('calice', {
    nU: 72, nV: 6, fecharU: true, inverter: true,
    fn: (u, v) => {
      const [r, y] = perfilCalice(v);
      return [r * 0.86 * Math.cos(u), y + 0.1, r * 0.86 * Math.sin(u)];
    },
  });

  /* -------- tégmen, dividido em ambulacro e interambulacro -------- */

  const R_TEG = 1.16;
  const Y_TEG = 0.6;
  const R_BOCA = 0.26;
  const XI_A = 0.17;

  const tegmen = (u, v) => {
    const r = R_BOCA + v * (R_TEG - R_BOCA);
    const s = r / R_TEG;
    const y = Y_TEG + 0.26 * (1 - s * s) - 0.05 * s;
    return [r * Math.cos(u), y, r * Math.sin(u)];
  };
  // o sulco ambulacral rebaixa a faixa ambulacral
  const tegmenSulco = (u, v) => {
    const q = tegmen(u, v);
    return [q[0], q[1] - 0.1, q[2]];
  };

  for (let k = 0; k < N_RAIOS; k++) {
    const u0 = k * SETOR;
    A.superficie('ambulacro', {
      nU: 6, nV: 10, u0: 0, u1: 1,
      fn: (a, v) => tegmenSulco(u0 + a * XI_A * SETOR, v),
    });
    A.superficie('ambulacro', {
      nU: 6, nV: 10, u0: 0, u1: 1,
      fn: (a, v) => tegmenSulco(u0 - a * XI_A * SETOR, v),
    });
    A.superficie('interambulacro', {
      nU: 20, nV: 10, u0: 0, u1: 1,
      fn: (a, v) => tegmen(u0 + (XI_A + a * (1 - 2 * XI_A)) * SETOR, v),
    });
  }

  A.superficie('tegmen', {
    nU: 72, nV: 10, fecharU: true, inverter: true,
    fn: (u, v) => {
      const q = tegmen(u, v);
      return [q[0], q[1] - 0.16, q[2]];
    },
  });

  /* -------- boca, tubo anal, poros, polos -------- */

  A.cilindro('boca', R_BOCA, R_BOCA * 0.8, 0.2, [0, Y_TEG + 0.82, 0], [0, 1, 0], 20);

  const uAnal = SETOR / 2;
  const rAnal = 0.62;
  A.cone('tubo-anal', 0.24, 0.9,
    [Math.cos(uAnal) * rAnal, Y_TEG + 0.95, Math.sin(uAnal) * rAnal], [0, 1, 0], 16);
  A.cilindro('tubo-anal', 0.08, 0.1, 0.12,
    [Math.cos(uAnal) * rAnal, Y_TEG + 1.36, Math.sin(uAnal) * rAnal], [0, 1, 0], 12);

  let semente = 55;
  const aleat = () => {
    semente = (semente * 16807) % 2147483647;
    return semente / 2147483647;
  };
  for (let i = 0; i < 14; i++) {
    const u = aleat() * TAU;
    const v = 0.35 + aleat() * 0.5;
    const q = tegmen(u, v);
    A.esfera('madreporito', 0.075, [q[0], q[1] + 0.02, q[2]], 8);
  }

  A.cilindro('polo-oral', 0.32, 0.32, 0.06, [0, Y_TEG + 1.6, 0], [0, 1, 0], 24);
  A.cilindro('polo-aboral', 0.32, 0.32, 0.06, [0, Y_CALICE - 0.5, 0], [0, 1, 0], 24);

  /* -------- vísceras do cálice -------- */

  A.toro('canal-circular', 0.52, 0.06, [0, Y_TEG - 0.05, 0], [0, 1, 0], TAU, 32);
  const volta = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const a = t * TAU * 1.15;
    const r = 0.62 - 0.18 * Math.sin(t * Math.PI);
    volta.push([Math.cos(a) * r, Y_CALICE + 0.3 + t * 0.75, Math.sin(a) * r]);
  }
  A.tubo('intestino', [[0, Y_TEG + 0.6, 0], ...volta,
    [Math.cos(uAnal) * rAnal, Y_TEG + 0.75, Math.sin(uAnal) * rAnal]], 0.13, 90, 8);

  /* -------- braços e pínulas -------- */

  const pontoBraco = (a, s) => {
    const rho = 1.05 + 4.5 * Math.pow(s, 1.06);
    const y = Y_TEG + 0.1 + 3.5 * Math.pow(s, 0.62) - 1.1 * s * s;
    return [Math.cos(a) * rho, y, Math.sin(a) * rho];
  };

  const N_SEG = 17;
  for (let b = 0; b < N_BRACOS; b++) {
    const raizAng = Math.floor(b / 2) * SETOR;
    const a = raizAng + (b % 2 === 0 ? -0.16 : 0.16);
    const lateral = [-Math.sin(a), 0, Math.cos(a)];
    const canal = [];

    for (let i = 0; i < N_SEG - 1; i++) {
      const s0 = i / (N_SEG - 1);
      const s1 = (i + 1) / (N_SEG - 1);
      const p0 = pontoBraco(a, s0);
      const p1 = pontoBraco(a, s1);
      const esp = 0.19 * (1 - 0.55 * s0);

      A.entre('braco', p0, p1, esp, 9);

      // sulco ambulacral aberto, na face oral do braço, voltada para cima
      const g0 = [p0[0], p0[1] + esp * 0.82, p0[2]];
      const g1 = [p1[0], p1[1] + esp * 0.82, p1[2]];
      A.entre('ambulacro', g0, g1, esp * 0.42, 7);
      canal.push([g0[0], g0[1] + esp * 0.1, g0[2]]);

      // placas de cobertura, paliçada dos dois lados do sulco
      if (i % 2 === 0) {
        for (const lado of [-1, 1]) {
          A.caixa('placa-de-cobertura', [0.1, 0.16, 0.1],
            [g0[0] + lateral[0] * lado * esp * 0.6, g0[1] + 0.05, g0[2] + lateral[2] * lado * esp * 0.6],
            -a, 0, lado * 0.5);
        }
      }

      // pínulas alternando de lado
      if (i >= 2 && i % 2 === 0) {
        const lado = i % 4 === 0 ? 1 : -1;
        const comp = 1.15 * (1 - 0.45 * s0);
        const pin = [];
        for (let j = 0; j <= 5; j++) {
          const t = j / 5;
          pin.push([
            p0[0] + lateral[0] * lado * comp * t,
            p0[1] + comp * t * 0.55 + esp * 0.5,
            p0[2] + lateral[2] * lado * comp * t,
          ]);
        }
        A.tubo('pinula', pin, esp * 0.36, 16, 6);

        // pés tubulares em grupos de três, ao longo do sulco da pínula
        for (let g = 1; g <= 3; g++) {
          const t = g / 4;
          const base = [
            p0[0] + lateral[0] * lado * comp * t,
            p0[1] + comp * t * 0.55 + esp * 0.5 + esp * 0.3,
            p0[2] + lateral[2] * lado * comp * t,
          ];
          for (let n = 0; n < 3; n++) {
            A.cone('pe-ambulacral', 0.035, 0.2,
              [base[0] + lateral[0] * lado * 0.05 * n, base[1] + 0.08, base[2] + lateral[2] * lado * 0.05 * n],
              [0.3 * (n - 1), 1, 0.2], 6);
          }
        }

        // gônadas nas pínulas genitais, próximas à base do braço
        if (i <= 6) {
          A.esfera('gonada', esp * 0.55, [
            p0[0] + lateral[0] * lado * comp * 0.45,
            p0[1] + comp * 0.25 + esp * 0.5,
            p0[2] + lateral[2] * lado * comp * 0.45,
          ], 10, [1, 1.4, 1]);
        }
      }
    }

    A.tubo('canal-radial', [[Math.cos(a) * 0.52, Y_TEG - 0.02, Math.sin(a) * 0.52], ...canal], 0.045, 70, 6);
  }

  return A.grupo();
}
