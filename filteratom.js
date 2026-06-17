import { atom } from 'recoil'

/**
 * Átomo que guarda qual filtro de visualização está ativo.
 * Mantido separado de "todosState" de propósito: o filtro é um estado
 * de UI independente da lista de tarefas em si, então cada um tem seu
 * próprio átomo — isso evita que mudar o filtro dispare lógica de
 * tarefas e vice-versa.
 */
export const filterState = atom({
  key: 'filterState',
  default: 'all', // valores possíveis: 'all' | 'completed' | 'pending'
})
