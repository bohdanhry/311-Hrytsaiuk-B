import { useEffect, useState } from "react";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
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

        setTodos(data.todos);
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

  useEffect(() => {
    if (!searchTerm) {
      setTodos(allTodos);
    } else {
      setTodos(
        allTodos.filter((todo) =>
          todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, allTodos]);

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos) {
      setCurrentPage((p) => p + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const setLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  const editTodoTitle = async (id, newTitle) => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });

      if (!res.ok) throw new Error("Edit failed");

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
      setAllTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
  };
}