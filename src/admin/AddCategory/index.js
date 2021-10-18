import React, { useCallback, useState } from 'react';
import Layout from '../../core/Layout';
import { isAuthenticated } from '../../auth';
import { createCategory } from '../../common/api';
import './index.css';
import { Link } from 'react-router-dom';

export const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = useCallback((e) => {
    setError('');
    setName(e.target.value);
  }, []);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      setSuccess(false);

      createCategory({ userId: user._id, token, category: name }).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError('');
          setSuccess(true);
        }
      });
    },
    [name, token, user._id]
  );

  const showSuccess = useCallback(() => {
    if (success) {
      return <h3 className='text-success'>{name} is created</h3>;
    }
  }, [name, success]);

  const showError = useCallback(() => {
    if (error) {
      return <h3 className='text-danger'>{name} should be unique</h3>;
    }
  }, [name, error]);

  const goToDashBoard = useCallback(() => {
    return (
      <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>
          Back to Dashboard
        </Link>
      </div>
    );
  }, []);

  const newCategoryForm = () => {
    return (
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input type='text' className='form-control' value={name} onChange={handleChange} autoFocus />
        </div>
        <input type='submit' className='btn btn-outline-primary' value='Create Category' />
      </form>
    );
  };

  return (
    <Layout
      title='Add a new category'
      className='container-fluid'
      description={`G'day ${user.name}, ready to add a new category?`}
    >
      {showError()}
      {showSuccess()}
      <div className='row'>
        <div className='col-md-8 offset-md-2'>{newCategoryForm()}</div>
      </div>
      {goToDashBoard()}
    </Layout>
  );
};
