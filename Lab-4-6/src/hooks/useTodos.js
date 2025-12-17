import { useEffect, useMemo, useState, useCallback } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const skip = (currentPage - 1) * limitPerPage;

    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${API_URL}?limit=${limitPerPage}&skip=${skip}`
        );
        const data = await res.json();
        setAllTodos(data.todos);
        setTotalTodos(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [currentPage, limitPerPage]);

  const todos = useMemo(() => {
    if (!searchTerm) return allTodos;
    return allTodos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTodos, searchTerm]);

  const goToNextPage = useCallback(() => {
    if (currentPage * limitPerPage < totalTodos) {
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage, limitPerPage, totalTodos]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  const setLimit = useCallback((limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  }, []);

  const editTodoTitle = useCallback(async (id, newTitle) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });
      if (!res.ok) throw new Error("Edit failed");

      setAllTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      setAllTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    todos,
    isLoading,
    error,

    searchTerm,
    setSearchTerm,

    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
   
    editTodoTitle,
    deleteTodo,
  };
}