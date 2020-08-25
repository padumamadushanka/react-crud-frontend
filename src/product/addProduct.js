import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct } from "./apiProduct";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    quantity: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    quantity,
    loading,
    error,
    createdProduct,
    formData
  } = values;

  // load categories and set form data
  const init = () => {
        setValues({
          ...values,
          formData: new FormData()
        });
     
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
  };

  const newProductForm = () => (
    <form className="mb-3 default-form" onSubmit={clickSubmit}>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="text"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {/* {showLoading()}
          {showSuccess()}
          {showError()} */}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;