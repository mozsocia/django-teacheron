import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { imageValidation, fileSizeValidtion } from '../../utils/Utils'

const AddBlog = () => {
  const brandOptions = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Yellow' }
  ];


  const validationSchema = Yup.object({
    brand: Yup.number().required(),
    name: Yup.string().required(),
    message: Yup.string().optional().required(),
    email: Yup.string().email('Invalid email address').required(),
    newsletter: Yup.boolean().required(),
    file: Yup.mixed()
      .required() // Allow null values
      .test(...imageValidation)
      .test(...fileSizeValidtion),
    radio_option: Yup.string().oneOf(['option1', 'option2', 'option3'], 'Invalid option').required(),
  });


  const formik = useFormik({
    initialValues: {
      brand: null,
      name: '',
      message: '',
      email: '',
      newsletter: false,
      file: null,
      radio_option: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div>
      <div className="card">
        <header className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </header>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label className="form-label">Brand</label>
                <Select
                  value={formik.values.brand ? brandOptions.find(option => option.id === formik.values.brand) : null}
                  onChange={(selectedOption) => formik.setFieldValue('brand', selectedOption.id)}
                  options={brandOptions}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${formik.touched.brand && formik.errors.brand && "error-class"
                    }`}
                />
                {formik.errors.brand && formik.touched.brand && <div className="text-red-500 text-sm">{formik.errors.brand}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="name">
                  Full Name <span className="text-rose-500">*</span>
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
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className={`form-textarea w-full ${formik.touched.message && formik.errors.message && "error-class"}`}
                  id="message"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></textarea>
                {formik.errors.message && formik.touched.message && <div className="text-red-500 text-sm">{formik.errors.message}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="email">
                  Email Address <span className="text-rose-500 text-sm">*</span>
                </label>
                <input
                  className={`form-input w-full ${formik.touched.email && formik.errors.email && "error-class"}`}
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}

                />
                {formik.errors.email && formik.touched.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
              </div>

              <div className="mt-6">
                <label className="flex items-center" name="newsletter" id="newsletter">
                  <input
                    type="checkbox"
                    className={`form-checkbox mr-2 flex items-center ${formik.touched.newsletter && formik.errors.newsletter && "error-class"}`}
                    name="newsletter"
                    checked={formik.values.newsletter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="text-sm">Email me about product news.</span>
                </label>
                {formik.errors.newsletter && formik.touched.newsletter && <div className="text-red-500 text-sm">{formik.errors.newsletter}</div>}
              </div>

              <div>
                <label className="form-label" htmlFor="file">
                  Upload File
                </label>
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  className={`form-input w-full form-upload ${formik.touched.file && formik.errors.file && "error-class"}`}
                  onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.file && formik.touched.file && <div className="text-red-500 text-sm">{formik.errors.file}</div>}
              </div>

              <div>
                <span className="form-label">Style</span>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className={`form-radio text-indigo-500 ${formik.touched.radio_option && formik.errors.radio_option && "error-class"}`}
                      name="radio_option"
                      id="radio_option1"
                      value="option1"
                      checked={formik.values.radio_option === 'option1'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="inline-block" htmlFor="radio_option1">
                      Option 1
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className={`form-radio text-indigo-500 ${formik.touched.radio_option && formik.errors.radio_option && "error-class"}`}
                      name="radio_option"
                      id="radio_option2"
                      value="option2"
                      checked={formik.values.radio_option === 'option2'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="inline-block" htmlFor="radio_option2">
                      Option 2
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className={`form-radio text-indigo-500 ${formik.touched.radio_option && formik.errors.radio_option && "error-class"}`}
                      name="radio_option"
                      id="radio_option3"
                      value="option3"
                      checked={formik.values.radio_option === 'option3'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="inline-block" htmlFor="radio_option3">
                      Option 3
                    </label>
                  </div>
                </div>
                {formik.errors.radio_option && formik.touched.radio_option && <div className="text-red-500 text-sm">{formik.errors.radio_option}</div>}
              </div>
            </div>
            <button type="submit" className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;