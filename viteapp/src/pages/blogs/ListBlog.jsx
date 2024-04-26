import React, { useMemo, useState, useEffect } from 'react';
import DataTableComponent from '../../components/DataTableComponent';

const ListBlog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Body',
        accessor: 'body',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <button className="btn btn-sm btn-emerald-soft" onClick={() => handleView(row)}>View</button>|
            <button className="btn btn-sm btn-indigo-soft " onClick={() => handleEdit(row)}>Edit</button>|
            <button className="btn btn-sm btn-red-soft" onClick={() => handleDelete(row)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const handleView = (row) => {
    console.log(row)
  };

  const handleEdit = (row) => {
    console.log(row)

  };

  const handleDelete = (row) => {
    console.log(row)

  };


  return (
    <>
      <header className="page-header">
        {/* Left: Title */}
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">Acme Inc. ✨</h1>
        </div>

        {/* Right: Actions */}
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">
          {/* Add member button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 mr-1 md:mr-2" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden md:inline-block">Add Member</span>
          </button>
        </div>
      </header>

      <div className="card">
        <header className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </header>
        <div className="card-body">
          {/* Card content */}

          <DataTableComponent data={data} columns={columns} />

        </div>
      </div>

    </>

  );
};

export default ListBlog;