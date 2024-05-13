import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EntityName, ApiUrl, ReactRouterPath } from "./enums";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";

const AddTeacher = () => {
  const navigate = useNavigate();

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    newImagePreview(name, file);
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    bio: Yup.string().required("Bio is required"),
    education: Yup.string().required("Education is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    experience: Yup.number().required("Experience is required"),
    qualifications: Yup.string().required("Qualifications is required"),
    subjects: Yup.string().required("Subjects is required"),
    phone_number: Yup.string().required("Phone Number is required"),
    is_active: Yup.boolean(),
    is_verified: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      bio: "",
      education: "",
      email: "",
      date_of_birth: "",
      experience: "",
      subjects: "",
      qualifications: "",
      phone_number: "",
      is_active: false,
      is_verified: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await axios.post(ApiUrl + "store/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toastr.success(`${EntityName} Created Successfully`);
        navigate(ReactRouterPath + "list");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.error("400 Bad Request:", error, error.response.data);
          toastr.error(`${EntityName} Form submission error`);
        } else {
          console.error("Form submission error:", error);
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
          <Link to={ReactRouterPath + "list"}>
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
          <h2 className="card-title">{EntityName}</h2>
        </header>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label className="form-label" htmlFor="first_name">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.first_name &&
                    formik.errors.first_name &&
                    "error-class"
                  }`}
                  id="first_name"
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="first_name"
                />
                {formik.errors.first_name && formik.touched.first_name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.first_name}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="last_name">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.last_name &&
                    formik.errors.last_name &&
                    "error-class"
                  }`}
                  id="last_name"
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="last_name"
                />
                {formik.errors.last_name && formik.touched.last_name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.last_name}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="email">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.email && formik.errors.email && "error-class"
                  }`}
                  id="email"
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="phone_number">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.phone_number && formik.errors.phone_number && "error-class"
                  }`}
                  id="phone_number"
                  type="text"
                  name="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone_number && formik.touched.phone_number && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.phone_number}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="bio">
                  Bio <span className="text-rose-500">*</span>
                </label>
                <textarea
                  className={`form-textarea w-full ${
                    formik.touched.bio && formik.errors.bio && "error-class"
                  }`}
                  id="bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></textarea>
                {formik.errors.bio && formik.touched.bio && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.bio}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label" htmlFor="education">
                  Education <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.education &&
                    formik.errors.education &&
                    "error-class"
                  }`}
                  id="education"
                  type="text"
                  name="education"
                  value={formik.values.education}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="education"
                />
                {formik.errors.education && formik.touched.education && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.education}
                  </div>
                )}
              </div>

                <div>
                  <label className="form-label" htmlFor="qualifications">
                    Qualifications <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className={`form-input w-full ${
                      formik.touched.qualifications &&  formik.errors.qualifications && "error-class"   
                    }`}
                    id="qualifications"
                    type="text"
                    name="qualifications"
                    value={formik.values.qualifications}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="qualifications"
                  />
                  {formik.errors.qualifications && formik.touched.qualifications && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.qualifications}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label" htmlFor="experience">
                    Experience <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className={`form-input w-full ${
                      formik.touched.experience &&  formik.errors.experience && "error-class"   
                    }`}
                    id="experience"
                    type="text"
                    name="experience"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="experience"
                  />
                  {formik.errors.experience && formik.touched.experience && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.experience}
                    </div>
                  )}
                </div>

                <div>
                  <label className="form-label" htmlFor="subjects">
                    Subjects <span className="text-rose-500">*</span>
                  </label>
                  <input
                    className={`form-input w-full ${
                      formik.touched.subjects &&  formik.errors.subjects && "error-class"
                    }`}
                    id="subjects"
                    type="text"
                    name="subjects"
                    value={formik.values.subjects}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="subjects"
                  />
                </div>

              <div>
                <label className="form-label" htmlFor="date_of_birth">
                  Date of Birth <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.date_of_birth &&
                    formik.errors.date_of_birth &&
                    "error-class"
                  }`}
                  id="date_of_birth"
                  type="date"
                  name="date_of_birth"
                  value={formik.values.date_of_birth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.date_of_birth &&
                  formik.touched.date_of_birth && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.date_of_birth}
                    </div>
                  )}
              </div>

              <div>
                <label className="form-label flex mr-2" htmlFor="is_active">
                  Is Active <span className="text-rose-500">*</span>
                <input
                 className="form-checkbox ml-2"
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  checked={formik.values.is_active}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.is_active && formik.touched.is_active && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.is_active}
                  </div>
                )}
                </label>
              </div>

              <div>
                <label className="form-label flex mr-2" htmlFor="is_verified">
                  Is Verified <span className="text-rose-500">*</span>
                <input
                 className="form-checkbox ml-2"
                  id="is_verified"
                  type="checkbox"
                  name="is_verified"
                  checked={formik.values.is_verified}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.is_verified && formik.touched.is_verified && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.is_verified}
                  </div>
                )}
                </label>
              </div>

            </div>
            <button
              type="submit"
              className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap"
            >
              Save {EntityName}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;
