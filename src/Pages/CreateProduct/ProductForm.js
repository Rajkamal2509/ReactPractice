import { useState } from "react";

function ProductForm() {


let [userInput,updatenput]=useState({
    pName:'',
    pPrice:'',
    pDescription:'',
    pAvaible:'',
    pImage:'',
})

const handleChange = (e) => {
    const { name, value } = e.target;
    updatenput({
        ...userInput,
        [name]: value,
    });
};
const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm(formData);
  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    console.log(userInput);
      console.log('Form submitted successfully!');
  } else {
      console.log('Form submission failed due to validation errors.');
  }
};
const validateForm = (data) => {
  const errors = {};

  if (!data.pName.trim()) {
      errors.pName = 'Username is required';
  } else if (data.pName.length < 4) {
      errors.pName = 'Username must be at least 4 characters long';
  }

  if (!data.pPrice.trim()) {
      errors.pPrice = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.pPrice)) {
      errors.pPrice = 'Email is invalid';
  }

  if (!data.password) {
      errors.password = 'Password is required';
  } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
  }

  if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};



    return (
  
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label for="name">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Product Name"
              />
            </div>
            <div className="col-md-6">
              <label for="price">Product Price</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                className="form-control"
                id="price"
                placeholder="Product Price"
              />
            </div>
  
            <div className="form-group">
              <label for="description">Product Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Product Description"
              />
            </div>
  
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="isAvailable"
              />
              <label class="form-check-label" for="isAvailable">
                Is product available in stock?
              </label>
            </div>
  
            <div className="form-group">
              <label for="select-image">Select product image</label>
              <input type="file" className="form-control" id="select-image" />
            </div>
  
            <button type="submit" className="btn btn-primary">
              Add Product
            </button>
          </form>
     
    )
  }
  
  export default ProductForm;