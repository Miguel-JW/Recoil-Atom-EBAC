import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { todosState } from '../atoms/todosAtom.js'

let nextId = 100

/**
 * Formulário de nova tarefa.
 * Usa useSetRecoilState porque este componente só precisa ESCREVER
 * no átomo "todosState" — ele nunca lê a lista atual, então não há
 * motivo para se inscrever em atualizações dela com useRecoilState
 * (isso evita re-renders deste componente quando a lista mudar).
 */
export default function TodoForm() {
  const setTodos = useSetRecoilState(todosState)
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: nextId++, text: trimmed, completed: false },
    ])
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="O que você precisa fazer?"
        aria-label="Nova tarefa"
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}
