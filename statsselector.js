import { selector } from 'recoil'
import { todosState } from '../atoms/todosAtom.js'

/**
 * Segundo seletor, derivado apenas de "todosState" (não depende do filtro).
 * Mostra que é possível ter vários seletores derivando o mesmo átomo,
 * cada um com uma responsabilidade própria — aqui, calcular contagens
 * para exibir no cabeçalho da aplicação.
 */
export const todosStatsState = selector({
  key: 'todosStatsState',
  get: ({ get }) => {
    const todos = get(todosState)
    const total = todos.length
    const completed = todos.filter((todo) => todo.completed).length
    return { total, completed, pending: total - completed }
  },
})
