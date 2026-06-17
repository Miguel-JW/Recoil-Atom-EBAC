# Recoil-Atom-EBAC
# Lista de Tarefas — React + Recoil

To-do list usando **Recoil** para gerenciamento de estado global, aplicando os conceitos de átomos, seletores e o provedor `RecoilRoot`.

## Como rodar

```bash
npm install
npm run dev
```

## Funcionalidades

- Adicionar uma nova tarefa
- Marcar/desmarcar uma tarefa como concluída
- Remover tarefas
- Filtrar por: todas, pendentes ou concluídas
- Contador de tarefas concluídas no cabeçalho

## Estrutura do projeto

```
src/
├── atoms/
│   ├── todosAtom.js          # átomo: lista de tarefas
│   └── filterAtom.js         # átomo: filtro ativo
├── selectors/
│   ├── filteredTodosSelector.js  # seletor: lista derivada conforme o filtro
│   └── statsSelector.js          # seletor: contagem de concluídas/total
├── components/
│   ├── TodoForm.jsx          # formulário de nova tarefa
│   ├── TodoFilter.jsx        # botões de filtro
│   ├── TodoList.jsx          # listagem (lê o seletor filtrado)
│   ├── TodoItem.jsx          # cada tarefa (concluir/remover)
│   └── TodoStats.jsx         # contador no cabeçalho
├── App.jsx
├── main.jsx                  # RecoilRoot envolve a aplicação aqui
└── index.css
```

## Conceitos do Recoil aplicados

### Átomos (`atoms/`)
- `todosState`: guarda a lista de tarefas — é a fonte da verdade do estado global.
- `filterState`: guarda qual filtro está ativo (`'all' | 'pending' | 'completed'`), separado do átomo de tarefas porque representa um estado de UI independente.

### Seletores (`selectors/`)
- `filteredTodosState`: combina os dois átomos (`todosState` + `filterState`) e devolve a lista já filtrada. Sempre que um dos átomos muda, o Recoil recalcula esse seletor automaticamente — e só os componentes que o utilizam são notificados.
- `todosStatsState`: outro seletor, derivado apenas de `todosState`, para calcular contagens (concluídas/total). Mostra como múltiplos seletores podem derivar do mesmo átomo, cada um com uma responsabilidade isolada.

### `RecoilRoot`
- Colocado em `main.jsx`, envolvendo toda a árvore de componentes — é o equivalente, no Recoil, ao `<Provider>` do Redux ou ao `Context.Provider` do React puro. Sem ele, nenhum componente consegue usar átomos ou seletores.

### Hooks usados e onde
| Hook | Componente | Por quê |
|---|---|---|
| `useSetRecoilState` | `TodoForm`, `TodoItem` | só precisam **escrever** no átomo `todosState`, nunca leem a lista diretamente |
| `useRecoilState` | `TodoFilter` | precisa **ler** o filtro atual (para destacar o botão ativo) e **escrever** nele ao clicar |
| `useRecoilValue` | `TodoList`, `TodoStats` | só **leem** seletores (`filteredTodosState`, `todosStatsState`), nunca escrevem |

Essa separação de hooks por responsabilidade é uma boa prática do Recoil: usar o hook mais específico para cada caso evita re-renders desnecessários e deixa explícito, no próprio código, se um componente lê, escreve, ou as duas coisas.
