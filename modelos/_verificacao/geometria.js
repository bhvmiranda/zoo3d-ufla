/* ============================================================
   ZOO3D UFLA · modelos/_verificacao/geometria.js
   Modelo mínimo, sem valor anatômico. Existe apenas para
   verificar se o motor está funcionando: realce, corte,
   coluna lateral, jogo e classificação.

   Serve também como referência de formato para os modelos reais.
   Eixos: X esquerda/direita · Y ventral/dorsal · Z posterior/anterior
   ============================================================ */

export const MODELO = {
  id: 'verificacao',
  titulo: 'Modelo de verificação',
  disciplina: 'ZOO3D',
  aula: 'teste do motor',
  grupo: 'sem táxon',
  dimensaoReal: 'organismo hipotético de 20 mm',
  escala: { realPorUnidade: 10, unidade: 'mm' }, // 1 unidade de mundo = 10 mm
  simplificacoes:
    'Este não é um modelo anatômico. É um conjunto de primitivas geométricas ' +
    'usado para conferir se todas as funções da interface respondem.',
};

export const ESTRUTURAS = [
  {
    id: 'parede',
    nome: 'Parede corporal',
    sinonimo: 'parede',
    sistema: 'revestimento',
    nivel: 1,
    cor: '#7FA6AE',
    descricao:
      'Camada externa que delimita o corpo. Ative um plano de corte para ' +
      'verificar se o interior aparece corretamente.',
  },
  {
    id: 'cavidade',
    nome: 'Cavidade interna',
    sinonimo: 'celoma de teste',
    sistema: 'cavidades',
    nivel: 1,
    cor: '#C4736B',
    descricao:
      'Volume interno. Só fica visível quando algum plano de corte está ' +
      'ativo, o que testa o funcionamento do clipping.',
  },
  {
    id: 'eixo',
    nome: 'Eixo axial',
    sinonimo: 'tubo central',
    sistema: 'sustentação',
    nivel: 2,
    cor: '#D9B65A',
    descricao:
      'Estrutura alongada de nível 2, presente nos modos Médio e Difícil ' +
      'do jogo, mas ausente do modo Fácil.',
  },
  {
    id: 'apendice',
    nome: 'Apêndice lateral',
    sinonimo: null,
    sistema: 'sustentação',
    nivel: 3,
    cor: '#8FBF8A',
    descricao:
      'Estrutura de nível 3, exclusiva do modo Difícil. Existe em par, o que ' +
      'testa se estruturas repetidas compartilham o mesmo identificador.',
  },
];

export function construirGeometria(THREE) {
  const g = new THREE.Group();

  const parede = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32));
  parede.name = 'parede';
  g.add(parede);

  const cavidade = new THREE.Mesh(new THREE.SphereGeometry(0.62, 40, 28));
  cavidade.name = 'cavidade';
  g.add(cavidade);

  const eixo = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 2.4, 24));
  eixo.rotation.x = Math.PI / 2;   // ao longo de Z (eixo antero-posterior)
  eixo.name = 'eixo';
  g.add(eixo);

  [-1, 1].forEach((lado) => {
    const ap = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.7, 20));
    ap.position.set(lado * 1.05, 0, 0);
    ap.rotation.z = lado * -Math.PI / 2;
    ap.name = 'apendice';       // mesmo id nas duas cópias
    g.add(ap);
  });

  return g;
}
