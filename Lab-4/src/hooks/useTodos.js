import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!res.ok) throw new Error("Failed to update todo");

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete todo");

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      todo: title,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  return {
    todos,
    isLoading,
    error,
    toggleTodo,
    deleteTodo,
    addTodo,
  };
}