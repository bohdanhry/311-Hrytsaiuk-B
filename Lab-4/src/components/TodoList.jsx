import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, isLoading, error, toggleTodo, deleteTodo, addTodo } =
    useTodos();

  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Todo List</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </>
  );
}