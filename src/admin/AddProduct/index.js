import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../../core/Layout';
import { isAuthenticated } from '../../auth';
import { createProduct, getCategories } from '../../common/api';
import './index.css';
import { Link } from 'react-router-dom';

export const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: new FormData(),
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const goToDashBoard = useCallback(() => {
    return (
      <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>
          Back to Dashboard
        </Link>
      </div>
    );
  }, []);

  const changeHandler = useCallback(
    (key) => (event) => {
      const value = key === 'photo' ? event.target.files[0] : event.target.value;
      formData.set(key, value);
      setValues((values) => ({ ...values, [key]: value }));
    },
    [formData]
  );

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      setValues((values) => ({ ...values, error: '', loading: true }));
      createProduct({ userId: user._id, token, product: formData }).then((data) => {
        if (data.error) {
          setValues((values) => ({ ...values, error: data.error, loading: false }));
        } else {
          setValues((values) => ({
            ...values,
            name: '',
            description: '',
            photo: '',
            price: '',
            quantity: '',
            error: '',
            loading: false,
            createdProduct: data.name,
          }));
        }
      });
    },
    [formData, token, user._id]
  );

  const init = useCallback(() => {
    getCategories().then((data) => {
      if (data.error) {
        setValues((values) => ({ ...values, error: data.error }));
      } else {
        setValues((values) => ({ ...values, categories: data }));
      }
    });
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const showError = useCallback(
    () => (
      <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
        {error}
      </div>
    ),
    [error]
  );

  const showSuccess = useCallback(
    () => (
      <div className='alert alert-success' style={{ display: createdProduct ? '' : 'none' }}>
        <h2>{`${createdProduct} is created!`}</h2>
      </div>
    ),
    [createdProduct]
  );

  const showLoading = useCallback(() => {
    loading && (
      <div className='alert alert-success'>
        <h2>Loading....</h2>
      </div>
    );
  }, [loading]);

  const newProductForm = () => {
    return (
      <form className='mb-3' onSubmit={submitHandler}>
        <h4>Post Photo</h4>
        <div className='form-group'>
          <label className='btn btn-secondary'>
            <input onChange={changeHandler('photo')} type='file' name='photo' accept='image/*' />
          </label>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input onChange={changeHandler('name')} type='text' name='name' className='form-control' value={name} />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Description</label>
          <input
            onChange={changeHandler('description')}
            type='text'
            name='description'
            className='form-control'
            value={description}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Price</label>
          <input onChange={changeHandler('price')} name='price' type='number' className='form-control' value={price} />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Category</label>
          <select onChange={changeHandler('category')} value={category} className='form-control'>
            <option>Please select</option>
            {categories &&
              categories.map((category, i) => (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              ))}
            <option value='616cf0c1c7583093d8d5a2cc'>Python2</option>
          </select>
        </div>

        <div className='form-group'>
          <label className='text-muted'>Quantity</label>
          <input
            onChange={changeHandler('quantity')}
            name='quantity'
            type='number'
            className='form-control'
            value={quantity}
          />
        </div>

        <div className='form-group'>
          <label className='text-muted'>Shipping</label>
          <select onChange={changeHandler('shipping')} className='form-control'>
            <option>Please select</option>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>

        <input type='submit' className='btn btn-outline-primary' value='Create Product' />
      </form>
    );
  };

  return (
    <Layout
      title='Add a new product'
      className='container-fluid'
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showLoading()}
          {showError()}
          {showSuccess()}
          {newProductForm()}
        </div>
      </div>
      {goToDashBoard()}
    </Layout>
  );
};
