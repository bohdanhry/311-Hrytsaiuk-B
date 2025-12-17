import { memo, useState } from "react";

function TodoItem({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.todo);

  const save = () => {
    onEdit(todo.id, title);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
      ) : (
        <span>{todo.todo}</span>
      )}
      {isEditing ? (
        <button onClick={save}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

export default memo(TodoItem);