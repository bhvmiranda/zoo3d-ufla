/* ============================================================
   ZOO3D UFLA · modelos/pterobranchia/geometria.js
   GBI109 · Aula 3 · Hemichordata · classe Pterobranchia

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 26, seções
            "CLASSE PTEROBRANCHIA", "Plano corpóreo dos hemicordados" e
            "Pterobrânquios" (edição brasileira, cerca de p. 1198-1208).
            Corpo tripartite (escudo cefálico/prossomo, colarinho
            tentaculado/mesossomo, tronco e pedúnculo/metassomo); tubo
            digestivo em "U" (tubo oral, divertículo oral dorsal,
            faringe, esôfago, estômago saculiforme, intestino, ânus
            dorsal anterior); Rhabdopleura com um par de braços e SEM
            fenda branquial, contra cinco a nove pares de braços e UM
            par de fenda branquial em Cephalodiscus; complexo
            circulatório-excretor reduzido (coração/seio central,
            vesícula cardíaca, glomérulo); gânglio do colarinho;
            reprodução colonial por brotamento ao longo de estolões
            (Rhabdopleura) dentro de um coenécio secretado pelo escudo
            cefálico.
          · Slides de GBI109 Aula 3 de Marcel Gustavo Hermes: prossoma
            de Pterobranchia como escudo pré-oral secretor, e não
            estrutura locomotora como em Enteropneusta; mesossomo como
            base dos braços tentaculados; usa Rhabdopleura como
            exemplo de colônia estolonial.
   IMAGEM · Busca de imagem confirmou o tamanho real: zooide de 1 a
            5 mm, dentro de um coenécio tubular secretado, rastejante
            ou ereto, com os zooides ligados por um sistema de
            estolões. Referência de forma: desenhos de colônia e de
            zooide de Rhabdopleura, e a Figura 26.6 do Brusca (corte
            sagital de Cephalodiscus) para a disposição interna do
            tubo digestivo em U.
   VÍDEO  · Nenhum consultado especificamente; o grupo é raro e pouco
            filmado vivo.

   Referência de espécie: Rhabdopleura (não Cephalodiscus), porque
   forma colônia de verdade — zooides ligados por estolões, nunca se
   soltam — o que ecoa o mesmo recurso já usado no modelo de ascídia
   social. Por isso o modelo tem só 1 par de braços (2 no total) e
   NENHUMA fenda branquial, ao contrário de Cephalodiscus.

   Eixos, FORA do padrão do projeto — mesmo caso do Porifera e da
   ascídia, organismo séssil dentro de um tubo:
   Y = eixo da base do tubo (−Y, pedúnculo/estolão) ao topo (+Y, escudo
       cefálico e braços, onde o zooide se estende pra fora do tubo
       pra filtrar).
   X, Z = plano transversal, usado pra separar os dois braços.
   ============================================================ */

import { Acervo, TAU, suavizar } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'pterobranchia',
  titulo: 'Pterobranchia: colônia de pterobrânquios',
  disciplina: 'GBI109',
  aula: 'Aula 3 · Hemichordata, Cephalochordata e Urochordata',
  grupo: 'Hemichordata · Pterobranchia',
  dimensaoReal: 'zooide de 1 a 5 mm (Rhabdopleura), dentro de um coenécio tubular secretado',
  escala: { realPorUnidade: 1.4, unidade: 'mm' },
  simplificacoes: [
    'Referência é Rhabdopleura: um par de braços e nenhuma fenda branquial. Cephalodiscus, a outra família viva, tem de cinco a nove pares de braços e um par de fenda branquial, e forma agregados soltos, não colônias ligadas por estolão.',
    'Duas fileiras de tentáculos por braço, em número bem reduzido: o animal real tem muito mais, e ciliados.',
    'O coenécio aparece cortado ao meio para mostrar o zooide dentro; no animal ele é fechado, translúcido, e o zooide só sai pela abertura para se alimentar.',
    'A colônia aparece com dois zooides ligados por um estolão, um deles ainda em formação. Uma colônia real pode ter dezenas a centenas de zooides.',
    'Sistema circulatório-excretor reduzido a coração, vesícula cardíaca e glomérulo; a rede de lacunas basoepiteliais que os liga não está representada.',
  ],
  caracteres: [
    { nome: 'Notocorda', estado: 'ausente', estrutura: 'diverticulo-oral',
      nota: 'O divertículo oral existe, mas é praticamente sólido, sem as células vacuoladas que a estomocorda tem em Enteropneusta — ainda mais distante de ser notocorda do que já era lá.' },
    { nome: 'Tubo nervoso dorsal', estado: 'parcial', estrutura: 'ganglio-do-colarinho',
      nota: 'Existe uma concentração de neurônios no colarinho, o gânglio do colarinho, supostamente homóloga à neurocorda de Enteropneusta — mas há poucos estudos, e o próprio Brusca usa "supostamente". Não está claro que seja oca como lá.' },
    { nome: 'Fendas faríngeas', estado: 'ausente', estrutura: 'faringe',
      nota: 'Rhabdopleura não tem nenhuma. Cephalodiscus tem só um par. Compare com Enteropneusta, que tem dezenas a mais de cem pares — a tendência de redução é forte dentro do próprio filo.' },
    { nome: 'Cauda pós-anal', estado: 'ausente',
      nota: 'Sem cauda pós-anal. Curiosamente, o Brusca aponta que a cauda pós-anal do juvenil de Enteropneusta não é comparável à cauda de cordado, mas é comparável ao pedúnculo dos pterobrânquios — uma homologia dentro de Hemichordata, não com Chordata.' },
    { nome: 'Endóstilo', estado: 'ausente' },
  ],
  focos: [
    { nome: 'braços e tentáculos', centro: [0, 0.65, -0.02], raio: 0.95 },
    { nome: 'escudo cefálico e boca', centro: [0, 0.4, 0.05], raio: 0.4 },
    { nome: 'tronco', centro: [0, -0.2, -0.03], raio: 0.45 },
    { nome: 'estolão e broto', centro: [-0.65, -0.6, 0.05], raio: 1.0 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'coenecio',
    nome: 'Coenécio',
    sinonimo: 'tubo colonial',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.madreporito,
    rugosidade: 0.3,
    descricao:
      'Envoltório tubular secretado pelo escudo cefálico, translúcido e parecido com pergaminho. Não é parte do corpo do animal: é a casa que ele constrói e onde vive fixo. Toda a colônia — todos os zooides ligados por estolão — mora dentro do mesmo sistema de tubos.',
  },
  {
    id: 'escudo-cefalico',
    nome: 'Escudo cefálico',
    sinonimo: 'disco pré-oral, prossoma',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.6,
    descricao:
      'Primeira das três regiões do corpo. Em Enteropneusta o mesmo território é a probóscide, usada para escavar; aqui virou uma sola rastejante e glandular, que se dobra sobre a boca e secreta o material do coenécio. Mesmo plano corporal, função oposta.',
  },
  {
    id: 'colarinho',
    nome: 'Colarinho',
    sinonimo: 'mesossoma',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.oral,
    descricao:
      'Segunda região do corpo, com a boca na borda anteroventral. Se estende dorsalmente formando os braços tentaculados — em Enteropneusta esse mesmo território só forma um colar liso ao redor da faringe.',
  },
  {
    id: 'braco',
    nome: 'Braço',
    sistema: 'ambulacral',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Prolongamento do colarinho, coberto por duas fileiras de tentáculos ciliados. Rhabdopleura tem só um par; Cephalodiscus tem de cinco a nove pares, que se entrelaçam numa "esfera alimentar". É a estrutura que faz o filtro alimentar, esticada pra fora do coenécio durante a alimentação.',
  },
  {
    id: 'tentaculo',
    nome: 'Tentáculo',
    sistema: 'ambulacral',
    nivel: 2,
    cor: CORES.peTubular,
    descricao:
      'Projeção ciliada em fileira dupla ao longo do braço. O muco que reveste os tentáculos retém partículas em suspensão, levadas pelos cílios até a boca. Não são estruturas novas: como os pés ambulacrais de Echinodermata, são derivadas do mesmo plano ancestral de Ambulacraria.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura sob a borda anteroventral do colarinho, coberta pelo escudo cefálico dobrado sobre ela. Dá início ao tubo digestivo em formato de "U", que termina no ânus, também na região anterior.',
  },
  {
    id: 'tubo-oral',
    nome: 'Tubo oral',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Primeiro trecho do tubo digestivo, logo depois da boca. É dele que se origina o divertículo oral, projetado dorsalmente.',
  },
  {
    id: 'diverticulo-oral',
    nome: 'Divertículo oral',
    sistema: 'esquelético',
    nivel: 2,
    cor: CORES.esqueleto,
    descricao:
      'Projeção dorsal sólida do tubo oral, homóloga à estomocorda de Enteropneusta, mas sem as células vacuoladas que dão sustentação lá — aqui é praticamente maciça. Ajuda a ancorar o complexo coração-glomérulo.',
  },
  {
    id: 'faringe',
    nome: 'Faringe',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Trecho seguinte do tubo digestivo. Em Rhabdopleura não tem fenda branquial nenhuma; em Cephalodiscus tem um único par, bem mais simples que os de Enteropneusta, sem barras secundárias.',
  },
  {
    id: 'esofago',
    nome: 'Esôfago',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Tubo curto que liga a faringe ao estômago.',
  },
  {
    id: 'estomago',
    nome: 'Estômago',
    sinonimo: 'saco estomacal',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Saco amplo que ocupa a maior parte do tronco. É o ponto mais baixo do tubo digestivo em "U": depois dele, o intestino sobe de volta até o ânus, perto de onde a boca está.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Parte ascendente do tubo em "U", do estômago até o ânus. O caminho todo — boca, tubo oral, faringe, esôfago, estômago, intestino, ânus — cabe dentro do pequeno corpo do zooide.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Abre-se anterodorsalmente, perto do colarinho — não na ponta do corpo, porque o tubo digestivo fecha o "U" ali mesmo, longe do pedúnculo.',
  },
  {
    id: 'tronco',
    nome: 'Tronco',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Parte anterior do metassoma, globular a piriforme, que aloja o estômago e a maior parte do tubo digestivo. Em Enteropneusta o metassoma é longo e dividido em três regiões; aqui é curto e simples.',
  },
  {
    id: 'pedunculo',
    nome: 'Pedúnculo',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.aboral,
    descricao:
      'Parte posterior do metassoma, delgada, que conecta o tronco ao estolão. É dele que crescem os estolões em Rhabdopleura. Comparável — dentro do próprio filo, não com cordados — à cauda pós-anal dos juvenis de Enteropneusta.',
  },
  {
    id: 'vesicula-cardiaca',
    nome: 'Vesícula cardíaca',
    sinonimo: 'coração, seio central',
    sistema: 'circulatório',
    nivel: 2,
    cor: CORES.musculo,
    descricao:
      'Versão reduzida do complexo da probóscide de Enteropneusta: um seio central contrátil associado ao divertículo oral, que empurra fluido para o glomérulo. Bem mais simples aqui, sem os vasos longitudinais elaborados do verme-bolota.',
  },
  {
    id: 'glomerulo',
    nome: 'Glomérulo',
    sistema: 'excretor',
    nivel: 2,
    cor: CORES.celoma,
    descricao:
      'Estrutura filtradora associada à vesícula cardíaca, junto à base do escudo cefálico. Mesma função excretora do glomérulo de Enteropneusta, em versão reduzida.',
  },
  {
    id: 'ganglio-do-colarinho',
    nome: 'Gânglio do colarinho',
    sistema: 'nervoso',
    nivel: 2,
    cor: CORES.nervoso,
    descricao:
      'Concentração de neurônios no mesossomo, de onde partem ramos para o escudo cefálico e o sistema tentacular. É o que resta, nesta classe, do que em Enteropneusta é um cordão nervoso dorsal oco.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 3,
    cor: CORES.gonada,
    descricao:
      'Única em Rhabdopleura, abrindo por um poro no lado direito do tronco — em Cephalodiscus são pareadas. Os ovócitos são fecundados dentro do próprio tubo da colônia.',
  },
  {
    id: 'estolao',
    nome: 'Estolão',
    sistema: 'colonial',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.5,
    descricao:
      'Prolongamento que cresce da ponta do pedúnculo dos zooides adultos, por onde novos indivíduos brotam. Em Rhabdopleura os brotos nunca se soltam do zooide-mãe, e é assim que a colônia cresce — o broto ao lado ainda está se formando.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const amostrar = (arr, t) => {
    const x = Math.max(0, Math.min(0.9999, t)) * (arr.length - 1);
    const i = Math.floor(x);
    const f = x - i;
    return arr[i] * (1 - f) + arr[Math.min(arr.length - 1, i + 1)] * f;
  };

  const ALT = 1.5;
  const Y0 = -0.55;
  const yy = (t) => Y0 + t * ALT; // t=0 base do tronco · t=1 topo, boca do coenécio

  const CONTROLES_TUBO = [0.34, 0.4, 0.44, 0.46, 0.44, 0.4, 0.35];
  const rTubo = (t) => amostrar(CONTROLES_TUBO, suavizar(t));

  function construirZooide({ escala = 1, pos = [0, 0, 0], nivelDetalhe = 1 }) {
    const [ox, oy, oz] = pos;

    /* -------- coenécio: tubo aberto, cortado ao meio -------- */

    A.superficie('coenecio', {
      nU: 26, nV: 24, u0: -Math.PI * 0.86, u1: Math.PI * 0.86,
      fn: (u, v) => {
        const t = v;
        const r = rTubo(t) * escala;
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    if (nivelDetalhe === 0) return; // broto: só o coenécio nascente, zooide ainda não formado

    /* -------- escudo cefálico, colarinho, tronco, pedúnculo -------- */

    const yTronco0 = oy + yy(0.05) * escala;
    const yTronco1 = oy + yy(0.42) * escala;
    A.superficie('tronco', {
      nU: 24, nV: 16, fecharU: true,
      fn: (u, v) => {
        const t = v;
        const r = (0.16 + 0.15 * Math.sin(Math.PI * t)) * escala;
        return [ox + r * Math.cos(u), yTronco0 + (yTronco1 - yTronco0) * t, oz + r * Math.sin(u)];
      },
    });

    const yColarinho0 = yTronco1;
    const yColarinho1 = oy + yy(0.56) * escala;
    A.cilindro('colarinho', 0.13 * escala, 0.16 * escala, yColarinho1 - yColarinho0,
      [ox, (yColarinho0 + yColarinho1) / 2, oz], [0, 1, 0], 16);

    const centroEscudo = [ox, oy + yy(0.68) * escala, oz + 0.03 * escala];
    A.esfera('escudo-cefalico', 0.15 * escala, centroEscudo, 14, [1.3, 0.55, 1.3]);

    A.cilindro('boca', 0.055 * escala, 0.07 * escala, 0.05 * escala,
      [ox, yColarinho1 - 0.02 * escala, oz + 0.1 * escala], [0.2, -0.6, 1], 10);

    /* -------- braços e tentáculos: 1 par, curvando pra fora e pra cima -------- */

    for (const lado of [-1, 1]) {
      const baseB = [ox + lado * 0.1 * escala, yColarinho1, oz];
      const pontos = [];
      const N = 8;
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        pontos.push([
          baseB[0] + lado * Math.sin(t * 1.3) * 0.5 * escala,
          baseB[1] + t * 0.62 * escala,
          baseB[2] + Math.cos(t * 0.7) * 0.18 * escala - 0.18 * escala,
        ]);
      }
      A.tubo('braco', pontos, 0.045 * escala, 30, 7);

      for (let i = 2; i <= N; i++) {
        const p0 = pontos[i - 1], p1 = pontos[i];
        const dir = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
        const dlen = Math.hypot(dir[0], dir[1], dir[2]) || 1;
        const perp = [-dir[2] / dlen, 0, dir[0] / dlen];
        for (const s of [-1, 1]) {
          const base = [
            (p0[0] + p1[0]) / 2 + perp[0] * s * 0.04 * escala,
            (p0[1] + p1[1]) / 2,
            (p0[2] + p1[2]) / 2 + perp[2] * s * 0.04 * escala,
          ];
          A.cone('tentaculo', 0.014 * escala, 0.16 * escala,
            [base[0] + perp[0] * s * 0.08 * escala, base[1] + 0.02 * escala, base[2] + perp[2] * s * 0.08 * escala],
            [perp[0] * s, 0.7, perp[2] * s], 5);
        }
      }
    }

    /* -------- tubo digestivo em "U" -------- */

    const pBoca = [ox, yColarinho1 - 0.03 * escala, oz + 0.09 * escala];
    const pTuboOral = [ox, yColarinho1 - 0.1 * escala, oz + 0.04 * escala];
    A.tubo('tubo-oral', [pBoca, pTuboOral], 0.045 * escala, 12, 8);

    A.cone('diverticulo-oral', 0.05 * escala, 0.16 * escala,
      [ox, pTuboOral[1] + 0.09 * escala, pTuboOral[2] - 0.02 * escala], [0, 1, -0.15], 8);

    const pFaringe = [ox, yColarinho0 + 0.04 * escala, oz];
    A.tubo('faringe', [pTuboOral, pFaringe], 0.06 * escala, 16, 8);

    const pEsofago = [ox, yTronco1 - 0.02 * escala, oz - 0.02 * escala];
    A.tubo('esofago', [pFaringe, pEsofago], 0.05 * escala, 14, 7);

    const pEstomago = [ox, (yTronco0 + yTronco1) / 2, oz - 0.03 * escala];
    A.esfera('estomago', 0.17 * escala, pEstomago, 14, [1, 1.05, 0.95]);

    const pAnus = [ox, yColarinho0 + 0.14 * escala, oz + 0.07 * escala];
    A.tubo('intestino', [
      pEstomago,
      [pEstomago[0] + 0.03 * escala, (pEstomago[1] + pAnus[1]) / 2, pEstomago[2] + 0.02 * escala],
      pAnus,
    ], 0.045 * escala, 20, 6);
    A.toro('anus', 0.025 * escala, 0.01 * escala, pAnus, [0.2, 0.7, 1], TAU, 10);

    /* -------- complexo circulatório-excretor e gânglio -------- */

    A.esfera('vesicula-cardiaca', 0.045 * escala,
      [ox, pTuboOral[1] + 0.03 * escala, pTuboOral[2] + 0.05 * escala], 8);
    A.esfera('glomerulo', 0.05 * escala,
      [ox, pTuboOral[1] - 0.02 * escala, pTuboOral[2] + 0.08 * escala], 8, [1.2, 0.8, 1]);
    A.esfera('ganglio-do-colarinho', 0.035 * escala,
      [ox, yColarinho1 - 0.01 * escala, oz - 0.06 * escala], 8);

    /* -------- gônada -------- */

    A.esfera('gonada', 0.055 * escala,
      [ox + 0.11 * escala, (yTronco0 + yTronco1) / 2, oz + 0.05 * escala], 8, [1, 1.3, 1]);

    /* -------- pedúnculo: da base do tubo até o tronco -------- */

    const yBase = oy + yy(0) * escala;
    A.cilindro('pedunculo', 0.05 * escala, 0.09 * escala, yTronco0 - yBase,
      [ox, (yBase + yTronco0) / 2, oz], [0, 1, 0], 12);
  }

  /* -------- zooide principal -------- */

  construirZooide({ escala: 1, pos: [0, 0, 0], nivelDetalhe: 1 });

  /* -------- estolão e broto -------- */

  const p0 = [-0.42, Y0 + 0.02, 0.02];
  const p1 = [-1.3, Y0 - 0.35, 0.05];
  const pontosEstolao = [
    [0, Y0 - 0.02, 0],
    [-0.2, Y0 - 0.06, 0.01],
    p0,
    [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - 0.05, (p0[2] + p1[2]) / 2],
    p1,
  ];
  A.tubo('estolao', pontosEstolao, 0.035, 34, 6);

  construirZooide({ escala: 0.45, pos: [-1.3, Y0 - 0.35 + 0.55 * 0.45, 0.05], nivelDetalhe: 0 });

  return A.grupo();
}
