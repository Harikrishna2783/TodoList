import "./styles.css";
import { useState } from "react";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((t) => t.id !== id);
    setTodos(deleteTodo);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((t) => t.id === editId);
      const updatedTodo = todos.map(
        (t) => t.id === editTodo.id && (t = { id: t.id, todo })
        //: { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodo);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo} - ${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="button1" type="submit">
            {editId ? "Edit" : "Go"}
          </button>
        </form>
        <ul className="allTodos">
          {todos.map((t) => (
            <li key={t.id} className="singleTodo">
              <span className="todoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)} className="button">
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} className="button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
