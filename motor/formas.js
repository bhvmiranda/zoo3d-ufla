/* ============================================================
   ZOO3D UFLA · motor/formas.js
   Utilitários geométricos compartilhados pelos modelos.

   Não contém anatomia. Só primitivas, posicionamento, superfícies
   paramétricas e a fusão por estrutura que o motor espera receber.

   Convenção de eixos do projeto:
   X = sagital (esquerda/direita) · Y = frontal (ventral/dorsal)
   Z = transversal (posterior/anterior)
   ============================================================ */

import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/* -------- orientação e posição -------- */

export function orientar(THREE, geo, dir) {
  const d = new THREE.Vector3(dir[0], dir[1], dir[2]);
  if (d.lengthSq() < 1e-9) return geo;
  d.normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
  geo.applyQuaternion(q);
  return geo;
}

export function colocar(THREE, geo, pos = [0, 0, 0], dir = null) {
  if (dir) orientar(THREE, geo, dir);
  geo.translate(pos[0], pos[1], pos[2]);
  return geo;
}

/* -------- superfície paramétrica em grade -------- */
/* fn(u, v) devolve [x, y, z]. u percorre u0..u1, v percorre v0..v1.
   fecharU costura a última coluna na primeira (corpos de revolução). */

export function superficie(THREE, opcoes) {
  const {
    nU = 48, nV = 12,
    u0 = 0, u1 = Math.PI * 2,
    v0 = 0, v1 = 1,
    fecharU = false,
    inverter = false,
    fn,
  } = opcoes;

  const colunas = fecharU ? nU : nU + 1;
  const pos = [];
  const uvs = [];
  for (let i = 0; i < colunas; i++) {
    const u = u0 + ((u1 - u0) * i) / nU;
    for (let j = 0; j <= nV; j++) {
      const v = v0 + ((v1 - v0) * j) / nV;
      const p = fn(u, v);
      pos.push(p[0], p[1], p[2]);
      uvs.push(i / nU, j / nV);
    }
  }

  const idx = [];
  const linhas = nV + 1;
  const limite = fecharU ? colunas : colunas - 1;
  for (let i = 0; i < limite; i++) {
    const ii = (i + 1) % colunas;
    for (let j = 0; j < nV; j++) {
      const a = i * linhas + j;
      const b = ii * linhas + j;
      const c = ii * linhas + j + 1;
      const d = i * linhas + j + 1;
      if (inverter) idx.push(a, c, b, a, d, c);
      else idx.push(a, b, c, a, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

/* -------- acervo: acumula geometrias por estrutura -------- */

export class Acervo {
  constructor(THREE) {
    this.THREE = THREE;
    this.mapa = new Map();
  }

  por(id, geo) {
    if (!geo) return this;
    if (!this.mapa.has(id)) this.mapa.set(id, []);
    this.mapa.get(id).push(geo);
    return this;
  }

  esfera(id, r, pos, seg = 18, escala = null) {
    const g = new this.THREE.SphereGeometry(r, seg, Math.max(6, seg >> 1));
    if (escala) g.scale(escala[0], escala[1], escala[2]);
    return this.por(id, colocar(this.THREE, g, pos));
  }

  caixa(id, dims, pos, rotY = 0, rotX = 0, rotZ = 0) {
    const g = new this.THREE.BoxGeometry(dims[0], dims[1], dims[2]);
    if (rotX) g.rotateX(rotX);
    if (rotZ) g.rotateZ(rotZ);
    if (rotY) g.rotateY(rotY);
    return this.por(id, colocar(this.THREE, g, pos));
  }

  cilindro(id, rTopo, rBase, alt, pos, dir = [0, 1, 0], seg = 14, aberto = false) {
    const g = new this.THREE.CylinderGeometry(rTopo, rBase, alt, seg, 1, aberto);
    return this.por(id, colocar(this.THREE, g, pos, dir));
  }

  cone(id, r, alt, pos, dir = [0, 1, 0], seg = 12) {
    const g = new this.THREE.ConeGeometry(r, alt, seg);
    return this.por(id, colocar(this.THREE, g, pos, dir));
  }

  // cilindro entre dois pontos, útil para canais e ossículos
  entre(id, a, b, raio, seg = 10) {
    const T = this.THREE;
    const va = new T.Vector3(...a);
    const vb = new T.Vector3(...b);
    const dir = vb.clone().sub(va);
    const comp = dir.length();
    if (comp < 1e-6) return this;
    const meio = va.clone().add(vb).multiplyScalar(0.5);
    const g = new T.CylinderGeometry(raio, raio, comp, seg);
    return this.por(id, colocar(T, g, [meio.x, meio.y, meio.z], [dir.x, dir.y, dir.z]));
  }

  tubo(id, pontos, raio, segs = 40, radiais = 8, fechado = false) {
    const T = this.THREE;
    const curva = new T.CatmullRomCurve3(pontos.map((p) => new T.Vector3(...p)), fechado);
    return this.por(id, new T.TubeGeometry(curva, segs, raio, radiais, fechado));
  }

  toro(id, R, r, pos, dir = [0, 1, 0], arco = Math.PI * 2, seg = 40) {
    const g = new this.THREE.TorusGeometry(R, r, 8, seg, arco);
    g.rotateX(Math.PI / 2); // anel no plano XZ, eixo em +Y
    return this.por(id, colocar(this.THREE, g, pos, dir));
  }

  superficie(id, opcoes) {
    return this.por(id, superficie(this.THREE, opcoes));
  }

  // devolve o Group que o motor espera: uma malha por estrutura, sem material
  grupo() {
    const raiz = new this.THREE.Group();
    this.mapa.forEach((lista, id) => {
      let fundida = null;
      try {
        fundida = lista.length > 1 ? mergeGeometries(lista, false) : lista[0];
      } catch (e) {
        fundida = null;
      }
      if (fundida) {
        const m = new this.THREE.Mesh(fundida);
        m.name = id;
        raiz.add(m);
      } else {
        lista.forEach((g) => {
          const m = new this.THREE.Mesh(g);
          m.name = id;
          raiz.add(m);
        });
      }
    });
    return raiz;
  }
}

/* -------- auxiliares numéricos -------- */

export const TAU = Math.PI * 2;

// distância angular até o raio (braço) mais próximo, em um corpo de n raios
export function distanciaAoRaio(u, n = 5, fase = 0) {
  const passo = TAU / n;
  let d = ((u - fase) % passo + passo) % passo;
  return Math.min(d, passo - d);
}

// perfil suave 0..1, útil para sulcos e faixas
export function sino(x, largura) {
  const t = x / largura;
  return Math.exp(-t * t);
}

export function limitar(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

export function suavizar(t) {
  const x = limitar(t, 0, 1);
  return x * x * (3 - 2 * x);
}
