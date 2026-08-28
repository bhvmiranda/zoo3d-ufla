/* ============================================================
   ZOO3D UFLA · modelos/urochordata-ascidia/geometria.js
   GBI109 · Aula 3 · Urochordata · ascídia social (Clavelina huntsmani)

   FONTES
   TEXTO  · Brusca, Moore & Shuster 2018, capítulo 27, seção "Filo
            Chordata, subfilo Urochordata | Tunicados" (edição
            brasileira, cerca de p. 1217-1234). Plano corpóreo geral,
            sifões oral e atrial, faringe com estigmas, endóstilo,
            lâmina dorsal, tentáculos orais, átrio, coração tubular
            bidirecional, sistema nervoso reduzido a um gânglio e uma
            glândula neural, reprodução assexuada por brotamento a
            partir de estolões em ascídias sociais como Clavelina e
            Perophora.
          · Slides de GBI109 Aula 3 de Marcel Gustavo Hermes: abre o
            bloco de Urochordata com Clavelina como exemplo de ascídia
            social; nomenclatura "sifão inalante/exalante"; destaca o
            coração que inverte periodicamente o sentido do batimento;
            usa a metamorfose da larva "girino" como a evidência de que
            o grupo é cordado, o que motivou o campo `caracteres`
            abaixo.
   IMAGEM · Busca de imagem confirmou a forma real de Clavelina, bem
            mais estreita e alongada do que a primeira versão deste
            arquivo modelava: zooides cilíndricos, 2 a 4 cm de altura
            por 5 a 10 mm de diâmetro em C. huntsmani (proporção de 4:1
            a 8:1), coloniais, ligados por estolões curtos na base.
            Achado notável, não modelado aqui: em C. huntsmani e em C.
            lepadiformis a lâmina dorsal e o endóstilo, vistos por
            transparência através da túnica, aparecem como duas linhas
            longitudinais claras (rosa ou brancas, conforme a espécie)
            que dão o apelido popular "light bulb tunicate" ao gênero —
            o motor ainda não tem suporte a material translúcido por
            estrutura, então esse efeito fica para quando existir.
            Nenhuma malha ou fotografia de terceiros é redistribuída
            aqui.
   VÍDEO  · Sugestão dos slides: Nautilus Live, tunicado de
            profundidade do gênero Culeolus,
            https://www.youtube.com/watch?v=zPNZbOi-3QQ — usado para
            senso de movimento dos sifões, não para a forma do corpo
            (é um táxon de águas profundas, distinto do representado
            aqui).

   Este modelo é o ADULTO SÉSSIL. Notocorda, tubo nervoso dorsal oco e
   cauda pós-anal só existem na larva girinoide e são perdidos na
   metamorfose — por isso não aparecem na geometria. Ver `caracteres`.

   Eixos, FORA do padrão do projeto — declarado por necessidade, mesmo
   caso do modelo de Porifera (organismo séssil fixado pela base):
   Y = eixo de fixação → ápice. Base/estolão em −Y, sifões em +Y.
   Z = eixo dorsoventral funcional, definido pela posição do gânglio
       nervoso (dorsal, +Z) e do endóstilo (ventral, −Z) — a própria
       orientação dorsoventral do corpo só é reconhecível por essas
       duas estruturas internas, não pela forma externa (Brusca,
       capítulo 27).
   X = lateral: separa os dois sifões e aponta a direção do estolão.
   ============================================================ */

import { Acervo, TAU, suavizar } from '../../motor/formas.js';
import { CORES } from '../_comum/paleta.js';

export const MODELO = {
  id: 'urochordata-ascidia',
  titulo: 'Urochordata: ascídia social',
  disciplina: 'GBI109',
  aula: 'Aula 3 · Hemichordata, Cephalochordata e Urochordata',
  grupo: 'Urochordata · Ascidiacea',
  dimensaoReal: 'zooide de 2 a 4 cm de altura por 5 a 10 mm de diâmetro (Clavelina huntsmani, a mesma espécie da foto de abertura do capítulo 27 do Brusca)',
  escala: { realPorUnidade: 5, unidade: 'mm' },
  simplificacoes: [
    'Representa o adulto séssil. A larva girinoide, com notocorda, tubo nervoso dorsal oco e cauda pós-anal, não está modelada — ver o campo de caracteres, abaixo da descrição de cada estrutura.',
    'Número de estigmas (fendas branquiais) muito menor que o real: uma ascídia adulta tem dezenas a centenas por fileira; aqui há poucas dezenas ao todo, para manter a legibilidade.',
    'Sistema vascular reduzido ao coração e aos vasos principais; a rede completa de espaços hemocélicos ao redor dos órgãos não está representada.',
    'A colônia aparece com dois zooides ligados por um estolão, um deles ainda em formação. Uma colônia real de Clavelina costuma ter mais indivíduos, e outras ascídias sociais e compostas formam colônias muito maiores.',
    'A túnica é tratada como semitransparente na ilustração para deixar o interior visível; em muitas espécies reais ela é opaca ou pigmentada.',
  ],
  caracteres: [
    { nome: 'Notocorda', estado: 'ausente', estrutura: null,
      nota: 'Presente só na larva girinoide; perdida na metamorfose. A filiação da ascídia adulta a Chordata não é óbvia sem olhar a larva — o oposto do anfioxo, que mantém o caráter a vida inteira.' },
    { nome: 'Tubo nervoso dorsal', estado: 'ausente', estrutura: null,
      nota: 'Oco e presente na cauda da larva. No adulto resta só o gânglio nervoso, um aglomerado compacto, não um tubo.' },
    { nome: 'Fendas faríngeas', estado: 'presente', estrutura: 'estigma',
      nota: 'Numerosas, dispostas em fileiras na parede da faringe (estigmas). Servem à alimentação por filtração, como no anfioxo — mesma estrutura, uso parecido.' },
    { nome: 'Endóstilo', estado: 'presente', estrutura: 'endostilo',
      nota: 'Sulco ciliado ventral da faringe, secretor de muco carregado de iodo. Homólogo ao do anfioxo e candidato a precursor evolutivo da tireoide dos vertebrados.' },
    { nome: 'Cauda pós-anal', estado: 'ausente', estrutura: null,
      nota: 'Presente na larva girinoide, com notocorda e tubo nervoso dentro dela. Reabsorvida por completo poucas horas depois do assentamento — o adulto não tem cauda nenhuma.' },
  ],
  focos: [
    { nome: 'sifões',               centro: [0.35, 4.9, 0.3],   raio: 0.9 },
    { nome: 'faringe e átrio',      centro: [0, 2.35, 0],       raio: 2.5 },
    { nome: 'digestório e coração', centro: [0.1, 0.85, -0.15], raio: 1.75 },
    { nome: 'estolão e broto',      centro: [-1.15, -0.2, 0.05], raio: 1.3 },
  ],
};

export const ESTRUTURAS = [
  {
    id: 'tunica',
    nome: 'Túnica',
    sinonimo: 'cutícula',
    sistema: 'parede corporal',
    nivel: 1,
    cor: CORES.esqueleto,
    rugosidade: 0.55,
    descricao:
      'Camada externa secretada pela própria epiderme, composta de tunicina — um polímero raro no reino animal, parecido com celulose. Funciona como um exoesqueleto: sustenta e protege, mas contém células vivas (amebócitos), então não é uma cutícula inerte.',
  },
  {
    id: 'manto',
    nome: 'Manto',
    sinonimo: 'mesênquima muscular',
    sistema: 'parede corporal',
    nivel: 2,
    cor: CORES.musculo,
    rugosidade: 0.5,
    descricao:
      'Camada logo abaixo da epiderme, onde ficam as bandas musculares. Os músculos longitudinais puxam os sifões para dentro do corpo; os circulares, ao redor de cada abertura sifonal, fecham o orifício — a mesma lógica de esfíncter usada para reagir rápido a partículas indesejadas ou predadores.',
  },
  {
    id: 'sifao-oral',
    nome: 'Sifão oral',
    sinonimo: 'sifão branquial, sifão inalante',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: CORES.oral,
    rugosidade: 0.4,
    descricao:
      'Abertura por onde a água entra, levada até a faringe. Um anel de tentáculos orais na base impede a entrada de partículas grandes. Nas ascídias, geralmente fica voltado para longe do sifão atrial, o que reduz a chance de reaspirar a própria água já filtrada.',
  },
  {
    id: 'sifao-atrial',
    nome: 'Sifão atrial',
    sinonimo: 'sifão exalante',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: CORES.respiratorio,
    rugosidade: 0.4,
    descricao:
      'Abertura de saída da água, depois de passar pela faringe e pelo átrio. O ânus se abre bem perto dela, para que os dejetos saiam junto com a corrente exalante em vez de se acumularem perto do corpo.',
  },
  {
    id: 'tentaculos-orais',
    nome: 'Tentáculos orais',
    sinonimo: null,
    sistema: 'sistema aquífero',
    nivel: 3,
    cor: CORES.peTubular,
    rugosidade: 0.35,
    descricao:
      'Anel de projeções carnosas na base do sifão oral, ao redor da boca propriamente dita. Funcionam como uma peneira grosseira, retendo partículas grandes demais antes que cheguem à faringe.',
  },
  {
    id: 'faringe',
    nome: 'Faringe',
    sinonimo: 'câmara branquial, cesta branquial, saco branquial',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: CORES.interambulacro,
    rugosidade: 0.45,
    descricao:
      'Câmara grande e perfurada que domina o interior do corpo. A água entra pelo sifão oral, atravessa os estigmas na parede da faringe e sai para o átrio ao redor. É também onde o alimento é capturado, no muco produzido pelo endóstilo.',
  },
  {
    id: 'estigma',
    nome: 'Estigma',
    sinonimo: 'fenda branquial, fenda faríngea',
    sistema: 'sistema aquífero',
    nivel: 2,
    cor: CORES.ambulacro,
    rugosidade: 0.3,
    descricao:
      'Fendas ciliadas dispostas em fileiras na parede da faringe. Os cílios das bordas dirigem a água filtrada para o átrio, carregando junto o cordão de muco com o alimento capturado. Persistem da larva ao adulto — é o caráter de Chordata mais visível nesta ascídia.',
  },
  {
    id: 'endostilo',
    nome: 'Endóstilo',
    sinonimo: null,
    sistema: 'sistema aquífero',
    nivel: 2,
    cor: CORES.glandula,
    rugosidade: 0.3,
    descricao:
      'Sulco longitudinal na face ventral da faringe, revestido por células secretoras de muco e por flagelos que espalham esse muco lateralmente. Homólogo ao endóstilo do anfioxo, e um dos candidatos a precursor evolutivo da glândula tireoide dos vertebrados.',
  },
  {
    id: 'lamina-dorsal',
    nome: 'Lâmina dorsal',
    sinonimo: 'língueta',
    sistema: 'sistema aquífero',
    nivel: 3,
    cor: CORES.canalMenor,
    rugosidade: 0.3,
    descricao:
      'Saliência ciliada na face dorsal da faringe, oposta ao endóstilo. Enrola as lâminas de muco carregadas de alimento em um cordão, que segue para o esôfago — o parceiro dorsal do endóstilo no transporte de comida.',
  },
  {
    id: 'atrio',
    nome: 'Átrio',
    sinonimo: 'cloaca',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: CORES.celoma,
    rugosidade: 0.4,
    descricao:
      'Câmara ampla que envolve a faringe, entre ela e a parede do corpo. Recebe a água que atravessa os estigmas e a conduz ao sifão atrial. O ânus e os gonodutos também se abrem dentro dela — tudo que sai do corpo passa primeiro por aqui.',
  },
  {
    id: 'esofago',
    nome: 'Esôfago',
    sinonimo: null,
    sistema: 'digestório',
    nivel: 2,
    cor: CORES.digestorio,
    rugosidade: 0.35,
    descricao:
      'Tubo curto que liga a base da faringe ao estômago, por onde o cordão de muco e alimento formado pela lâmina dorsal é conduzido para trás.',
  },
  {
    id: 'estomago',
    nome: 'Estômago',
    sinonimo: null,
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    rugosidade: 0.4,
    descricao:
      'Bolsa onde ocorre a digestão extracelular, por enzimas secretadas pela própria parede. Fica na base do corpo, perto do coração, formando com o esôfago e o intestino o tubo digestivo em forma de "U" típico das ascídias.',
  },
  {
    id: 'intestino',
    nome: 'Intestino',
    sinonimo: null,
    sistema: 'digestório',
    nivel: 1,
    cor: CORES.digestorio,
    rugosidade: 0.4,
    descricao:
      'Continuação dobrada do tubo digestivo depois do estômago, subindo de volta em direção ao átrio. O material não digerido percorre esse trajeto até o ânus.',
  },
  {
    id: 'anus',
    nome: 'Ânus',
    sinonimo: null,
    sistema: 'digestório',
    nivel: 3,
    cor: CORES.digestorio,
    rugosidade: 0.3,
    descricao:
      'Abertura final do intestino, dentro do átrio e perto do sifão atrial — não voltada para o ambiente diretamente. Os dejetos saem junto com a água exalante, sem se acumular perto do corpo.',
  },
  {
    id: 'coracao',
    nome: 'Coração',
    sinonimo: null,
    sistema: 'circulatório',
    nivel: 2,
    cor: CORES.musculo,
    rugosidade: 0.35,
    descricao:
      'Tubo curto, sem válvulas, perto do estômago. O batimento é peristáltico, comandado por dois marca-passos, um em cada ponta — e periodicamente inverte de sentido, bombeando o sangue primeiro para um lado do corpo, depois para o outro. É incomum entre os animais.',
  },
  {
    id: 'gonada',
    nome: 'Gônada',
    sinonimo: null,
    sistema: 'reprodutor',
    nivel: 2,
    cor: CORES.gonada,
    rugosidade: 0.35,
    descricao:
      'A maioria das ascídias é hermafrodita, com ovário e testículo próximos, junto à alça do tubo digestivo. Os gametas saem por dutos que se abrem no átrio, perto do ânus.',
  },
  {
    id: 'ganglio-nervoso',
    nome: 'Gânglio nervoso',
    sinonimo: 'gânglio cerebral',
    sistema: 'nervoso',
    nivel: 2,
    cor: CORES.nervoso,
    rugosidade: 0.3,
    descricao:
      'Pequeno aglomerado de neurônios entre os dois sifões, na face dorsal do corpo — é a posição desse gânglio que define, internamente, qual lado do corpo é dorsal. Envia nervos principalmente para os músculos e para a região dos sifões.',
  },
  {
    id: 'glandula-neural',
    nome: 'Glândula neural',
    sinonimo: 'glândula subneural',
    sistema: 'nervoso',
    nivel: 3,
    cor: CORES.glandula,
    rugosidade: 0.3,
    descricao:
      'Estrutura pequena junto ao gânglio nervoso, comunicando-se com a faringe por um ducto fino. Sua função ainda não é bem-entendida; alguns pesquisadores a apontam como possível precursora evolutiva da hipófise dos vertebrados.',
  },
  {
    id: 'estolao',
    nome: 'Estolão',
    sinonimo: null,
    sistema: 'colonial',
    nivel: 3,
    cor: CORES.aboral,
    rugosidade: 0.5,
    descricao:
      'Prolongamento tubular da parede do corpo, na base, por onde novos indivíduos brotam por reprodução assexuada. É o processo mais simples de brotamento entre os tunicados, e é assim que ascídias sociais como Clavelina e Perophora formam suas colônias — o broto ao lado ainda está em formação.',
  },
];

/* ============================================================
   geometria
   ============================================================ */

export function construirGeometria(THREE) {
  const A = new Acervo(THREE);

  /* -------- utilitário: interpolação entre pontos de controle -------- */

  const amostrar = (arr, t) => {
    const x = Math.max(0, Math.min(0.9999, t)) * (arr.length - 1);
    const i = Math.floor(x);
    const f = x - i;
    return arr[i] * (1 - f) + arr[Math.min(arr.length - 1, i + 1)] * f;
  };

  /* -------- corpo do zooide principal -------- */

  const ALT = 6.0;
  const Y0 = -1.0;                      // base, junto ao estolão
  const yy = (t) => Y0 + t * ALT;       // t=0 base · t=1 ombro, antes dos sifões

  // raio radial do corpo em função de t: pé estreito, tubo estreito e comprido
  // (Clavelina é cilíndrica, altura de 4 a 8 vezes o diâmetro — não um barril)
  const CONTROLES = [0.28, 0.50, 0.66, 0.72, 0.70, 0.62, 0.44];
  const perfilCorpo = (t) => amostrar(CONTROLES, suavizar(t));

  const nPerfil = 30, nAnel = 40;

  function construirZooide({ escala = 1, pos = [0, 0, 0], nivelDetalhe = 1 }) {
    const [ox, oy, oz] = pos;
    const rExt = (t) => perfilCorpo(t) * escala;
    const rMan = (t) => rExt(t) * 0.90;
    const rAtr = (t) => rExt(t) * 0.66;
    const rFar = (t) => rExt(t) * 0.48;

    const perfilAnel = (raio, nU, nV, v0, v1, inverter = false) => A.superficie('tunica', {
      nU, nV, fecharU: true, inverter,
      fn: (u, v) => {
        const t = v0 + v * (v1 - v0);
        const r = raio(t);
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    if (nivelDetalhe === 0) {
      // broto: só um esboço da túnica, sem interior
      perfilAnel(rExt, 22, 18, 0, 0.86);
      return;
    }

    /* túnica externa */
    A.superficie('tunica', {
      nU: nAnel, nV: nPerfil, fecharU: true,
      fn: (u, v) => {
        const t = v;
        const r = rExt(t);
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    /* manto, logo abaixo da túnica */
    A.superficie('manto', {
      nU: nAnel, nV: nPerfil, fecharU: true, inverter: true,
      fn: (u, v) => {
        const t = 0.02 + v * 0.94;
        const r = rMan(t);
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    /* átrio: câmara entre o manto e a faringe */
    A.superficie('atrio', {
      nU: nAnel, nV: 24, fecharU: true, inverter: true,
      fn: (u, v) => {
        const t = 0.16 + v * 0.8;
        const r = rAtr(t);
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    /* faringe: câmara interna perfurada */
    A.superficie('faringe', {
      nU: nAnel, nV: 22, fecharU: true,
      fn: (u, v) => {
        const t = 0.2 + v * 0.66;
        const r = rFar(t);
        return [ox + r * Math.cos(u), oy + yy(t) * escala, oz + r * Math.sin(u)];
      },
    });

    /* estigmas: fileiras de fendas na parede da faringe */
    const FILEIRAS = 6, POR_FILEIRA = 14;
    for (let i = 0; i < FILEIRAS; i++) {
      const t = 0.26 + (i / (FILEIRAS - 1)) * 0.54;
      const r = rFar(t) * 1.01;
      for (let j = 0; j < POR_FILEIRA; j++) {
        const ang = (j / POR_FILEIRA) * TAU + (i % 2) * (TAU / POR_FILEIRA / 2);
        const cx = ox + r * Math.cos(ang), cz = oz + r * Math.sin(ang);
        const p0 = [cx, oy + (yy(t) - 0.045) * escala, cz];
        const p1 = [cx, oy + (yy(t) + 0.045) * escala, cz];
        A.entre('estigma', p0, p1, 0.028 * escala, 6);
      }
    }

    /* endóstilo: sulco ventral (−Z) da faringe */
    {
      const pontos = [];
      for (let i = 0; i <= 14; i++) {
        const t = 0.22 + (i / 14) * 0.6;
        const r = rFar(t);
        pontos.push([ox, oy + yy(t) * escala, oz - r * 0.98]);
      }
      A.tubo('endostilo', pontos, 0.055 * escala, 40, 6);
    }

    /* lâmina dorsal: saliência dorsal (+Z), oposta ao endóstilo */
    {
      const pontos = [];
      for (let i = 0; i <= 14; i++) {
        const t = 0.22 + (i / 14) * 0.6;
        const r = rFar(t);
        pontos.push([ox, oy + yy(t) * escala, oz + r * 0.98]);
      }
      A.tubo('lamina-dorsal', pontos, 0.045 * escala, 40, 6);
    }

    /* sifões: oral para +Z, atrial para +X, ambos inclinados para +Y */
    const yTopo = yy(1) * escala;
    const baseOral = [ox, oy + yTopo * 0.94, oz + rExt(0.97) * 0.4];
    const dirOral = [0.12, 0.9, 0.42];
    A.cilindro('sifao-oral', 0.16 * escala, 0.22 * escala, 0.85 * escala, baseOral, dirOral, 20);

    const baseAtrial = [ox + rExt(0.9) * 0.55, oy + yTopo * 0.8, oz + rExt(0.9) * 0.2];
    const dirAtrial = [0.62, 0.72, 0.2];
    A.cilindro('sifao-atrial', 0.14 * escala, 0.19 * escala, 0.7 * escala, baseAtrial, dirAtrial, 18);

    /* tentáculos orais: anel na base do sifão oral */
    for (let i = 0; i < 10; i++) {
      const ang = (i / 10) * TAU;
      const raio = 0.15 * escala;
      const px = baseOral[0] + Math.cos(ang) * raio;
      const pz = baseOral[2] + Math.sin(ang) * raio;
      A.cone('tentaculos-orais', 0.025 * escala, 0.14 * escala,
        [px, baseOral[1] - 0.02 * escala, pz], [Math.cos(ang) * 0.3, 1, Math.sin(ang) * 0.3], 6);
    }

    /* gânglio nervoso e glândula neural: entre os sifões, lado dorsal (+Z) */
    const centroGang = [ox, oy + yTopo * 0.86, oz + rExt(0.95) * 0.15];
    A.esfera('ganglio-nervoso', 0.075 * escala, centroGang, 10, [1, 0.7, 1]);
    A.esfera('glandula-neural', 0.05 * escala,
      [centroGang[0], centroGang[1] - 0.09 * escala, centroGang[2] - 0.03 * escala], 8);

    /* digestório em "U": esôfago → estômago → intestino → ânus, posteroventral */
    const tFar0 = 0.2;
    const pFar = [ox - rFar(tFar0) * 0.3, oy + yy(tFar0) * escala, oz - rFar(tFar0) * 0.85];
    const pEstomago = [ox - rExt(0.06) * 0.2, oy + yy(0.06) * escala, oz - rExt(0.1) * 0.7];
    A.tubo('esofago', [pFar, [
      (pFar[0] + pEstomago[0]) / 2, (pFar[1] + pEstomago[1]) / 2 - 0.05 * escala,
      (pFar[2] + pEstomago[2]) / 2,
    ], pEstomago], 0.05 * escala, 24, 6);
    A.esfera('estomago', 0.18 * escala, pEstomago, 12, [1, 0.85, 1.15]);

    const pAnus = [ox + rAtr(0.55) * 0.5, oy + yy(0.55) * escala, oz - rAtr(0.55) * 0.1];
    A.tubo('intestino', [
      pEstomago,
      [pEstomago[0] + 0.05 * escala, pEstomago[1] + 0.25 * escala, pEstomago[2] + 0.1 * escala],
      [pAnus[0] - 0.05 * escala, pAnus[1] - 0.1 * escala, pAnus[2]],
      pAnus,
    ], 0.045 * escala, 30, 6);
    A.toro('anus', 0.03 * escala, 0.012 * escala, pAnus, [0.3, 1, -0.2], TAU, 12);

    /* coração: tubo curto perto do estômago */
    A.tubo('coracao', [
      [pEstomago[0] - 0.16 * escala, pEstomago[1] - 0.1 * escala, pEstomago[2] - 0.05 * escala],
      [pEstomago[0] - 0.02 * escala, pEstomago[1] - 0.18 * escala, pEstomago[2] + 0.06 * escala],
      [pEstomago[0] + 0.12 * escala, pEstomago[1] - 0.08 * escala, pEstomago[2] + 0.02 * escala],
    ], 0.045 * escala, 20, 8);

    /* gônadas: par junto à alça intestinal */
    A.esfera('gonada', 0.09 * escala,
      [pEstomago[0] + 0.18 * escala, pEstomago[1] + 0.05 * escala, pEstomago[2] + 0.12 * escala], 10, [1, 1.3, 1]);
    A.esfera('gonada', 0.08 * escala,
      [pEstomago[0] + 0.1 * escala, pEstomago[1] + 0.22 * escala, pEstomago[2] + 0.16 * escala], 10, [1, 1.3, 1]);
  }

  /* -------- zooide principal -------- */

  construirZooide({ escala: 1, pos: [0, 0, 0], nivelDetalhe: 1 });

  /* -------- estolão e broto -------- */

  const baseX = perfilCorpo(0) * -0.9;
  const p0 = [baseX, Y0 + 0.05, 0];
  const p1 = [-1.1, Y0 - 0.35, 0.05];
  const pontosEstolao = [
    [0, Y0, 0],
    [baseX * 1.4, Y0 - 0.05, 0.02],
    p0,
    [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - 0.06, (p0[2] + p1[2]) / 2],
    p1,
  ];
  A.tubo('estolao', pontosEstolao, 0.05, 40, 7);

  construirZooide({ escala: 0.42, pos: [-1.15, Y0 - 0.25 + 1.0 * 0.42, 0.05], nivelDetalhe: 0 });

  return A.grupo();
}
