import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setCompleted((prev) => !prev);
    onToggle(todo.id);
  };

  return (
    <li style={{ display: "flex", gap: "10px" }}>
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      <span style={{ textDecoration: completed ? "line-through" : "none" }}>
        {todo.todo}
      </span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}