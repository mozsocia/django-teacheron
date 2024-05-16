import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { EntityName, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addHandleSubmit,  validationToast } from './formUtils';

const AddStudent = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    bio: Yup.string().required("Bio is required"),
    education: Yup.string().required("Education is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    is_active: Yup.boolean(),
    is_verified: Yup.boolean(),
  });


  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      education: '',
      date_of_birth: '',
      phone_number: '',
      is_active: false,
      is_verified: false,
      bio: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await addHandleSubmit(values, navigate);
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
              <div className='mt-6'>
                <label className="form-label" htmlFor="first_name">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.first_name && formik.errors.first_name && "error-class"}`}
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="first_name"
                />
                {formik.errors.first_name && formik.touched.first_name && <div className="text-red-500 text-sm">{formik.errors.first_name}</div>}
              </div>
              <div className='mt-6'>
                <label className="form-label" htmlFor="last_name">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.last_name && formik.errors.last_name && "error-class"}`}
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="last_name"
                />
                {formik.errors.last_name && formik.touched.last_name && <div className="text-red-500 text-sm">{formik.errors.last_name}</div>}
              </div>

        <div>
          <label className="form-label" htmlFor="date_of_birth">
            Date of Birth <span className="text-rose-500">*</span>
          </label>
          <input
            className={`form-input w-full ${formik.touched.date_of_birth && formik.errors.date_of_birth && "error-class"}`}
            id="date_of_birth"
            type="date"
            name="date_of_birth"
            value={formik.values.date_of_birth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="date_of_birth"
          />
          {formik.errors.date_of_birth && formik.touched.date_of_birth && <div className="text-red-500 text-sm">{formik.errors.date_of_birth}</div>}
            
        </div>

              <div className='mt-6'>
                <label className="form-label" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.email && formik.errors.email && "error-class"}`}
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                />
                {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
              </div>

              <div className='mt-6'>
                <label className="form-label" htmlFor="phone_number">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.phone_number && formik.errors.phone_number && "error-class"}`}
                  id="phone_number"
                  type="text"
                  name="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="phone_number"
                />
                {formik.errors.phone_number && formik.touched.phone_number && <div className="text-red-500 text-sm">{formik.errors.phone_number}</div>} 
              </div>


              <div className='mt-6'>
                <label className="form-label" htmlFor="bio">
                  Bio <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className={`form-textarea w-full ${formik.touched.bio && formik.errors.bio && "error-class"}`}
                  id="bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></textarea>
                {formik.errors.bio && formik.touched.bio && <div className="text-red-500 text-sm">{formik.errors.bio}</div>}
              </div>

              <div className='mt-6'>
                <label className="form-label" htmlFor="education">
                  Education <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-textarea w-full ${formik.touched.education && formik.errors.education && "error-class"}`}
                  id="education"
                  name="education"
                  value={formik.values.education}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></input>
                {formik.errors.education && formik.touched.education && <div className="text-red-500 text-sm">{formik.errors.education}</div>}
              </div>
              <div className="mt-6">
                <label className="flex items-center" name="is_active" id="is_active">
                  <input
                    type="checkbox"
                    className={`form-checkbox mr-2 flex items-center ${formik.touched.is_active && formik.errors.is_active && "error-class"}`}
                    name="is_active"
                    checked={formik.values.is_active}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="text-sm">Is active</span>
                </label>
                {formik.errors.is_active && formik.touched.is_active && <div className="text-red-500 text-sm">{formik.errors.is_active}</div>}
              </div>
              <div className="mt-6">
                <label className="flex items-center" name="is_verified" id="is_verified">
                  <input
                    type="checkbox"
                    className={`form-checkbox mr-2 flex items-center ${formik.touched.is_verified && formik.errors.is_verified && "error-class"}`}
                    name="is_verified"
                    checked={formik.values.is_verified}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="text-sm">Is verified</span>
                </label>
                {formik.errors.is_verified && formik.touched.is_verified && <div className="text-red-500 text-sm">{formik.errors.is_verified}</div>}
              </div>

            </div>

            {/* submit button */}
            <button type="submit"
            onClick={()=>validationToast(formik)}
            className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
              Save {EntityName}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;