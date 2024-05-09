import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { EntityName, ApiUrl, ReactRouterPath } from './enums';
import { useParams } from 'react-router-dom';

const ProductsDetails = () => {
  const [products, setProducts] = useState({});
  const { id } = useParams();


  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/show`);
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };


    fetchProductsData();
  }, [id]);

  if (!products) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="page-header">
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">{EntityName}</h1>
        </div>
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">
          <Link to={`${ReactRouterPath}list`}>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg
                className="w-5 h-5 fill-current opacity-70 mr-1 md:mr-2"
                viewBox="0 0 24 24"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              <span className="hidden md:inline-block">List {EntityName}</span>
            </button>
          </Link>
        </div>
      </header>

      <div className="card">
        <header className="card-header">
          <h2 className="card-title"> {EntityName} Details</h2>
        </header>
        <div className="card-body">
          <div className="space-y-1">
            <div className="detail-section">
              <div className="detail-item">
                <div className="detail-item-title">Title :</div>
                <div className="detail-item-p">
                  <p>{products.title}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Image :</div>
                <div className="detail-item-p">
                  <img src={products.image} width="150px" alt="products Image" />
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Short Details :</div>
                <div className="detail-item-p">
                  <p>{products.short_details}</p>
                </div>
              </div>


              <div className="detail-item">
                <div className="detail-item-title">Brand :</div>
                <div className="detail-item-p">
                  <p>{products.brand?.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Category :</div>
                <div className="detail-item-p">
                  <p>{products.category?.name}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Remark :</div>
                <div className="detail-item-p">
                  <p>{products.remark}</p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-item-title">Color :</div>
                <div className="detail-item-p">
                  <p>{products.color}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Size :</div>
                <div className="detail-item-p">
                  <p>{products.size}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Price :</div>
                <div className="detail-item-p">
                  <p>{products.price}</p>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-item-title">Ratings :</div>
                <div className="detail-item-p">
                  <p>{products.rating}</p>
                </div>
              </div>


              <Link to={`${ReactRouterPath}${id}/edit/`}>
                <button className="btn btn-indigo-outline mt-3">
                  <span className="hidden md:inline-block">
                    Edit {EntityName}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetails;