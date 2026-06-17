import { useRecoilValue } from 'recoil'
import { filteredTodosState } from '../selectors/filteredTodosSelector.js'
import TodoItem from './TodoItem.jsx'

/**
 * Lista de tarefas.
 * Consome o SELETOR (não o átomo diretamente) com useRecoilValue:
 * este componente não precisa saber qual filtro está ativo, apenas
 * exibir o que o seletor já entregou filtrado.
 */
export default function TodoList() {
  const todos = useRecoilValue(filteredTodosState)

  if (todos.length === 0) {
    return <p className="empty-state">Nenhuma tarefa por aqui.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
