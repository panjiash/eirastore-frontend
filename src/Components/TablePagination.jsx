import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TablePagination = ({
  search,
  limit,
  page,
  total,
  totalPages,
  onSearchChange,
  onLimitChange,
  onPageChange,
  isLoading,
  children,
}) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <select
          className="p-2 border border-slate-200 rounded"
          onChange={onLimitChange}
          value={limit}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <input
          className="px-4 py-2 border-2 rounded focus:outline-none"
          placeholder="Search"
          onChange={onSearchChange}
          value={search}
        />
      </div>

      {children}

      <div className="flex justify-between items-center mt-4">
        <div>
          Showing <strong>{total?.current || 0}</strong> from{" "}
          <strong>{total?.all || 0}</strong>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1 || isLoading}
            className="px-3 py-1 border rounded bg-white disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>

          {(() => {
            const buttons = [];
            const maxShown = 2;

            for (let i = 1; i <= totalPages; i++) {
              if (
                i <= maxShown ||
                i > totalPages - maxShown ||
                (i >= page - 1 && i <= page + 1)
              ) {
                buttons.push(
                  <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    disabled={isLoading}
                    className={`px-3 py-1 border rounded ${
                      i === page ? "bg-eiraButton text-white" : "bg-white"
                    }`}
                  >
                    {i}
                  </button>
                );
              } else if (
                (i === maxShown + 1 && page > maxShown + 2) ||
                (i === totalPages - maxShown &&
                  page < totalPages - maxShown - 1)
              ) {
                if (buttons[buttons.length - 1]?.type !== "span") {
                  buttons.push(
                    <span key={`ellipsis-${i}`} className="px-2">
                      ...
                    </span>
                  );
                }
              }
            }

            return buttons;
          })()}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
            className="px-3 py-1 border rounded bg-white disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
