import { useRecoilValue } from 'recoil'
import { todosStatsState } from '../selectors/statsSelector.js'

/**
 * Mostra a contagem de tarefas concluídas/total.
 * Consome o seletor "todosStatsState" com useRecoilValue — não precisa
 * de useRecoilState porque este componente nunca escreve no estado,
 * apenas exibe um valor derivado.
 */
export default function TodoStats() {
  const stats = useRecoilValue(todosStatsState)
  return (
    <div className="todo-stats">
      <span className="mono">
        {stats.completed}/{stats.total}
      </span>{' '}
      tarefas concluídas
    </div>
  )
}
