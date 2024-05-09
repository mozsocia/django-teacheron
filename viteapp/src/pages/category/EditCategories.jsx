import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { imageValidation, fileSizeValidtion, newImagePreview, previousImagePreview } from '@/utils/Utils'
import { EntityName, ApiUrl, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

const EditCategories = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [selectOptions, setSelectOptions] = useState({ brands: [], categories: [] });

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     try {
  //       const response = await axios.get(ApiUrl + 'related/');
  //       setSelectOptions(response.data);
  //     } catch (error) {
  //       console.error('Error fetching options:', error);
  //     }
  //   };
  //   fetchOptions();
  // }, []);


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/edit/`);
        const data = response.data;
        formik.setValues({
          name: data.name,
          details: data.details,
        //   content: data.content,
        //   brand: data.brand.id,
        //   category: data.category.id,
        });
        previousImagePreview('img', data.img);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    newImagePreview(name, file)
  }


  const validationSchema = Yup.object({
    name: Yup.string(),
    img: Yup.mixed().test(...imageValidation),
    details: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    //   content: '',
      img: null,
      details: '',
    //   category: null,
    //   brand: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.post(`${ApiUrl}${id}/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


        toastr.success(`${EntityName} Updated Successfully`);
        navigate(`${ReactRouterPath}${response.data.id}/show`);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error('400 Bad Request:', error, error.response.data);
          toastr.error(`${EntityName} Form submission error`);
        } else {
          console.error('Form submission error:', error);
          toastr.error(`${EntityName} Form submission error`);
        }
      }
    },
  });

  return (
    <div>
      <header className="page-header">

        {/* Left: Title */}
        <div className="mb-4 md:mb-0">
          <h1 className="page-title">{EntityName}</h1>
        </div>

        {/* Right: Actions */}
        <div className="page-header-right-actions grid grid-cols-max-content gap-2">

          {/* Add member button */}
          <Link to={ReactRouterPath + 'list'}>
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
              <svg className="w-5 h-5 fill-current opacity-70 mr-1 md:mr-2" viewBox="0 0 24 24">
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              <span className="hidden md:inline-block">List {EntityName}</span>
            </button>
          </Link>
        </div>

      </header>
      <div className="card">
        <header className="card-header">
          <h2 className="card-title">{EntityName}</h2>
        </header>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label className="form-label" htmlFor="name">
                  Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.name && formik.errors.name && "error-class"}`}
                  id="name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="name"
                />
                {formik.errors.name && formik.touched.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
              </div>
              <div>
                <label className="form-label" htmlFor="img">
                  image <span className="text-rose-500">*</span>
                </label>
                <input
                  type="file"
                  name="img"
                  id="img-input"
                  className={`form-input w-full form-upload ${formik.touched.img && formik.errors.img && "error-class"}`}
                  onChange={(e) => handleFileChange(e, 'img')}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.img && formik.touched.img && <div className="text-red-500 text-sm">{formik.errors.img}</div>}
              </div>

             <div>
                <label className="form-label" htmlFor="details">
                  Details <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-textarea w-full ${formik.touched.details && formik.errors.details && "error-class"}`}
                  id="details"
                  name="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></input>
                {formik.errors.details && formik.touched.details && <div className="text-red-500 text-sm">{formik.errors.details}</div>}
             </div>

            </div>
            <button type="submit" className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
              Update {EntityName}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn mt-3 ms-2 btn-red-outline whitespace-nowrap"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;