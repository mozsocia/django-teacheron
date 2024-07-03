import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { imageValidation, fileSizeValidtion, newImagePreview, previousImagePreview } from '@/utils/Utils'
import { EntityName, ApiUrl, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { editHandleSubmit, fetchOptions, handleFileChange, validationToast } from './formUtils';
import { renderInputField } from './InputFieldRenderer';

const EditBlog = () => {
  const navigate = useNavigate();
  const [selectOptions, setSelectOptions] = useState({ brands: [], categories: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOptions(setSelectOptions);
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.mixed()
      .test(...imageValidation)
      .test(...fileSizeValidtion),
    category: Yup.number().required('Category is required'),
    brand: Yup.number().required('Brand is required'),
    email: Yup.string().email('Invalid email address').required(),
    newsletter: Yup.boolean().required(),
    color: Yup.string().oneOf(['option1', 'option2', 'option3'], 'Invalid option').required(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      image: null,
      category: null,
      brand: null,
      email: '',
      newsletter: false,
      color: ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await editHandleSubmit(id, values, navigate, formik);
    },
  });


  const inputFields = [
    { key: 'title', inputType: 'text', label: 'Title', required: true },
    { key: 'content', inputType: 'textarea', label: 'Content', required: true },
    { key: 'image', inputType: 'file', label: 'Image', required: true },
    { key: 'category', inputType: 'select', label: 'Category', required: true, options: selectOptions.categories },
    { key: 'brand', inputType: 'select', label: 'Brand', required: true, options: selectOptions.brands },
    { key: 'email', inputType: 'email', label: 'Email Address', required: true },
    { key: 'newsletter', inputType: 'checkbox', label: 'Email me about product news.' },
    { key: 'color', inputType: 'radio', label: 'Choose color', options: ['option1', 'option2', 'option3'] },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/edit/`);
        const data = response.data;

        formik.setValues({
          title: data.title,
          content: data.content,
          email: data.email,
          newsletter: data.newsletter,
          color: data.color,
          category: data.category ? data.category.id : null,
          brand: data.brand ? data.brand.id : null,
        });

        previousImagePreview('image', data.image);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []);

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

      {/* main content container  */}
      <div className="card">
        <header className="card-header">
          <h2 className="card-title">{EntityName}</h2>
        </header>

        <div className="card-body">
          {/* Form  */}
          <form onSubmit={formik.handleSubmit} className="p-4">
            {/* Input fields */}
            <div className="space-y-4">
              {inputFields.map((field) => renderInputField(field, formik))}
            </div>

            {/* Buttons */}
            <button type="submit"
              onClick={() => validationToast(formik)}
              className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
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
          {/* End form */}

        </div>
      </div>
    </div>
  );
};

export default EditBlog;