import { useSetRecoilState } from 'recoil'
import { todosState } from '../atoms/todosAtom.js'

/**
 * Cada tarefa recebe seus dados via prop (vindos do seletor filtrado,
 * lido em TodoList) e usa useSetRecoilState para alterar o átomo
 * original "todosState" — concluir/remover sempre opera sobre a lista
 * completa, independente do filtro ativo no momento.
 */
export default function TodoItem({ todo }) {
  const setTodos = useSetRecoilState(todosState)

  const toggleTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    )
  }

  const removeTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id))
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label>
        <input type="checkbox" checked={todo.completed} onChange={toggleTodo} />
        <span>{todo.text}</span>
      </label>
      <button
        type="button"
        className="remove-btn"
        onClick={removeTodo}
        aria-label={`Remover tarefa "${todo.text}"`}
      >
        ✕
      </button>
    </li>
  )
}
