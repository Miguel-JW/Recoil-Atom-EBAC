import TodoForm from './components/TodoForm.jsx'
import TodoFilter from './components/TodoFilter.jsx'
import TodoList from './components/TodoList.jsx'
import TodoStats from './components/TodoStats.jsx'

export default function App() {
  return (
    <div className="app">
      <div className="card">
        <header className="card-header">
          <h1>Lista de Tarefas</h1>
          <TodoStats />
        </header>
        <TodoForm />
        <TodoFilter />
        <TodoList />
      </div>
    </div>
  )
}
