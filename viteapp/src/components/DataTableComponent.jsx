import React from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';

const DataTableComponent = ({ data, columns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div className="container mx-auto mt-6 mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter || ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border-slate-400/70 dark:bg-slate-800 dark:border-slate-600 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-slate-200 [&::-webkit-scrollbar-thumb]:bg-slate-500/30 [&::-webkit-scrollbar-thumb]:rounded-md dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-600">
        <table {...getTableProps()} className="min-w-full divide-y divide-slate-200 dark:divide-slate-500 border border-slate-300 dark:border-slate-600">
          <thead className="bg-slate-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="min-w-[60px] max-w-[300px] px-4 py-4 text-left text-xs uppercase tracking-wider cursor-pointer dark:bg-slate-800 dark:text-slate-300 "
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-slate-200 dark:divide-slate-600">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="max-w-[300px] px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis dark:bg-slate-800 dark:text-slate-300">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500  dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
          >
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              First
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 ${!canPreviousPage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`relative inline-flex items-center px-2 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Next
            </button>
            <button
              onClick={() => gotoPage(pageOptions.length - 1)}
              disabled={!canNextPage}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600 ${!canNextPage ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Last
            </button>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default DataTableComponent;