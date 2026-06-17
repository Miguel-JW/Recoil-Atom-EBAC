import { selector } from 'recoil'
import { todosState } from '../atoms/todosAtom.js'
import { filterState } from '../atoms/filterAtom.js'

/**
 * Seletor derivado: combina o átomo de tarefas com o átomo de filtro
 * e retorna a lista já filtrada. Componentes que só precisam exibir
 * a lista (ex: TodoList) consomem este seletor com useRecoilValue e
 * nunca precisam saber como o filtro é aplicado — essa lógica fica
 * centralizada em um único lugar.
 *
 * Outra vantagem do Recoil: o seletor é memoizado automaticamente.
 * Ele só recalcula quando "todosState" ou "filterState" realmente
 * mudam (equivalente, em espírito, ao useMemo do React puro).
 */
export const filteredTodosState = selector({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const todos = get(todosState)
    const filter = get(filterState)

    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    if (filter === 'pending') return todos.filter((todo) => !todo.completed)
    return todos
  },
})
