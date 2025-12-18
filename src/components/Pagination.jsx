import React from "react";

export default function Pagination({ page, total, onChange }) {
  const totalPages = Math.ceil(total / 10); // OMDB returns 10 results per page

  if (totalPages <= 1) return null; // no pagination needed

  const prevPage = () => {
    if (page > 1) onChange(page - 1);
  };

  const nextPage = () => {
    if (page < totalPages) onChange(page + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Display max 5 page numbers at a time
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`px-3 py-1 rounded-md border ${
            i === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
      <button
        onClick={prevPage}
        disabled={page === 1}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {renderPageNumbers()}

      <button
        onClick={nextPage}
        disabled={page === totalPages}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
