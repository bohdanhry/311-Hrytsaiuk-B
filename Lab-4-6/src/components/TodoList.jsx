import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

export default function TodoList() {
  const {
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

    editTodoTitle,
  } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Todo List</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={editTodoTitle}
          />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalTodos={totalTodos}
        limitPerPage={limitPerPage}
        onPrev={goToPrevPage}
        onNext={goToNextPage}
      />
    </>
  );
}