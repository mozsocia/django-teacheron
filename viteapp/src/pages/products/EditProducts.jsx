import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { imageValidation, fileSizeValidtion, newImagePreview, previousImagePreview , setFormValues, setFormSelectValues } from '@/utils/Utils'
import { EntityName, ApiUrl, ReactRouterPath } from './enums'
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toastr from 'toastr';

const EditProducts = () => {
  const navigate = useNavigate();
  const [selectOptions, setSelectOptions] = useState({ brands: [], categories: [], remark: [] });
  const { id } = useParams();

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




  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}${id}/edit/`);
        const data = response.data;

        const keys = [
          'title', 'remark', 'price', 'points', 'discount', 'previous_price', 
          'sku', 'stock_count', 'rating', 'color', 'size', 'is_active', 
          'is_reseller', 'reseller_price', 'additional_info', 'short_details'
        ];
        setFormValues(data, formik , keys);
        setFormSelectValues( data, formik, ['category', 'brand']);

        previousImagePreview('image', data.image);

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
    title: Yup.string(),
    image: Yup.mixed()
      .test(...imageValidation)
      .test(...fileSizeValidtion),
    category: Yup.number().nullable(),
    brand: Yup.number().nullable(),
    remark: Yup.string(),
    price: Yup.number(),
    points: Yup.number(),
    discount: Yup.boolean(),
    previous_price: Yup.number(),
    sku: Yup.string(),
    stock_count: Yup.number(),
    rating: Yup.number(),
    color: Yup.string(),
    size: Yup.string(),
    is_active: Yup.boolean(),
    is_reseller: Yup.boolean(),
    reseller_price: Yup.number(),
    additional_info: Yup.string(),
    short_details: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category: null,
      brand: null,
      remark: "",
      price: '',
      points: '',
      discount: false,
      previous_price: '',
      sku: "",
      stock_count: '',
      rating: '',
      color: "",
      size: "",
      is_active: false,
      is_reseller: false,
      reseller_price: '',
      additional_info: "",
      short_details: "",
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



  const validationToast = () => {
    console.log(formik)
    if (!formik.isValid) {
      toastr.error("form validation error")
    }
}
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
              {/* Title */}
              <div>
                <label className="form-label" htmlFor="title">
                  Title <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.title && formik.errors.title && "error-class"
                  }`}
                  id="title"
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="title"
                />
                {formik.errors.title && formik.touched.title && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.title}
                  </div>
                )}
              </div>
                 {/* short details */}
              <div>
                <label className="form-label" htmlFor="short_details">
                  Short Details <span className="text-rose-500">*</span>  
                </label>
                <textarea
                  className={`form-textarea w-full ${
                    formik.touched.short_details && formik.errors.short_details && "error-class"
                  }
                  `}
                  id="short_details"
                  name="short_details"
                  value={formik.values.short_details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="3"
                ></textarea>
                {formik.errors.short_details && formik.touched.short_details && <div className="text-red-500 text-sm">{formik.errors.short_details}</div>}
              </div>
              {/* sku */}
              <div>
              <label className="form-label" htmlFor="sku">
                  SKU <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.sku && formik.errors.sku && "error-class"
                  }`}
                  id="sku"
                  type="text"
                  name="sku"
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="sku"
                />
                {
                  formik.errors.sku && formik.touched.sku && <div className="text-red-500 text-sm">{formik.errors.sku}</div>
                }
              </div>

              {/* price */}
              <div>
                <label className="form-label" htmlFor="price">
                  Price <span className="text-rose-500">*</span>
                </label>
                <input
                   className={`form-input w-full ${
                    formik.touched.title && formik.errors.title && "error-class"
                  }`}
                  id="price"
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="price"
                />
                {formik.errors.price && formik.touched.price && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.price}
                  </div>
                )}
              </div>


                  {/* points */}
                  <div>
                <label className="form-label" htmlFor="points">
                  points <span className="text-rose-500">*</span>
                </label>
                <input
                   className={`form-input w-full ${
                    formik.touched.title && formik.errors.title && "error-class"
                  }`}
                  id="points"
                  type="number"
                  name="points"
                  value={formik.values.points}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="points"
                />
                {formik.errors.points && formik.touched.points && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.points}
                  </div>
                )}
              </div>


                {/* discount */}

              <div>
                <label className="form-label flex items-center" htmlFor="discount">

                  <input
                    className="form-checkbox mr-2"
                    id="discount"
                    type="checkbox"
                    name="discount"
                    checked={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className='text-sm'> Discount</span>
                </label>

              </div>

                {/* previous price */}
                <div>
                <label className="form-label" htmlFor="previous_price">
                  Previous Price <span className="text-rose-500">*</span>
                </label>
                <input
                   className={`form-input w-full ${
                    formik.touched.title && formik.errors.title && "error-class"
                  }`}
                  id="previous_price"
                  type="number"
                  name="previous_price"
                  value={formik.values.previous_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="previous_price"
                />
                {formik.errors.previous_price && formik.touched.previous_price && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.previous_price}
                  </div>
                )}
              </div>
                {/* image */}
              <div>
                <label className="form-label" htmlFor="image">
                  Image <span className="text-rose-500">*</span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image-input"
                  className={`form-input w-full form-upload ${
                    formik.touched.image && formik.errors.image && "error-class"
                  }`}
                  onChange={(e) => handleFileChange(e, "image")}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.image && formik.touched.image && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* stock count */}
              <div>
                <label className="form-label" htmlFor="stock_count">
                  Stock Count <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.stock_count &&
                    formik.errors.stock_count &&
                    "error-class"
                  }`}
                  id="stock_count"
                  type="number"
                  name="stock_count"
                  value={formik.values.stock_count}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="stock_count"
                />
                {formik.errors.stock_count && formik.touched.stock_count && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.stock_count}
                  </div>
                )}
              </div>

              {/* rating */}
              <div>
                <label className="form-label" htmlFor="rating">
                  Rating <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.rating && formik.errors.rating && "error-class"
                  }`}
                  id="rating"
                  type="number"
                  name="rating"
                  value={formik.values.rating}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="rating"
                />
                {formik.errors.rating && formik.touched.rating && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.rating}
                  </div>
                )}  
              </div>
              {/* category select */}
              <div>
                <label className="form-label" htmlFor="category">
                  Category <span className="text-rose-500">*</span>
                </label>
                <Select
                  value={
                    formik.values.category
                      ? selectOptions.categories.find(
                          (option) => option.id === formik.values.category
                        )
                      : null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue("category", selectedOption.id)
                  }
                  options={selectOptions.categories}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${
                    formik.touched.category &&
                    formik.errors.category &&
                    "error-class"
                  }`}
                />
                {formik.errors.category && formik.touched.category && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.category}
                  </div>
                )}
              </div>
              {/* brand select */}
              <div>
                <label className="form-label" htmlFor="brand">
                  Brand <span className="text-rose-500">*</span>
                </label>
                <Select
                  value={
                    formik.values.brand
                      ? selectOptions.brands.find(
                          (option) => option.id === formik.values.brand
                        )
                      : null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue("brand", selectedOption.id)
                  }
                  options={selectOptions.brands}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${
                    formik.touched.brand && formik.errors.brand && "error-class"
                  }`}
                />
                {formik.errors.brand && formik.touched.brand && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.brand}
                  </div>
                )}
              </div>
              {/* remark select */}
              <div>
                <label className="form-label" htmlFor="remark">
                  Remark <span className="text-rose-500">*</span>
                </label>
                <Select
                  value={
                    formik.values.remark
                      ? selectOptions.remark.find(
                          (option) => option.id === formik.values.remark
                        )
                      : null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue("remark", selectedOption.id)
                  }
                  options={selectOptions.remark}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className={`${
                    formik.touched.remark && formik.errors.remark && "error-class"
                  }`}
                />
                {formik.errors.remark && formik.touched.remark && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.remark}
                  </div>
                )}
              </div>

              {/* color */}
              <div>
                <label className="form-label" htmlFor="color">
                  Color <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.color && formik.errors.color && "error-class"
                  }`}
                  id="color"
                  type="text"
                  name="color"
                  value={formik.values.color}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="color"
                />
                {formik.errors.color && formik.touched.color && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.color}
                  </div>
                )}
              </div>

              {/* size */}
              <div>
                <label className="form-label" htmlFor="size">
                  Size <span className="text-rose-500">*</span>
                </label>
                <input
                  className={`form-input w-full ${
                    formik.touched.size && formik.errors.size && "error-class"
                  }`}
                  id="size"
                  type="text"
                  name="size"
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="size"
                />
                {formik.errors.size && formik.touched.size && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.size}
                  </div>
                )}
              </div>
              {/* is_active */}
              <div>
                <label className="form-label flex items-center" htmlFor="is_active">
                 
                  <input
                  className="form-checkbox mr-2"
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  checked={formik.values.is_active}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className='text-sm'> Is Active</span>
                </label>
               
              </div>
              {/* is_reseller */}
              <div>
                <label className="form-label flex items-center" htmlFor="is_reseller">
                <input
                  className="form-checkbox mr-2"
                  id="is_reseller"
                  type="checkbox"
                  name="is_reseller"
                  checked={formik.values.is_reseller}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                 <span className='text-sm'> Is Reseller</span>
                </label>
             
              </div>
                {/* reseller_price */}
                <div>
                  <label className="form-label" htmlFor="reseller_price">
                    Reseller Price
                  </label>
                  <input
                    className={`form-input w-full ${
                      formik.touched.reseller_price && formik.errors.reseller_price && "error-class"
                    }`}
                    id="reseller_price"
                    type="number"
                    name="reseller_price"
                    value={formik.values.reseller_price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="reseller_price"
                  />
                  {formik.errors.reseller_price && formik.touched.reseller_price && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.reseller_price}
                    </div>
                  )}
                </div>
                {/* additional_info */}
                <div>
                  <label className="form-label" htmlFor="additional_info">
                    Additional Info
                  </label>
                  <textarea
                    className={`form-textarea w-full ${
                      formik.touched.additional_info && formik.errors.additional_info && "error-class"
                    }`}
                    id="additional_info"
                    name="additional_info"
                    value={formik.values.additional_info}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="3"
                  ></textarea>
                </div>
            </div>
            <button type="submit" onClick={validationToast} className="btn mt-3 bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
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

export default EditProducts;