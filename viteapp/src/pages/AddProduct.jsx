import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const AddProduct = () => {
  const [brandValue, setBrandValue] = useState(null);
  const brandOptions = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Apple' },
    { id: 3, name: 'Yellow' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  useEffect(() => {
    console.log("val", brandValue)
  }, [brandValue])


  return (
    <div>


      <div className="card">
        <header className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </header>
        <div className="card-body">
          {/* Card content */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="space-y-4">
              <div>
                <label className="form-label">Brand</label>
                <Select
                  value={brandValue ? brandOptions.find(option => option.id === brandValue) : null}
                  onChange={(selectedOption) => setBrandValue(selectedOption.id)}
                  options={brandOptions}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
              </div>

              <div>
                <label className="form-label" htmlFor="name">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  className="form-input w-full"
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea className="form-textarea w-full" id="message" name="message" rows="3"></textarea>
              </div>

              <div>
                <label className="form-label" htmlFor="email">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input className="form-input w-full" id="email" type="email" name="email" required />
              </div>



              <div className="mt-6">
                <label className="flex items-center" name="newsletter" id="newsletter">
                  <input type="checkbox" className="form-checkbox mr-2" />
                  <span className="text-sm">Email me about product news.</span>
                </label>
              </div>

              <div>
                <label className="form-label" htmlFor="file">
                  Upload File
                </label>
                <input type="file" name="file-input" id="file-input" className="form-input w-full form-upload" />
              </div>





              <div>
                <span className="form-label">Style</span>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio text-indigo-500"
                      name="radio_option"
                      id="radio_option1"
                      value="option1"
                    />
                    <label className="inline-block" htmlFor="radio_option1">
                      Option 1
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio text-indigo-500"
                      name="radio_option"
                      id="radio_option2"
                      value="option2"
                    />
                    <label className="inline-block" htmlFor="radio_option2">
                      Option 2
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio text-indigo-500"
                      name="radio_option"
                      id="radio_option3"
                      value="option3"
                    />
                    <label className="inline-block" htmlFor="radio_option3">
                      Option 3
                    </label>
                  </div>
                </div>
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

export default AddProduct;