export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const MAX_VISIBLE = 5;

  let start = Math.max(1, page - 2);
  let end = Math.min(totalPages, page + 2);

  if (page <= 3) {
    start = 1;
    end = Math.min(totalPages, MAX_VISIBLE);
  }

  if (page >= totalPages - 2) {
    end = totalPages;
    start = Math.max(1, totalPages - MAX_VISIBLE + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onChange(1)}
            className="px-3 py-1 border rounded"
          >
            1
          </button>
          <span className="px-2">...</span>
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${
            p === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => onChange(totalPages)}
            className="px-3 py-1 border rounded"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
}
