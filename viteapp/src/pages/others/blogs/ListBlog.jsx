import React, { useMemo, useState, useEffect } from 'react';
import DataTableComponent from '../../components/DataTableComponent';
import { EntityName, ApiUrl, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SwalAlert from '@/utils/swalAlert'; // Assuming you have SwalAlert implemented
import toastr from 'toastr';

const ListBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(ApiUrl + 'list/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Title', accessor: 'title', Cell: ({ row }) => <TitleCell row={row} /> }, 
      { Header: 'Content', accessor: 'content' },
      { 
        Header: 'Image', 
        accessor: 'image',
        Cell: ({ cell: { value } }) => (
          <img
            src={value}
            alt={value}
            style={{ maxWidth: '40px', maxHeight: '40px' }}
          />
        ),
      },
      { Header: 'Email', accessor: 'email' },
      { 
        Header: 'Newsletter', 
        accessor: 'newsletter',
        Cell: ({ cell: { value } }) => value ? 'Yes' : 'No',
      }, // Add Newsletter column
      { Header: 'Color', accessor: 'color' }, 
      { Header: 'Category', accessor: 'category.name' },
      { Header: 'Brand', accessor: 'brand.name' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div>
            <button className="btn btn-sm btn-emerald-soft" onClick={() => handleView(row)}>View</button>|
            <button className="btn btn-sm btn-indigo-soft" onClick={() => handleEdit(row)}>Edit</button>|
            <button className="btn btn-sm btn-red-soft" onClick={() => handleDelete(row)}>Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const TitleCell = ({ row }) => {
    const handleTitleClick = () => {
      navigate(`${ReactRouterPath}${row.values.id}/show`);
    };
    return <span style={{ cursor: 'pointer' }} onClick={handleTitleClick}>{row.original.title}</span>;
  };

  

  const handleEdit = (data) => {

    navigate(`${ReactRouterPath}${data.values.id}/edit`);

  };

  const handleView = (data) => {

    navigate(`${ReactRouterPath}${data.values.id}/show`);

  };

  const handleDelete = (data) => {

    SwalAlert('Are you sure?', 'This action cannot be undone.', 'warning').then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(ApiUrl + `${data.values.id}/destroy/`);

            if (response.status === 204) {
              toastr.success(`${EntityName} Deleted successfully`);
              getList();
            } else {
              toastr.error(`${EntityName} Error deleting data`);
            }
          } catch (error) {
            console.error('Error deleting data:', error);
            toastr.error(`${EntityName} Error deleting data`);
          }
        }
      }
    );
  };


  return (
    <>
      <header className="page-header">

        {/* Left: Title */}
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">{EntityName}</h1>
        </div>

        {/* Right: Actions */}
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">

          {/* Add member button */}
          <Link to={ReactRouterPath + 'add'}>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg className="w-4 h-4 fill-current opacity-50 mr-1 md:mr-2" viewBox="0 0 16 16">
                <path
                  d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z">
                </path>
              </svg>
              <span className="hidden md:inline-block">Add {EntityName}</span>
            </button>
          </Link>
        </div>

      </header>

      <div className="card">
        <header className="card-header">
          <h2 className="card-title">{ EntityName } List</h2>
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