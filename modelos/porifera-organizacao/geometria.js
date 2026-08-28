/* ============================================================
   ZOO3D UFLA · modelos/porifera-organizacao/geometria.js  · v3
   GBI104 · Aula 2 · Porifera

   Condições asconoide, siconoide e leuconoide, da esquerda para a direita.

   FONTES
   · Brusca, Moore & Shuster 2018, capítulo 6, Figuras 6.3 a 6.6 e 6.8
     Trajetos da água, camadas da parede, aberturas nomeadas, restrição de
     asconoide e siconoide à classe Calcarea.
   · Slides de GBI104 de Marcel Gustavo Hermes e Régis Fiorini Souza, 2026
     Nomenclatura adotada na disciplina: condição asconoide, siconoide e
     leuconoide. Tipos celulares e espongina.
   · Forma externa: fotografias de Leucosolenia sp. e de Sycon ciliatum,
     de onde vêm a coroa oscular e a superfície eriçada do siconoide.
   · Nomenclatura segue a da disciplina, não a preferência de quem constrói.

   TRAJETOS DA ÁGUA, conforme Brusca
   · asconoide  óstio → espongiocele → ósculo
   · siconoide  poro dérmico → canal incurrente → prosópila →
                câmara dos coanócitos → apópila → átrio → ósculo
   · leuconoide poro dérmico → canal incurrente → prosópila →
                câmara dos coanócitos → apópila → canal excurrente →
                átrio reduzido → ósculo

   Eixos: X esquerda/direita · Y base/ápice · Z posterior/anterior
   ============================================================ */

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const MODELO = {
  id: 'porifera-organizacao',
  titulo: 'Porifera: condições asconoide, siconoide e leuconoide',
  disciplina: 'GBI104',
  aula: 'Aula 2',
  grupo: 'asconoide · siconoide · leuconoide, da esquerda para a direita',
  dimensaoReal: 'esponjas de 3 a 5 cm de altura',
  escala: { realPorUnidade: 10, unidade: 'mm' },
  focos: [
    { nome: 'asconoide', centro: [-3.4, 2.0, 0], raio: 2.3 },
    { nome: 'siconoide', centro: [0, 1.9, 0], raio: 2.3 },
    { nome: 'leuconoide', centro: [3.8, 1.75, 0], raio: 2.2 },
  ],
  simplificacoes:
    'Asconoide, siconoide e leuconoide são graus de complexidade do sistema ' +
    'aquífero, não categorias taxonômicas. As condições asconoide e siconoide ' +
    'ocorrem apenas na classe Calcarea; a leuconoide ocorre nas quatro classes. ' +
    'Os três corpos têm forma externa semelhante de propósito, para isolar a ' +
    'comparação no interior: o organismo real é bem diferente disso, e ' +
    'Leucosolenia, por exemplo, forma colônias de tubos finos ramificados, não ' +
    'um vaso solitário. O corpo aqui corresponde ao olinto idealizado das ' +
    'figuras de livro-texto. As células individuais não são representadas nesta ' +
    'escala: pinacócitos, porócitos, coanócitos e arqueócitos aparecem no modelo ' +
    'companheiro de parede corporal. O número de óstios, canais, câmaras e ' +
    'espículas é muito menor que o real. As câmaras aparecem abertas, como em ' +
    'uma preparação, para expor o revestimento interno.',
};

export const ESTRUTURAS = [
  {
    id: 'pinacoderme',
    nome: 'Pinacoderme',
    sinonimo: 'epiderme',
    sistema: 'revestimento',
    nivel: 1,
    cor: '#8AA6AC',
    rugosidade: 0.85,
    brilho: 0.35,
    descricao:
      'Camada externa formada por pinacócitos achatados. É a maior aproximação ' +
      'de um tecido verdadeiro em esponjas, mas não repousa sobre lâmina basal ' +
      'contínua, exceto em Homoscleromorpha. Reveste também o átrio nas ' +
      'condições siconoide e leuconoide, onde os coanócitos já não chegam.',
  },
  {
    id: 'ostios',
    nome: 'Óstios',
    sinonimo: 'poros dérmicos',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: '#2E4046',
    rugosidade: 0.95,
    brilho: 0.15,
    descricao:
      'Aberturas de entrada da água. Na condição asconoide cada óstio é a luz ' +
      'de uma única célula alongada e enrolada em tubo, o porócito. Nas ' +
      'condições com ectossomo o orifício é revestido por várias células e ' +
      'recebe o nome de poro dérmico. O diâmetro fica entre 5 e 50 µm na maioria ' +
      'das espécies, o que já funciona como primeira peneira do sistema.',
  },
  {
    id: 'osculo',
    nome: 'Ósculo',
    sinonimo: 'óculo',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: '#D08442',
    rugosidade: 0.72,
    brilho: 0.5,
    descricao:
      'Abertura única e apical de saída da água. Seu diâmetro maior acelera a ' +
      'saída e afasta a água já filtrada, evitando a reingestão. Miócitos ' +
      'dispostos concentricamente ao seu redor permitem contraí-lo. Não é boca: ' +
      'a água sai por ele, nunca entra.',
  },
  {
    id: 'espongiocele',
    nome: 'Espongiocele',
    sinonimo: 'átrio',
    sistema: 'sistema aquífero',
    nivel: 1,
    cor: '#2C4650',
    rugosidade: 0.5,
    brilho: 0.9,
    descricao:
      'Cavidade central que conduz a água até o ósculo. Amplo e revestido por ' +
      'coanoderme na condição asconoide. Ainda amplo na siconoide, mas já ' +
      'revestido por pinacoderme. Reduzido a uma série de canais excurrentes na ' +
      'leuconoide. Não é cavidade digestória: a digestão em Porifera é ' +
      'intracelular.',
  },
  {
    id: 'mesohilo',
    nome: 'Mesohilo',
    sinonimo: 'mesênquima',
    sistema: 'sustentação',
    nivel: 1,
    cor: '#C0AE90',
    rugosidade: 0.9,
    brilho: 0.25,
    descricao:
      'Matriz gelatinosa entre a pinacoderme e a coanoderme, com células ' +
      'ameboides móveis, esclerócitos, espongócitos e elementos esqueléticos. ' +
      'É onde ocorrem a digestão intracelular, o armazenamento e a ' +
      'gametogênese. Sua espessura aumenta da condição asconoide para a ' +
      'leuconoide.',
  },
  {
    id: 'ectossomo',
    nome: 'Ectossomo',
    sinonimo: 'região cortical',
    sistema: 'sustentação',
    nivel: 2,
    cor: '#A99276',
    rugosidade: 0.92,
    brilho: 0.2,
    descricao:
      'Camada externa do mesohilo espessado, presente na condição siconoide ' +
      'complexa e na leuconoide. Contém um acúmulo de espículas distintas das ' +
      'do mesohilo interno. É atravessado pelos canais incurrentes, que ligam ' +
      'os poros dérmicos às câmaras dos coanócitos. Ausente na condição ' +
      'asconoide.',
  },
  {
    id: 'coanoderme',
    nome: 'Coanoderme',
    sinonimo: 'camada de coanócitos',
    sistema: 'alimentação',
    nivel: 1,
    cor: '#E3B845',
    rugosidade: 0.55,
    brilho: 0.7,
    descricao:
      'Camada de coanócitos, que gera o fluxo de água e captura as partículas ' +
      'alimentares. Sua posição é o critério que distingue os três graus: ' +
      'reveste todo o átrio na condição asconoide, restringe-se às câmaras ' +
      'alongadas na siconoide e às câmaras esféricas na leuconoide. Destaque ' +
      'esta estrutura e compare os três corpos.',
  },
  {
    id: 'camara_coanocitaria',
    nome: 'Câmara dos coanócitos',
    sinonimo: 'canal radial',
    sistema: 'alimentação',
    nivel: 2,
    cor: '#B9862B',
    rugosidade: 0.6,
    brilho: 0.6,
    descricao:
      'Divertículo revestido por coanoderme. Na condição siconoide é alongada e ' +
      'radial, e por isso também é chamada de canal radial ou câmara flagelada. ' +
      'Na leuconoide torna-se esférica, pequena e numerosa, dispersa no ' +
      'mesohilo. Multiplicar câmaras pequenas em vez de ampliar uma cavidade ' +
      'única mantém a velocidade da água baixa sobre a coanoderme, que é a ' +
      'condição para a captura eficiente.',
  },
  {
    id: 'canal_inalante',
    nome: 'Canal incurrente',
    sinonimo: 'canal inalante',
    sistema: 'sistema aquífero',
    nivel: 2,
    cor: '#6FA9C4',
    rugosidade: 0.55,
    brilho: 0.8,
    descricao:
      'Canal revestido por pinacoderme que conduz a água dos poros dérmicos, ' +
      'através do ectossomo, até as câmaras dos coanócitos. Ausente na condição ' +
      'asconoide, onde a água passa diretamente do porócito ao espongiocele. ' +
      'Nunca se comunica diretamente com o ósculo.',
  },
  {
    id: 'prosopila',
    nome: 'Prosópila',
    sinonimo: 'prosópilo',
    sistema: 'sistema aquífero',
    nivel: 3,
    cor: '#4FC1D8',
    rugosidade: 0.4,
    brilho: 1.0,
    descricao:
      'Abertura pela qual o canal incurrente desemboca na câmara dos ' +
      'coanócitos. É uma das peneiras sucessivas do sistema aquífero, de malha ' +
      'menor que a dos poros dérmicos. Pode ser circundada por miócitos, o que ' +
      'permite regular a entrada.',
  },
  {
    id: 'apopila',
    nome: 'Apópila',
    sinonimo: 'apópilo',
    sistema: 'sistema aquífero',
    nivel: 3,
    cor: '#7FD4A0',
    rugosidade: 0.4,
    brilho: 1.0,
    descricao:
      'Abertura larga pela qual a câmara dos coanócitos se abre no átrio, na ' +
      'condição siconoide, ou no canal excurrente, na leuconoide. É maior que a ' +
      'prosópila: o alargamento na saída faz a água acelerar ao deixar a ' +
      'coanoderme.',
  },
  {
    id: 'canal_excorrente',
    nome: 'Canal excurrente',
    sinonimo: 'canal exalante',
    sistema: 'sistema aquífero',
    nivel: 2,
    cor: '#49768C',
    rugosidade: 0.55,
    brilho: 0.8,
    descricao:
      'Canal revestido por pinacoderme que recolhe a água das câmaras dos ' +
      'coanócitos e a conduz ao átrio reduzido e ao ósculo. Exclusivo da ' +
      'condição leuconoide, onde substitui funcionalmente o espongiocele amplo ' +
      'das demais condições.',
  },
  {
    id: 'espicula',
    nome: 'Espícula',
    sinonimo: 'elemento esquelético',
    sistema: 'sustentação',
    nivel: 2,
    cor: '#EDE8DA',
    rugosidade: 0.28,
    brilho: 1.0,
    facetado: true,
    descricao:
      'Elemento esquelético de carbonato de cálcio ou de sílica, secretado por ' +
      'esclerócitos e alojado no mesohilo. Nunca fica livre na superfície. ' +
      'Aparece triradiada nas duas condições calcárias e monaxônica na ' +
      'leuconoide, e forma a coroa oscular e a superfície eriçada do siconoide, ' +
      'como em Sycon. Forma e composição são os principais caracteres da ' +
      'taxonomia do grupo.',
  },
  {
    id: 'espongina',
    nome: 'Espongina',
    sinonimo: 'fibra de colágeno',
    sistema: 'sustentação',
    nivel: 3,
    cor: '#9C6B3E',
    rugosidade: 0.8,
    brilho: 0.3,
    descricao:
      'Colágeno fibroso de sustentação produzido por espongócitos, que sempre ' +
      'trabalham em grupo enrolando-se em torno de uma espícula ou de outra ' +
      'fibra. Ocorre em Demospongiae e é o material das esponjas de banho. ' +
      'Representada aqui apenas no corpo leuconoide.',
  },
];

/* ============================================================ */

export function construirGeometria(THREE) {
  const acervo = new Map();
  const guardar = (id, geo) => {
    if (!geo) return;
    if (!acervo.has(id)) acervo.set(id, []);
    acervo.get(id).push(geo);
  };

  /* -------- utilitários -------- */

  let semente = 20260815;
  const sorteio = () => {
    semente = (semente * 1664525 + 1013904223) % 4294967296;
    return semente / 4294967296;
  };

  const amostrar = (arr, t) => {
    const x = Math.max(0, Math.min(0.9999, t)) * (arr.length - 1);
    const i = Math.floor(x);
    const f = x - i;
    return arr[i] * (1 - f) + arr[Math.min(arr.length - 1, i + 1)] * f;
  };

  function criarCampo({ fase, amplo, fino, inclinacao }) {
    const radial = (ang, y, comFino) => {
      let d =
        amplo * Math.sin(ang * 3 + y * 1.5 + fase) +
        amplo * 0.55 * Math.sin(ang * 5 - y * 2.3 + fase * 1.7) +
        amplo * 0.4 * Math.sin(y * 3.1 + fase * 0.6);
      if (comFino) {
        d +=
          fino * Math.sin(ang * 19 + y * 11 + fase) +
          fino * 0.7 * Math.sin(ang * 31 - y * 17 + fase * 2.1);
      }
      return d;
    };
    return (x, y, z, comFino = false) => {
      const r = Math.hypot(x, z);
      const ang = Math.atan2(z, x);
      const atenua = Math.min(1, r / 0.3);
      const r2 = r + radial(ang, y, comFino) * atenua;
      const k = r < 1e-6 ? 0 : r2 / r;
      const desvio = inclinacao * y * y;
      return { x: x * k + desvio, y, z: z * k + desvio * 0.45 };
    };
  }

  function deformar(geo, campo, comFino = false) {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const v = campo(p.getX(i), p.getY(i), p.getZ(i), comFino);
      p.setXYZ(i, v.x, v.y, v.z);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }

  function anelSolido(rExt, rInt, altura, n, segmentos, yBase = 0) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push(new THREE.Vector2(Math.max(0.012, rExt(t)), yBase + t * altura));
    }
    for (let i = n; i >= 0; i--) {
      const t = i / n;
      pts.push(new THREE.Vector2(Math.max(0.008, rInt(t)), yBase + t * altura));
    }
    pts.push(pts[0].clone());
    return new THREE.LatheGeometry(pts, segmentos);
  }

  function volumeSolido(r, altura, n, segmentos, yBase = 0) {
    const pts = [new THREE.Vector2(0.005, yBase)];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      pts.push(new THREE.Vector2(Math.max(0.008, r(t)), yBase + t * altura));
    }
    pts.push(new THREE.Vector2(0.005, yBase + altura));
    return new THREE.LatheGeometry(pts, segmentos);
  }

  const EIXO_Y = new THREE.Vector3(0, 1, 0);
  function posicionar(geo, posicao, direcao) {
    if (direcao) {
      geo.applyQuaternion(
        new THREE.Quaternion().setFromUnitVectors(EIXO_Y, direcao.clone().normalize())
      );
    }
    geo.translate(posicao.x, posicao.y, posicao.z);
    return geo;
  }

  function espiculaTriradiada(comprimento, raio) {
    const partes = [];
    for (let k = 0; k < 3; k++) {
      const g = new THREE.CylinderGeometry(raio * 0.35, raio, comprimento, 5);
      g.translate(0, comprimento / 2, 0);
      g.applyQuaternion(
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 0, 1), (k * 2 * Math.PI) / 3
        )
      );
      partes.push(g);
    }
    let j = null;
    try { j = mergeGeometries(partes, false); } catch (e) { j = null; }
    return j || partes[0];
  }

  function espiculaMonaxonica(comprimento, raio, segmentos = 6) {
    const g = new THREE.CylinderGeometry(raio, raio, comprimento, segmentos);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const k = 1 - Math.pow(Math.abs(y) / (comprimento / 2), 3) * 0.94;
      p.setX(i, p.getX(i) * k);
      p.setZ(i, p.getZ(i) * k);
    }
    p.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }

  const anelAbertura = (raio, tubo) =>
    new THREE.TorusGeometry(raio, tubo, 6, 12);

  /* -------- construtor de corpo -------- */

  function construirCorpo({ tipo, controles, altura, espessura, x, campo }) {
    const rExt = (t) => amostrar(controles, t);
    const rInt = (t) => Math.max(0.06, rExt(t) - espessura);

    const pele = 0.04;
    const espEcto = tipo === 'asconoide' ? 0 : tipo === 'siconoide' ? 0.10 : 0.19;

    const rPinacoInt = (t) => rExt(t) - pele;              // limite interno da pinacoderme
    const rEctoInt = (t) => rPinacoInt(t) - espEcto;       // limite interno do ectossomo
    const rMesoInt = (t) => rInt(t) + pele;                // limite interno do mesohilo

    const nPerfil = 26;
    const segAnel = 56;

    const deslocar = (geo) => { geo.translate(x, 0, 0); return geo; };
    const noCorpo = (px, py, pz) => {
      const v = campo(px, py, pz, false);
      return new THREE.Vector3(v.x + x, v.y, v.z);
    };

    /* --- camadas da parede --- */

    guardar('pinacoderme', deslocar(deformar(
      anelSolido(rExt, rPinacoInt, altura, nPerfil, segAnel), campo, true
    )));

    if (espEcto > 0) {
      guardar('ectossomo', deslocar(deformar(
        anelSolido(rPinacoInt, rEctoInt, altura, nPerfil, segAnel), campo
      )));
    }

    guardar('mesohilo', deslocar(deformar(
      anelSolido(espEcto > 0 ? rEctoInt : rPinacoInt, rMesoInt, altura, nPerfil, segAnel),
      campo
    )));

    /* --- pé de fixação --- */
    guardar('pinacoderme', deslocar(deformar(
      volumeSolido((t) => rExt(0) * (1.35 - 0.35 * t), altura * 0.06, 8, 40, -altura * 0.05),
      campo
    )));

    /* --- ósculo --- */
    const rTopo = rInt(1);
    guardar('osculo', deslocar(deformar(
      posicionar(
        new THREE.TorusGeometry(rTopo + espessura * 0.5, espessura * 0.38, 12, 44),
        new THREE.Vector3(0, altura, 0),
        new THREE.Vector3(0, 0, 1)
      ),
      campo
    )));

    /* --- óstios --- */
    const niveis = tipo === 'leuconoide' ? 8 : 7;
    for (let i = 0; i < niveis; i++) {
      const t = 0.1 + (i / (niveis - 1)) * 0.76;
      for (let j = 0; j < 13; j++) {
        if (sorteio() < 0.2) continue;
        const ang = (j / 13) * Math.PI * 2 + (i % 2) * (Math.PI / 13) + (sorteio() - 0.5) * 0.12;
        const d = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang));
        const escala = 0.75 + sorteio() * 0.5;
        const g = new THREE.CylinderGeometry(0.052 * escala, 0.015, 0.1, 12);
        posicionar(g, new THREE.Vector3(0, 0, 0), d);
        const r = rExt(t) - pele * 0.5;
        const p = noCorpo(d.x * r, t * altura, d.z * r);
        g.translate(p.x, p.y, p.z);
        guardar('ostios', g);
      }
    }

    /* --- espículas do mesohilo --- */
    const calcarea = tipo !== 'leuconoide';
    const quantas = tipo === 'leuconoide' ? 58 : 42;
    for (let i = 0; i < quantas; i++) {
      const t = 0.06 + sorteio() * 0.86;
      const ang = sorteio() * Math.PI * 2;
      const faixa = Math.max(0.02, rEctoInt(t) - rMesoInt(t));
      const r = rMesoInt(t) + faixa * (0.15 + sorteio() * 0.7);
      const tam = calcarea ? 0.1 + sorteio() * 0.05 : 0.2 + sorteio() * 0.12;
      const g = calcarea
        ? espiculaTriradiada(tam, 0.016)
        : espiculaMonaxonica(tam, 0.011);
      const eixo = new THREE.Vector3(
        (sorteio() - 0.5) * 1.1, 1, (sorteio() - 0.5) * 1.1
      ).normalize();
      posicionar(g, new THREE.Vector3(0, 0, 0), eixo);
      g.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(eixo, sorteio() * Math.PI * 2));
      const p = noCorpo(Math.cos(ang) * r, t * altura, Math.sin(ang) * r);
      g.translate(p.x, p.y, p.z);
      guardar('espicula', g);
    }

    /* --- espículas do ectossomo, distintas das internas --- */
    if (espEcto > 0) {
      for (let i = 0; i < 40; i++) {
        const t = 0.1 + sorteio() * 0.8;
        const ang = sorteio() * Math.PI * 2;
        const r = (rPinacoInt(t) + rEctoInt(t)) / 2;
        const g = espiculaMonaxonica(0.09 + sorteio() * 0.05, 0.008, 5);
        const d = new THREE.Vector3(Math.cos(ang), 0.15, Math.sin(ang)).normalize();
        posicionar(g, new THREE.Vector3(0, 0, 0), d);
        const p = noCorpo(Math.cos(ang) * r, t * altura, Math.sin(ang) * r);
        g.translate(p.x, p.y, p.z);
        guardar('espicula', g);
      }
    }

    /* ============ condição asconoide ============ */

    if (tipo === 'asconoide') {
      guardar('coanoderme', deslocar(deformar(
        anelSolido(rMesoInt, rInt, altura, nPerfil, segAnel), campo
      )));
      guardar('espongiocele', deslocar(deformar(
        volumeSolido((t) => rInt(t) - 0.012, altura * 0.99, nPerfil, 48), campo
      )));
    }

    /* ============ condição siconoide ============ */

    if (tipo === 'siconoide') {
      guardar('pinacoderme', deslocar(deformar(
        anelSolido(rMesoInt, rInt, altura, nPerfil, segAnel), campo
      )));
      guardar('espongiocele', deslocar(deformar(
        volumeSolido((t) => rInt(t) - 0.012, altura * 0.99, nPerfil, 48), campo
      )));

      const fileiras = [0.16, 0.31, 0.46, 0.61, 0.76, 0.89];
      const porFileira = 16;
      fileiras.forEach((t, fi) => {
        for (let j = 0; j < porFileira; j++) {
          const ang = (j / porFileira) * Math.PI * 2 + (fi % 2) * (Math.PI / porFileira);
          const d = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang));
          const rA = rEctoInt(t);   // limite interno do ectossomo
          const rB = rInt(t);       // parede do átrio

          if (j % 2 === 0) {
            // câmara dos coanócitos, alongada e radial
            const comp = Math.max(0.06, rA - rB);
            const meio = (rA + rB) / 2;
            const pMeio = noCorpo(d.x * meio, t * altura, d.z * meio);
            guardar('camara_coanocitaria', posicionar(
              new THREE.CylinderGeometry(0.042, 0.042, comp, 12), pMeio.clone(), d
            ));
            guardar('coanoderme', posicionar(
              new THREE.CylinderGeometry(0.062, 0.062, comp * 0.94, 14, 1, true),
              pMeio.clone(), d
            ));
            // prosópila na entrada, apópila na saída para o átrio
            const pPro = noCorpo(d.x * rA, t * altura, d.z * rA);
            guardar('prosopila', posicionar(anelAbertura(0.05, 0.013), pPro, d));
            const pApo = noCorpo(d.x * rB, t * altura, d.z * rB);
            guardar('apopila', posicionar(anelAbertura(0.072, 0.014), pApo, d));
          } else {
            // canal incurrente atravessando o ectossomo
            const comp = Math.max(0.05, rExt(t) - rA);
            const meio = (rExt(t) + rA) / 2;
            const pMeio = noCorpo(d.x * meio, t * altura, d.z * meio);
            guardar('canal_inalante', posicionar(
              new THREE.CylinderGeometry(0.046, 0.046, comp, 12), pMeio, d
            ));
          }
        }
      });

      // coroa oscular de espículas longas, como em Sycon
      for (let i = 0; i < 30; i++) {
        const ang = (i / 30) * Math.PI * 2 + (sorteio() - 0.5) * 0.1;
        const comp = 0.42 + sorteio() * 0.26;
        const g = espiculaMonaxonica(comp, 0.011, 5);
        const d = new THREE.Vector3(
          Math.cos(ang) * 0.32, 1, Math.sin(ang) * 0.32
        ).normalize();
        posicionar(g, new THREE.Vector3(0, 0, 0), d);
        const r = rTopo + espessura * 0.45;
        const p = noCorpo(Math.cos(ang) * r, altura + comp * 0.42, Math.sin(ang) * r);
        g.translate(p.x, p.y, p.z);
        guardar('espicula', g);
      }

      // superfície eriçada por espículas projetadas
      for (let i = 0; i < 70; i++) {
        const t = 0.08 + sorteio() * 0.84;
        const ang = sorteio() * Math.PI * 2;
        const comp = 0.16 + sorteio() * 0.12;
        const g = espiculaMonaxonica(comp, 0.009, 5);
        const d = new THREE.Vector3(
          Math.cos(ang), 0.35 + sorteio() * 0.3, Math.sin(ang)
        ).normalize();
        posicionar(g, new THREE.Vector3(0, 0, 0), d);
        const r = rExt(t) - pele * 0.3;
        const p = noCorpo(Math.cos(ang) * r, t * altura, Math.sin(ang) * r);
        g.translate(p.x, p.y, p.z);
        guardar('espicula', g);
      }
    }

    /* ============ condição leuconoide ============ */

    if (tipo === 'leuconoide') {
      const baseAtrio = 0.6;
      const alturaAtrio = altura * (1 - baseAtrio);

      guardar('espongiocele', deslocar(deformar(
        volumeSolido((t) => 0.1 + 0.05 * t, alturaAtrio, 12, 40, altura * baseAtrio), campo
      )));
      guardar('pinacoderme', deslocar(deformar(
        anelSolido((t) => 0.15 + 0.05 * t, (t) => 0.1 + 0.05 * t,
          alturaAtrio, 12, 40, altura * baseAtrio),
        campo
      )));

      const camaras = [];
      for (let i = 0; i < 52; i++) {
        const t = 0.1 + sorteio() * 0.74;
        const ang = sorteio() * Math.PI * 2;
        const faixa = Math.max(0.06, rEctoInt(t) - rMesoInt(t));
        const r = rMesoInt(t) + faixa * (0.18 + sorteio() * 0.64);
        const p = noCorpo(Math.cos(ang) * r, t * altura, Math.sin(ang) * r);
        camaras.push({ p, ang });

        const dFora = new THREE.Vector3(Math.cos(ang), 0.25, Math.sin(ang)).normalize();
        const q = new THREE.Quaternion().setFromUnitVectors(EIXO_Y, dFora);

        const casca = new THREE.SphereGeometry(0.08, 16, 11, 0.9, Math.PI * 1.45);
        casca.applyQuaternion(q);
        casca.translate(p.x, p.y, p.z);
        guardar('camara_coanocitaria', casca);

        const forro = new THREE.SphereGeometry(0.062, 12, 9);
        forro.translate(p.x, p.y, p.z);
        guardar('coanoderme', forro);

        if (i % 2 === 0) {
          const pro = anelAbertura(0.036, 0.011);
          posicionar(pro, p.clone().add(dFora.clone().multiplyScalar(0.082)), dFora);
          guardar('prosopila', pro);
          const dDentro = dFora.clone().negate();
          const apo = anelAbertura(0.05, 0.012);
          posicionar(apo, p.clone().add(dDentro.clone().multiplyScalar(0.082)), dDentro);
          guardar('apopila', apo);
        }
      }

      // canais incurrentes atravessando o ectossomo
      for (let i = 0; i < 32; i++) {
        const t = 0.14 + sorteio() * 0.66;
        const ang = sorteio() * Math.PI * 2;
        const d = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang));
        const comp = Math.max(0.06, rExt(t) - rEctoInt(t));
        const meio = (rExt(t) + rEctoInt(t)) / 2;
        const p = noCorpo(d.x * meio, t * altura, d.z * meio);
        guardar('canal_inalante', posicionar(
          new THREE.CylinderGeometry(0.04, 0.04, comp, 10), p, d
        ));
      }

      // canais excurrentes convergindo para o átrio reduzido
      camaras.filter((_, i) => i % 4 === 0).slice(0, 13).forEach(({ p }) => {
        const alvoY = Math.max(altura * baseAtrio + 0.1, p.y + 0.3);
        const curva = new THREE.CatmullRomCurve3([
          p.clone(),
          new THREE.Vector3((p.x - x) * 0.6 + x, (p.y + alvoY) / 2, p.z * 0.6),
          new THREE.Vector3((p.x - x) * 0.15 + x, alvoY, p.z * 0.15),
          new THREE.Vector3(x + 0.02, altura * 0.95, 0.02),
        ]);
        guardar('canal_excorrente', new THREE.TubeGeometry(curva, 24, 0.029, 7, false));
      });

      // fibras de espongina no mesohilo
      for (let i = 0; i < 26; i++) {
        const t = 0.12 + sorteio() * 0.7;
        const ang = sorteio() * Math.PI * 2;
        const faixa = Math.max(0.06, rEctoInt(t) - rMesoInt(t));
        const r = rMesoInt(t) + faixa * (0.2 + sorteio() * 0.6);
        const base = noCorpo(Math.cos(ang) * r, t * altura, Math.sin(ang) * r);
        const pontos = [];
        for (let k = 0; k < 4; k++) {
          pontos.push(new THREE.Vector3(
            base.x + (sorteio() - 0.5) * 0.34,
            base.y + k * 0.09 + (sorteio() - 0.5) * 0.05,
            base.z + (sorteio() - 0.5) * 0.34
          ));
        }
        guardar('espongina', new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(pontos), 14, 0.011, 5, false
        ));
      }
    }
  }

  /* -------- os três corpos -------- */

  construirCorpo({
    tipo: 'asconoide',
    controles: [0.24, 0.42, 0.54, 0.59, 0.61, 0.59, 0.56, 0.50],
    altura: 4.0,
    espessura: 0.17,
    x: -3.4,
    campo: criarCampo({ fase: 0.0, amplo: 0.032, fino: 0.008, inclinacao: 0.012 }),
  });

  construirCorpo({
    tipo: 'siconoide',
    controles: [0.28, 0.54, 0.72, 0.81, 0.84, 0.82, 0.76, 0.68],
    altura: 3.8,
    espessura: 0.36,
    x: 0,
    campo: criarCampo({ fase: 2.1, amplo: 0.042, fino: 0.009, inclinacao: -0.010 }),
  });

  construirCorpo({
    tipo: 'leuconoide',
    controles: [0.32, 0.66, 0.90, 1.00, 1.03, 1.00, 0.92, 0.80],
    altura: 3.5,
    espessura: 0.70,
    x: 3.8,
    campo: criarCampo({ fase: 4.4, amplo: 0.055, fino: 0.011, inclinacao: 0.016 }),
  });

  /* -------- fusão por estrutura -------- */

  const raiz = new THREE.Group();
  acervo.forEach((geometrias, id) => {
    let fundida = null;
    try {
      fundida = geometrias.length > 1 ? mergeGeometries(geometrias, false) : geometrias[0];
    } catch (e) {
      fundida = null;
    }
    if (fundida) {
      const m = new THREE.Mesh(fundida);
      m.name = id;
      raiz.add(m);
    } else {
      geometrias.forEach((g) => {
        const m = new THREE.Mesh(g);
        m.name = id;
        raiz.add(m);
      });
    }
  });

  return raiz;
}
