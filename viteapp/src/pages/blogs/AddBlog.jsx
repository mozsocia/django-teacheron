import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { imageValidation, fileSizeValidtion, newImagePreview } from '@/utils/Utils'
import { EntityName, ApiUrl, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

const AddBlog = () => {
  const navigate = useNavigate();
  const [selectOptions, setSelectOptions] = useState({ brands: [], categories: [] });


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(ApiUrl + 'related/');
        setSelectOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    newImagePreview(name, file)
  }


  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.mixed()
      .required('Image is required') // Allow null values
      .test(...imageValidation)
      .test(...fileSizeValidtion),
    category: Yup.number().required('Category is required'),
    brand: Yup.number().required('Brand is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: null,
      category: null,
      brand: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.post(ApiUrl + 'store/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toastr.success(`${EntityName} Created Successfully`);
        navigate(ReactRouterPath + 'list');
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
                <label className="form-label" htmlFor="title">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.title && formik.errors.title && "error-class"}`}
                  id="title"
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="title"
                />
                {formik.errors.title && formik.touched.title && <div className="text-red-500 text-sm">{formik.errors.title}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="content">
                  Content <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className={`form-textarea w-full ${formik.touched.content && formik.errors.content && "error-class"}`}
                  id="content"
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></textarea>
                {formik.errors.content && formik.touched.content && <div className="text-red-500 text-sm">{formik.errors.content}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="image">
                  Image <span className="text-rose-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image-input"
                  className={`form-input w-full form-upload ${formik.touched.image && formik.errors.image && "error-class"}`}
                  onChange={(e)=>handleFileChange(e,'image')}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.image && formik.touched.image && <div className="text-red-500 text-sm">{formik.errors.image}</div>}
              </div>

              <div>
                <label className="form-label">Category <span className="text-rose-500">*</span></label>
                <Select
                  value={formik.values.category ? selectOptions.categories.find(option => option.id === formik.values.category) : null}
                  onChange={(selectedOption) => formik.setFieldValue('category', selectedOption.id)}
                  options={selectOptions.categories}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${formik.touched.category && formik.errors.category && "error-class"}`}
                />
                {formik.errors.category && formik.touched.category && <div className="text-red-500 text-sm">{formik.errors.category}</div>}
              </div>

              <div>
                <label className="form-label">Brand <span className="text-rose-500">*</span></label>
                <Select
                  value={formik.values.brand ? selectOptions.brands.find(option => option.id === formik.values.brand) : null}
                  onChange={(selectedOption) => formik.setFieldValue('brand', selectedOption.id)}
                  options={selectOptions.brands}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${formik.touched.brand && formik.errors.brand && "error-class"}`}
                />
                {formik.errors.brand && formik.touched.brand && <div className="text-red-500 text-sm">{formik.errors.brand}</div>}
              </div>
            </div>
            <button type="submit" className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
              Save {EntityName}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;