import axios from 'axios';
import { ApiUrl, ReactRouterPath, EntityName } from './enums';
import { newImagePreview  } from '@/utils/Utils'
import toastr from 'toastr';
import Select from 'react-select';


export const addHandleSubmit = async (values, navigate) => {
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
};

export const handleFileChange = (event, name, formik) => {
    const file = event.target.files[0];
    formik.setFieldValue(name, file);
    newImagePreview(name, file);
};

export const validationToast = (formik) => {
    if (!formik.isValid) {
        console.log('Form validation error:', formik.errors);
        toastr.error("Form validation error");
    }
};

export const fetchOptions = async (setSelectOptions) => {
    try {
        const response = await axios.get(ApiUrl + 'related/');
        setSelectOptions(response.data);
    } catch (error) {
        console.error('Error fetching options:', error);
    }
};







export const editHandleSubmit = async (id, values, navigate) => {
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
};





export const setFormValues = (data, formik, keys) => {
    formik.setValues({});
    keys.forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined) {
            formik.setFieldValue(key, value);
        }
    });
};

export const setFormSelectValues = (data, formik, keys) => {
    keys.forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined) {
            formik.setFieldValue(key, value.id);
        }
    });
};




