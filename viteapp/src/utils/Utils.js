import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);




export const newImagePreview = (name, file) => {
  if (file) {
    // Remove the existing img tag
    const existingImgPreview = document.querySelector(`input[name=${name}] + img`);
    if (existingImgPreview) {
      existingImgPreview.remove();
    }

    const reader = new FileReader();

    reader.onload = () => {
      // Create the img tag
      const imgPreview = document.createElement('img');
      imgPreview.src = reader.result;
      imgPreview.alt = 'Preview';
      imgPreview.classList.add('img-preview');

      // Get the input element by name attribute
      const inputElement = document.querySelector(`input[name=${name}]`);

      // Insert the img tag after the input element
      inputElement.insertAdjacentElement('afterend', imgPreview);
    };

    reader.readAsDataURL(file);
  } else {
    // Remove the existing img tag
    const existingImgPreview = document.querySelector(`input[name=${name}] + img`);
    if (existingImgPreview) {
      existingImgPreview.remove();
    }
  }
}

export const previousImagePreview = (name, file) => {
  // Create the img tag
  const imgPreview = document.createElement('img');
  imgPreview.src = file;
  imgPreview.alt = 'Preview';
  imgPreview.classList.add('img-preview');
  imgPreview.style.width = '100px';
  // Create the span tag
  const spanPrevious = document.createElement('span');
  spanPrevious.textContent = 'previous img';

  // Get the input element by name attribute
  const inputElement = document.querySelector(`input[name=${name}]`);

  // Insert the span and img tags before the input element
  inputElement.insertAdjacentElement('beforebegin', spanPrevious);
  inputElement.insertAdjacentElement('beforebegin', imgPreview);
};


export const imageValidation = [
  'fileType',
  'Invalid file format. Only PNG, JPG, and JPEG files are allowed.',
  (value) => {
    if (!value) return true; // Allow null or undefined values
    const supportedFormats = ['image/png', 'image/jpeg'];
    return supportedFormats.includes(value.type);
  }
]

export const fileSizeValidtion = [
  'fileSize',
  'File size is too large. Maximum allowed size is 5MB.',
  (value) => {
    if (!value) return true; // Allow null or undefined values
    return value.size <= 5 * 1024 * 1024; // 2MB in bytes
  }
]




export const setFormValues = (data, formik, keys) => {
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