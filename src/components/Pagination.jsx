const Pagination = ({
  totalPosts,
  pagination,
  setCurrentPage,
  currentPage,
  setLimit,
}) => {
  console.log("Pagination component received pagination prop:", pagination);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-full">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">{totalPosts}</span> results
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-700">
            Limit :
            <select
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="border border-gray-300 rounded p-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <div
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
              onClick={() => {
                if (pagination.previous) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <span className="sr-only">Previous</span>
              Left{" "}
            </div>

            {pagination?.paginationNumbers ? (
              pagination?.paginationNumbers.map((number) => (
                <div
                  key={number}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center  border border-gray-300 ${currentPage === number ? "bg-green-600 text-white" : "bg-white text-gray-900"} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </div>
              ))
            ) : (
              <div
                className={`relative z-10 inline-flex items-center  border border-gray-300 ${currentPage === 1 ? "bg-green-600 text-white" : "bg-white text-gray-900"} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
              >
                {currentPage}
              </div>
            )}

            <div
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:text-black"
              onClick={() => {
                if (pagination.next) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              <span className="sr-only">Next</span>
              Right{" "}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
