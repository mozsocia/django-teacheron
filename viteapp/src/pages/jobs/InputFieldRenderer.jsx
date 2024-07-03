// InputFieldRenderer.js

import { addHandleSubmit, handleFileChange, fetchOptions, validationToast } from './formUtils';
import Select from 'react-select';

export const renderInputField = (field, formik) => {
    const { key, inputType, label, required, options } = field;
    const hasError = formik.touched[key] && formik.errors[key];
  
    switch (inputType) {
      case 'text':
      case 'email':
        return (
          <div key={key}>
            <label className="form-label" htmlFor={key}>
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
              className={`form-input w-full ${hasError && 'error-class'}`}
              id={key}
              type={inputType}
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete={key}
            />
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      case 'textarea':
        return (
          <div key={key}>
            <label className="form-label" htmlFor={key}>
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <textarea
              className={`form-textarea w-full ${hasError && 'error-class'}`}
              id={key}
              name={key}
              value={formik.values[key]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="3"
            ></textarea>
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      case 'file':
        return (
          <div key={key}>
            <label className="form-label" htmlFor={key}>
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <input
              type="file"
              name={key}
              id={`${key}-input`}
              className={`form-input w-full form-upload ${hasError && 'error-class'}`}
              onChange={(e) => handleFileChange(e, key, formik)}
              onBlur={formik.handleBlur}
            />
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      case 'select':
        return (
          <div key={key}>
            <label className="form-label">
              {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <Select
              value={formik.values[key] ? options.find(option => option.id === formik.values[key]) : null}
              onChange={(selectedOption) => formik.setFieldValue(key, selectedOption.id)}
              options={options}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              className={`${hasError && 'error-class'}`}
            />
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      case 'checkbox':
        return (
          <div key={key} className="mt-6">
            <label className="flex items-center" name={key} id={key}>
              <input
                type="checkbox"
                className={`form-checkbox mr-2 flex items-center ${hasError && 'error-class'}`}
                name={key}
                checked={formik.values[key]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className="text-sm">{label}</span>
            </label>
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      case 'radio':
        return (
          <div key={key}>
            <span className="form-label">{label}</span>
            <div className="flex items-center space-x-8">
              {options.map((option, index) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    className={`form-radio text-indigo-500 ${hasError && 'error-class'}`}
                    name={key}
                    id={`${key}-${index}`}
                    value={option}
                    checked={formik.values[key] === option}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="inline-block" htmlFor={`${key}-${index}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {hasError && <div className="text-red-500 text-sm">{formik.errors[key]}</div>}
          </div>
        );
      default:
        return null;
    }
  };