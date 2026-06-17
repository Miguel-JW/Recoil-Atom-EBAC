import React, { useState, useMemo } from "react";

/*
 * IMPORTANTE: o pacote "recoil" não pode ser importado neste ambiente de
 * preview (apenas algumas bibliotecas específicas estão disponíveis aqui).
 * Este componente reproduz o MESMO comportamento visual usando useState +
 * useMemo só para você testar a interação agora. A implementação REAL com
 * RecoilRoot, atoms e selectors está no projeto "recoil-todo-app.zip".
 */

const FILTERS = [
  { key: "all", label: "Todas" },
  { key: "pending", label: "Pendentes" },
  { key: "completed", label: "Concluídas" },
];

let nextId = 100;

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Estudar átomos do Recoil", completed: true },
    { id: 2, text: "Criar um seletor de filtro", completed: false },
    { id: 3, text: "Conectar os componentes ao estado global", completed: false },
  ]);
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");

  const filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "pending") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    return { total, completed };
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, { id: nextId++, text: trimmed, completed: false }]);
    setText("");
  };

  const toggleTodo = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const removeTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 16px", fontFamily: "Inter, sans-serif", minHeight: 480, background: "#eef1f6" }}>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, boxShadow: "0 20px 45px -25px rgba(30,42,56,0.35)", padding: 24 }}>
        <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: 0, color: "#1e2a38" }}>Tarefas</h1>
          <div style={{ fontSize: 13, color: "#8893a1" }}>
            <span style={{ fontFamily: "monospace", color: "#3454d1", fontWeight: 700 }}>{stats.completed}/{stats.total}</span> concluídas
          </div>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="O que você precisa fazer?"
            style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e6ee", fontSize: 14, outline: "none" }}
          />
          <button type="submit" style={{ padding: "10px 16px", borderRadius: 10, border: "none", background: "#3454d1", color: "#fff", fontWeight: 600, cursor: "pointer" }}>
            Adicionar
          </button>
        </form>

        <div style={{ display: "flex", gap: 4, background: "#eef1f6", padding: 4, borderRadius: 12, marginBottom: 16 }}>
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  flex: 1,
                  border: "none",
                  background: active ? "#fff" : "transparent",
                  color: active ? "#3454d1" : "#8893a1",
                  fontWeight: 600,
                  fontSize: 12.5,
                  padding: "8px 4px",
                  borderRadius: 9,
                  cursor: "pointer",
                  boxShadow: active ? "0 4px 10px -6px rgba(30,42,56,0.4)" : "none",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: "center", color: "#8893a1", fontSize: 14, padding: "24px 0" }}>Nenhuma tarefa por aqui.</p>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {filteredTodos.map((todo) => (
              <li key={todo.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid #e2e6ee" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: 1 }}>
                  <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} style={{ width: 17, height: 17, accentColor: "#2f9e64", cursor: "pointer" }} />
                  <span style={{ fontSize: 14.5, color: todo.completed ? "#8893a1" : "#1e2a38", textDecoration: todo.completed ? "line-through" : "none" }}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => removeTodo(todo.id)}
                  style={{ border: "none", background: "transparent", color: "#8893a1", cursor: "pointer", padding: 6, borderRadius: 6, fontSize: 13 }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
