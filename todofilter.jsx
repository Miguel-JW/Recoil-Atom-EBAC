import { useRecoilState } from 'recoil'
import { filterState } from '../atoms/filterAtom.js'

const FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'completed', label: 'Concluídas' },
]

/**
 * Filtro de visualização.
 * Usa useRecoilState porque este componente precisa LER o filtro atual
 * (para destacar o botão ativo) e também ESCREVER nele (ao clicar em
 * outro filtro) — é o caso de uso clássico para esse hook.
 */
export default function TodoFilter() {
  const [filter, setFilter] = useRecoilState(filterState)

  return (
    <div className="todo-filters" role="tablist" aria-label="Filtrar tarefas">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={filter === key}
          className={filter === key ? 'active' : ''}
          onClick={() => setFilter(key)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
