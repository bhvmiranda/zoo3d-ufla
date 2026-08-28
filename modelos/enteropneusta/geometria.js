/* ============================================================
   ZOO3D UFLA · modelos/enteropneusta/geometria.js
   GBI109 · Aula 3 · Hemichordata · classe Enteropneusta

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 26.
            Diagnose de Enteropneusta: corpo vermiforme com três regiões,
            PROBÓSCIDE, COLARINHO e TRONCO; celomas reduzidos pelo
            desenvolvimento muscular; tubo digestivo alongado e reto; BOCA
            VENTRAL na extremidade anterior do colarinho; série dorsolateral
            longa de fendas branquiais; cordão nervoso dorsal OCO no
            colarinho; ÂNUS POSTERIOR E TERMINAL.
            Tronco diferenciado em regiões branquiogenital, hepática e
            posterior. Pedúnculo da probóscide curto e delgado, conectando a
            probóscide dorsalmente ao colarinho. Saliências longitudinais
            mediodorsal e medioventral no tronco. Ptychoderidae desenvolve
            aletas genitais longitudinais externas contendo as gônadas.
            Região hepática com evaginações dorsolaterais do intestino
            anterior, de coloração verde-escura.
            Complexo excretor da probóscide: vesícula cardíaca, seio
            cardíaco, glomérulo e poro da probóscide. Estomocorda como
            divertículo oral dorsal.
          · Minha aula GBI109 Aula 3, blocos de Hemichordata.
            Nomenclatura: prossoma/mesossoma/metassoma; estomocorda análoga
            e não homóloga à notocorda.
   IMAGEM · Esquemas de Balanoglossus e Saccoglossus em vista lateral e em
            corte sagital; detalhe da fenda branquial em U com sinapticulas;
            fotografias de verme-bolota em sedimento e do cordão fecal
            espiralado na superfície.
   VÍDEO  · Escavação com a probóscide e produção do cordão fecal.

   NOMENCLATURA: uso "colarinho" seguindo o Brusca em português, com
   "colar" registrado como sinônimo porque é o termo dos slides da
   disciplina. Divergência declarada, não corrigida em silêncio.

   Eixos: Z = ântero-posterior, anterior em +Z · Y = dorsal/ventral
   ============================================================ */

import { Acervo, TAU } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'enteropneusta',
  titulo: 'Enteropneusta: verme-bolota',
  disciplina: 'GBI109',
  aula: 'Aula 3 · Hemichordata, Cephalochordata e Urochordata',
  grupo: 'Hemichordata · Enteropneusta',
  dimensaoReal: 'de poucos centímetros a mais de 2 metros; o modelo segue um Balanoglossus de cerca de 15 cm',
  escala: { realPorUnidade: 10, unidade: 'mm' },
  simplificacoes: [
    'Corpo encurtado. No animal o tronco é proporcionalmente muito mais longo, e algumas espécies passam de dois metros.',
    'Doze pares de poros branquiais. Uma espécie adulta pode ter mais de cem pares.',
    'Fendas branquiais representadas como aberturas simples. No animal têm forma de U, com uma língua branquial descendo do topo, e são unidas por sinapticulas.',
    'Aletas genitais representadas como duas dobras contínuas; ocorrem em Ptychoderidae e não em todas as famílias.',
    'Musculatura e celomas não representados. Os celomas são muito reduzidos pelo desenvolvimento muscular nesta classe.',
  ],
  caracteres: [
    { nome: 'Fendas faríngeas', estado: 'presente', estrutura: 'fenda-branquial',
      nota: 'Presentes e numerosas, em série dorsolateral. É o caráter que aproxima Hemichordata de Chordata.' },
    { nome: 'Tubo nervoso dorsal', estado: 'parcial', estrutura: 'cordao-nervoso-dorsal',
      nota: 'Existe um cordão nervoso dorsal OCO, mas apenas no colarinho. No resto do corpo o sistema nervoso é uma rede epidérmica difusa.' },
    { nome: 'Notocorda', estado: 'ausente', estrutura: 'estomocorda',
      nota: 'A estomocorda já foi tomada por notocorda, e daí veio o nome do filo. É endodérmica, não mesodérmica: análoga, não homóloga.' },
    { nome: 'Cauda pós-anal', estado: 'ausente',
      nota: 'Ausente no adulto. Juvenis de alguns enteropneustos têm uma cauda pós-anal, mas ela expressa genes diferentes da cauda dos vertebrados.' },
    { nome: 'Endóstilo', estado: 'ausente',
      nota: 'Não há endóstilo. Há discussão sobre um possível homólogo anatômico na região ventral da faringe, sem consenso.' },
  ],
  focos: [
    { nome: 'probóscide', centro: [0, 0, 6.3], raio: 1.5 },
    { nome: 'colarinho', centro: [0, 0, 4.4], raio: 1.5 },
    { nome: 'região branquiogenital', centro: [0, 0, 1.6], raio: 2.2 },
    { nome: 'região hepática', centro: [0, 0, -2.0], raio: 2.0 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'proboscide',
    nome: 'Probóscide',
    sinonimo: 'prossoma, prossomo',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.aboral,
    rugosidade: 0.85,
    descricao:
      'Primeira das três regiões do corpo, curta e de piriforme a cônica. É musculosa e serve para escavar o sedimento e para reter partículas alimentares no muco. É o mesmo prossoma que, em Pterobranchia, virou um escudo cefálico secretor: mesmo plano corporal, dois modos de vida opostos.',
  },
  {
    id: 'pedunculo-da-proboscide',
    nome: 'Pedúnculo da probóscide',
    sistema: 'regiões do corpo',
    nivel: 2,
    cor: CORES.aboral,
    descricao:
      'Haste curta e delgada que conecta a probóscide DORSALMENTE ao colarinho. É o estreitamento que dá ao animal a aparência de bolota encaixada em um copo, de onde vem o nome popular.',
  },
  {
    id: 'colarinho',
    nome: 'Colarinho',
    sinonimo: 'colar, mesossoma',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.oral,
    rugosidade: 0.8,
    descricao:
      'Segunda região, em forma de anel curto e mais largo que o tronco, com a boca na sua extremidade anterior ventral. Aloja o cordão nervoso dorsal oco, a única estrutura verdadeiramente parecida com um tubo neural de cordado em todo o filo.',
  },
  {
    id: 'regiao-branquiogenital',
    nome: 'Região branquiogenital',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.interambulacro,
    descricao:
      'Primeiro trecho do tronco, reconhecível pelas duas séries dorsolaterais de poros branquiais e pelas gônadas alojadas nas laterais. Aqui a função respiratória e a reprodutiva ocupam o mesmo território, e é isso que o nome registra.',
  },
  {
    id: 'regiao-hepatica',
    nome: 'Região hepática',
    sistema: 'regiões do corpo',
    nivel: 1,
    cor: CORES.glandula,
    descricao:
      'Trecho seguinte do tronco, marcado por uma série de evaginações dorsolaterais do intestino que protraem visivelmente para fora, dando ao animal um relevo saculado. A cor verde-escura desses sacos é o que dá o nome à região. O nome é descritivo: não é um fígado.',
  },
  {
    id: 'regiao-posterior',
    nome: 'Região posterior do tronco',
    sistema: 'regiões do corpo',
    nivel: 2,
    cor: CORES.interambulacro,
    descricao:
      'Último trecho do tronco, afilado e sem especializações externas, terminando no ânus. Probóscide, colarinho e tronco somados são o prossoma, o mesossoma e o metassoma: o plano trimérico compartilhado com Pterobranchia e com os equinodermos.',
  },
  {
    id: 'boca',
    nome: 'Boca',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura VENTRAL, situada na extremidade anterior do colarinho, logo atrás do pedúnculo da probóscide. Fica permanentemente aberta enquanto o animal escava, engolindo sedimento junto com o muco carregado de partículas.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Abertura POSTERIOR E TERMINAL, na ponta do tronco. O tubo digestivo é alongado e reto, da boca ao ânus, sem as alças de outros grupos. O cordão fecal espiralado que o animal deposita na superfície do sedimento é a pista mais fácil de encontrar um enteropneusto na praia.',
  },
  {
    id: 'faringe',
    nome: 'Faringe',
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    descricao:
      'Trecho anterior do tubo digestivo, perfurado pelas fendas branquiais. A água engolida com o sedimento sai por elas, e o alimento segue para o intestino: a mesma solução de filtro que os cordados usam, e a razão de o filo ser deuterostômio próximo deles.',
  },
  {
    id: 'fenda-branquial',
    nome: 'Fenda branquial',
    sinonimo: 'fenda faríngea',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Aberturas pareadas que ligam a faringe ao exterior, em série dorsolateral longa. No animal têm forma de U, porque uma língua branquial desce do topo da fenda, e barras vizinhas se unem por sinapticulas. São um dos caracteres compartilhados com Chordata, e o mais forte argumento morfológico do parentesco.',
  },
  {
    id: 'poro-branquial',
    nome: 'Poro branquial',
    sistema: 'respiratório',
    nivel: 1,
    cor: CORES.respiratorio,
    descricao:
      'Abertura externa por onde a água que passou pela fenda branquial deixa o corpo, em duas séries dorsolaterais ao longo da região branquiogenital. Contar os pares de poros é o modo prático de delimitar essa região no espécime.',
  },
  {
    id: 'estomocorda',
    nome: 'Estomocorda',
    sistema: 'esquelético',
    nivel: 1,
    cor: CORES.esqueleto,
    descricao:
      'Divertículo oral DORSAL, gelatinoso, que se projeta para dentro da probóscide e a sustenta junto com o colarinho. É ela que deu nome ao filo: por sustentar e ser alongada, foi tomada por notocorda. Mas se forma por invaginação de tecido ENDODÉRMICO, e a notocorda se diferencia de MESODERME. Mesma função, origens distintas: analogia, não homologia.',
  },
  {
    id: 'glomerulo',
    nome: 'Glomérulo',
    sistema: 'excretor',
    nivel: 2,
    cor: CORES.celoma,
    descricao:
      'Massa de tecido muito vascularizado na base da probóscide, que filtra o fluido circulatório e remove produtos de excreção. Faz o papel de um rim simples. O filtrado sai pelo poro da probóscide.',
  },
  {
    id: 'vesicula-cardiaca',
    nome: 'Vesícula cardíaca',
    sinonimo: 'pericárdio, seio cardíaco',
    sistema: 'circulatório',
    nivel: 2,
    cor: CORES.musculo,
    descricao:
      'Bolsa muscular dorsal na probóscide que bombeia o fluido circulatório para o glomérulo. Junto com o seio cardíaco, o glomérulo e o poro da probóscide, forma o complexo excretor que é caráter diagnóstico do filo. Função de coração, sem ser um coração no sentido dos vertebrados.',
  },
  {
    id: 'poro-da-proboscide',
    nome: 'Poro da probóscide',
    sistema: 'excretor',
    nivel: 2,
    cor: CORES.celoma,
    descricao:
      'Abertura dorsal, junto ao pedúnculo, por onde sai o líquido filtrado pelo glomérulo. Serve também para entrada e saída de água da protocele, ajudando a enrijecer ou amolecer a probóscide durante a escavação.',
  },
  {
    id: 'cordao-nervoso-dorsal',
    nome: 'Cordão nervoso dorsal',
    sinonimo: 'neurocorda',
    sistema: 'nervoso',
    nivel: 1,
    cor: CORES.nervoso,
    descricao:
      'Cordão OCO situado no dorso do colarinho, formado por invaginação da epiderme. É o mais próximo de um tubo nervoso dorsal de cordado que existe no filo, mas está restrito ao colarinho: fora dele, o sistema nervoso volta a ser uma rede difusa na epiderme. Pterobranchia não o tem.',
  },
  {
    id: 'cordao-nervoso-ventral',
    nome: 'Cordão nervoso ventral',
    sistema: 'nervoso',
    nivel: 3,
    cor: CORES.nervoso,
    descricao:
      'Espessamento longitudinal da rede nervosa epidérmica ao longo da linha média ventral do tronco, acompanhado por um espessamento dorsal equivalente. Corresponde às saliências mediodorsal e medioventral visíveis por fora.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    descricao:
      'Segue reto da faringe até o ânus. Na região hepática emite as evaginações dorsolaterais que produzem as saculações externas. É onde a matéria orgânica do sedimento engolido é efetivamente digerida.',
  },
  {
    id: 'aleta-genital',
    nome: 'Aleta genital',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Duas dobras longitudinais externas ao longo da região branquiogenital, que alojam as gônadas. Ocorrem em Ptychoderidae e não em todas as famílias. Os sexos são separados e a fecundação é externa.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    descricao:
      'Séries pareadas de sacos ao longo da região branquiogenital, alojados nas aletas genitais quando elas existem. O desenvolvimento passa por uma larva ciliada nadadora, a tornária, tão parecida com a larva de equinodermo que os dois filos foram reunidos em Ambulacraria também por isso.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  const Z_ANT = 7.0;
  const Z_POST = -7.0;
  const zz = (t) => Z_ANT + t * (Z_POST - Z_ANT);

  // limites das regiões, em t
  const T_PROB = 0.0, T_PED = 0.115, T_COL = 0.155, T_BG = 0.295,
        T_HEP = 0.56, T_POS = 0.78, T_FIM = 1.0;

  const raio = (t) => {
    if (t < T_PED) {
      // probóscide piriforme
      const s = t / T_PED;
      return 0.35 + 0.62 * Math.sin(Math.PI * Math.pow(s, 0.72));
    }
    if (t < T_COL) return 0.34;                       // pedúnculo
    if (t < T_BG) {                                    // colarinho
      const s = (t - T_COL) / (T_BG - T_COL);
      return 0.9 + 0.26 * Math.sin(Math.PI * s);
    }
    // tronco, afinando até a ponta
    const s = (t - T_BG) / (T_FIM - T_BG);
    return 0.82 * Math.pow(1 - s, 0.42) + 0.06;
  };

  // achatamento dorsoventral leve no tronco
  const sup = (u, t, folga = 0) => {
    const r = raio(t) + folga;
    const ac = t > T_BG ? 0.86 : 1.0;
    return [r * Math.cos(u), r * Math.sin(u) * ac, zz(t)];
  };

  const faixa = (id, t0, t1, nV, folga = 0, inverter = false) =>
    A.superficie(id, {
      nU: 40, nV, fecharU: true, inverter,
      fn: (u, v) => sup(u, t0 + v * (t1 - t0), folga),
    });

  faixa('proboscide', 0.004, T_PED, 22);
  faixa('pedunculo-da-proboscide', T_PED, T_COL, 4);
  faixa('colarinho', T_COL, T_BG, 14);
  faixa('regiao-branquiogenital', T_BG, T_HEP, 26);
  faixa('regiao-hepatica', T_HEP, T_POS, 22);
  faixa('regiao-posterior', T_POS, 0.996, 18);

  // tampas anterior e posterior
  A.esfera('proboscide', 0.36, [0, 0, zz(0.006)], 16, [1, 1, 0.6]);
  A.cilindro('anus', 0.13, 0.16, 0.2, [0, 0, zz(0.995)], [0, 0, 1], 14);

  /* -------- boca, ventral, na frente do colarinho -------- */

  A.cilindro('boca', 0.3, 0.26, 0.24, [0, -0.72, zz(T_COL + 0.012)], [0, -1, 0.35], 18);

  /* -------- poros e fendas branquiais -------- */

  const N_PARES = 12;
  for (let i = 0; i < N_PARES; i++) {
    const t = T_BG + 0.02 + (i / N_PARES) * (T_HEP - T_BG - 0.05);
    for (const lado of [-1, 1]) {
      const u = lado > 0 ? 0.72 : Math.PI - 0.72; // dorsolateral
      const b = sup(u, t, 0.02);
      const nr = Math.hypot(b[0], b[1]) || 1;
      const dir = [b[0] / nr, b[1] / nr, 0];
      A.cilindro('poro-branquial', 0.1, 0.12, 0.1, b, dir, 10);
      // fenda em U, esquematizada, ligando a faringe ao poro
      const interno = sup(u, t, -0.34);
      A.entre('fenda-branquial', interno, b, 0.07, 8);
      A.toro('fenda-branquial', 0.14, 0.04, interno, [0, 0, 1], Math.PI, 12);
    }
  }

  /* -------- aletas genitais e gônadas -------- */

  for (const lado of [-1, 1]) {
    const pontos = [];
    for (let i = 0; i <= 10; i++) {
      const t = T_BG + (i / 10) * (T_HEP - T_BG);
      const b = sup(lado > 0 ? 0.05 : Math.PI - 0.05, t, 0.16);
      pontos.push([b[0], b[1], b[2]]);
    }
    A.tubo('aleta-genital', pontos, 0.14, 40, 6);
    for (let i = 1; i < 10; i++) {
      const t = T_BG + (i / 10) * (T_HEP - T_BG);
      const b = sup(lado > 0 ? 0.05 : Math.PI - 0.05, t, -0.1);
      A.esfera('gonada', 0.16, b, 10, [1, 1, 1.4]);
    }
  }

  /* -------- saculações da região hepática -------- */

  for (let i = 0; i < 9; i++) {
    const t = T_HEP + 0.012 + (i / 9) * (T_POS - T_HEP - 0.03);
    for (const lado of [-1, 1]) {
      const u = lado > 0 ? 1.05 : Math.PI - 1.05;
      const b = sup(u, t, 0.1);
      A.esfera('regiao-hepatica', 0.24, b, 12, [1, 1, 0.8]);
      A.esfera('intestino', 0.15, sup(u, t, -0.2), 10, [1, 1, 0.8]);
    }
  }

  /* -------- tubo digestivo -------- */

  const faringe = [];
  for (let i = 0; i <= 10; i++) faringe.push([0, 0, zz(T_COL + (i / 10) * (T_HEP - T_COL))]);
  A.tubo('faringe', faringe, 0.42, 40, 12);

  const intest = [];
  for (let i = 0; i <= 12; i++) intest.push([0, 0, zz(T_HEP + (i / 12) * (0.995 - T_HEP))]);
  A.tubo('intestino', intest, 0.26, 40, 10);

  /* -------- complexo da probóscide -------- */

  const estom = [];
  for (let i = 0; i <= 8; i++) {
    const t = 0.045 + (i / 8) * (T_COL - 0.045);
    estom.push([0, 0.16 * (1 - i / 12), zz(t)]);
  }
  A.tubo('estomocorda', estom, 0.16, 30, 10);
  A.esfera('glomerulo', 0.3, [0, 0.2, zz(0.075)], 14, [1.3, 0.9, 1.1]);
  A.esfera('vesicula-cardiaca', 0.2, [0, 0.46, zz(0.062)], 12, [1.2, 0.8, 1.3]);
  A.cilindro('poro-da-proboscide', 0.07, 0.09, 0.12,
    [0, raio(T_PED + 0.005) + 0.02, zz(T_PED + 0.005)], [0, 1, 0], 10);

  /* -------- sistema nervoso -------- */

  const neuro = [];
  for (let i = 0; i <= 8; i++) {
    const t = T_COL + (i / 8) * (T_BG - T_COL);
    neuro.push([0, raio(t) - 0.2, zz(t)]);
  }
  A.tubo('cordao-nervoso-dorsal', neuro, 0.11, 30, 9);

  const ventral = [];
  const dorsal = [];
  for (let i = 0; i <= 14; i++) {
    const t = T_BG + (i / 14) * (0.99 - T_BG);
    ventral.push([0, -(raio(t) * 0.86 - 0.09), zz(t)]);
    dorsal.push([0, raio(t) * 0.86 - 0.09, zz(t)]);
  }
  A.tubo('cordao-nervoso-ventral', ventral, 0.07, 50, 7);
  A.tubo('cordao-nervoso-ventral', dorsal, 0.07, 50, 7);

  return A.grupo();
}
