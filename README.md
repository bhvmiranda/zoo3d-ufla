# ZOO3D UFLA

Motor de modelos anatômicos interativos para o ensino de Zoologia.
Setor de Zoologia, Universidade Federal de Lavras.

```
zoo3d-ufla/
├── index.html                  índice navegável
├── motor/
│   ├── visualizador.js         o motor. Não se edita para criar modelo novo.
│   ├── placar.js               classificação: local (padrão) ou remota
│   └── estilo.css              identidade visual
└── modelos/
    └── _verificacao/           template e teste do motor
        ├── index.html
        └── geometria.js        MODELO + ESTRUTURAS + construirGeometria
```

---

## 1. Rodar no seu computador

O projeto usa módulos ES. Abrir o arquivo com duplo clique **não funciona**: o
navegador bloqueia por política de origem. É preciso servir por HTTP local.

Com Python, que já vem instalado no macOS e no Linux:

```bash
cd zoo3d-ufla
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` no navegador.

Com Node instalado, a alternativa é `npx serve`.

O único requisito de rede é o CDN do Three.js e as fontes do Google. Se a sala
de aula não tiver internet confiável, baixe o Three.js para dentro do
repositório e troque o `importmap` do `index.html` de cada modelo por caminhos
locais.

---

## 2. Criar um modelo novo

1. Copie `modelos/_verificacao/` para `modelos/nome-do-modelo/`.
2. Troque o `<title>` do `index.html`.
3. Reescreva `geometria.js`. Só isso.

O arquivo `geometria.js` exporta três coisas:

**`MODELO`** — identificação e escala.

```js
export const MODELO = {
  id: 'porifera-tipos',              // único, usado como chave da classificação
  titulo: 'Porifera: ascon, sicon e leucon',
  disciplina: 'GBI104',
  aula: 'Aula 2',
  grupo: 'Porifera',
  dimensaoReal: 'esponja ascon de 1 a 10 cm',
  escala: { realPorUnidade: 10, unidade: 'mm' },   // 1 unidade de mundo = 10 mm
  simplificacoes: 'texto exibido no rodapé da coluna lateral',
};
```

**`ESTRUTURAS`** — uma entrada por estrutura nomeável.

```js
{ id, nome, sinonimo, sistema, nivel, cor, descricao }
```

- `id` sem acento e sem espaço. É o nome que a malha precisa ter.
- `sistema` agrupa na coluna lateral e vira filtro.
- `nivel` 1, 2 ou 3, escalona a dificuldade do jogo:
  Fácil usa nível 1; Médio usa 1 e 2; Difícil usa tudo.

**`construirGeometria(THREE)`** — devolve um `THREE.Group`.

Regra única e inegociável: **toda malha precisa de `mesh.name = id`**, e o `id`
precisa existir em `ESTRUTURAS`. Estruturas repetidas (um par de apêndices, uma
série de canais radiais) compartilham o mesmo `id`. O motor avisa no console do
navegador quando encontra malha sem estrutura declarada ou estrutura sem malha.

### Convenção de eixos, obrigatória

| Eixo | Sentido | Plano de corte correspondente |
|---|---|---|
| X | esquerda (−) / direita (+) | sagital |
| Y | ventral (−) / dorsal (+) | frontal |
| Z | posterior (−) / anterior (+) | transversal |

Se a geometria não seguir isso, os planos de corte cortam nos lugares errados e
os botões de vista mostram a face errada.

---

## 3. Publicar no GitHub Pages

1. Criar repositório público chamado `zoo3d-ufla`.
2. Enviar o conteúdo desta pasta para a raiz do repositório.
3. Settings → Pages → Source: `Deploy from a branch` → branch `main`, pasta `/`.
4. Em poucos minutos o site fica em
   `https://SEU-USUARIO.github.io/zoo3d-ufla/`.

Cada modelo ganha uma URL estável, do tipo
`https://SEU-USUARIO.github.io/zoo3d-ufla/modelos/porifera-tipos/`.
É essa URL que vira QR code no slide e citação no plano de ensino.

Custo: zero. Limites do plano gratuito, folgados para este uso: repositório até
1 GB, arquivo individual até 100 MB, tráfego de 100 GB por mês.

---

## 4. Classificação compartilhada

Por padrão o placar é **local**: cada aluno vê apenas os próprios resultados,
guardados no navegador dele. Não há servidor, não há custo e não há dado pessoal
trafegando.

Para um ranking compartilhado da turma é preciso um backend. O arquivo
`motor/placar.js` já traz um adaptador pronto para Supabase, cujo plano gratuito
é suficiente. As instruções, o SQL da tabela e as políticas de acesso estão
comentados no topo do próprio arquivo. Depois de configurar, troque uma linha no
`index.html` do modelo:

```js
modoPlacar: 'remoto',
```

Se o servidor estiver fora do ar ou a sala estiver sem rede, o placar cai
sozinho para o modo local e o jogo continua funcionando.

Peça apelidos, não nomes completos. Um ranking nominal público é uma escolha
pedagógica com efeito colateral conhecido: motiva quem está no topo e desmotiva
quem está no fim. Uma alternativa é exibir apenas as cinco melhores marcas e o
"melhor pessoal" de cada aluno.

---

## 5. Limites de desempenho

O modelo é renderizado no aparelho de quem abre a página, não em servidor.
Para que rode bem no celular mais modesto da turma:

- até cerca de 150 mil triângulos por modelo;
- até cerca de 15 MB somando todos os arquivos da página;
- geometria procedural (a que o motor recebe por código) custa quase nada;
- malha baixada de repositório precisa ser decimada antes de entrar aqui. Um
  crânio de MorphoSource chega com milhões de triângulos e trava o navegador.

---

## 6. Checagem antes de levar para a sala

- [ ] Console do navegador sem avisos de integridade.
- [ ] Os três planos de corte revelam o que deveriam revelar.
- [ ] Os seis botões de vista mostram as faces corretas.
- [ ] Rodada completa do modo Difícil, com um erro proposital, para conferir o
      retorno visual e a tela de resultado.
- [ ] Aberto no celular pelo QR code, com a coluna lateral recolhida e expandida.
- [ ] Projetado na sala com a luz acesa, lido a seis metros.

## Modelos disponíveis

| Modelo | Disciplina | Estruturas |
|---|---|---|
| Porifera: asconoide, siconoide, leuconoide | GBI104 Aula 2 | 14 |
| Crinoidea: lírio-do-mar | GBI109 Aula 2 | 20 |
| Asteroidea: estrela-do-mar | GBI109 Aula 2 | 20 |
| Ophiuroidea: serpente-do-mar | GBI109 Aula 2 | 21 |
| Echinoidea: ouriço-do-mar | GBI109 Aula 2 | 25 |
| Holothuroidea: pepino-do-mar | GBI109 Aula 2 | 23 |

Os cinco modelos de Echinodermata usam a mesma paleta por sistema, definida em
`modelos/_comum/paleta.js`: a mesma cor significa o mesmo sistema nas cinco
classes, o que torna a comparação entre elas possível de fazer de olho.

## Licença

Todos os direitos reservados, provisoriamente — projeto individual, ainda sem
conversa com o NIT da UFLA nem colaboradores. Ver `LICENSE.md`.

## Antes de criar um modelo novo

Ler `PROTOCOLO_DE_MODELOS.md`. Os dez passos são obrigatórios, e o primeiro
deles é não escrever geometria nenhuma antes de reunir as fontes.
