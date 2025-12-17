export default function Pagination({
  currentPage,
  totalTodos,
  limitPerPage,
  onPrev,
  onNext,
}) {
  return (
    <div>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>

      <span>
        Page {currentPage} | Total: {totalTodos}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage * limitPerPage >= totalTodos}
      >
        Next
      </button>
    </div>
  );
}