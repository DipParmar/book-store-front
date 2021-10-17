import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../core/Layout';
import { APP_NAME } from '../../config';
import { signup } from '../../auth';

import './index.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const handleChange = useCallback(
    (name) => (event) => {
      setValues((values) => {
        return { ...values, error: false, [name]: event.target.value };
      });
    },
    []
  );

  const submitHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, email, password } = values;
      const response = await signup({ name, email, password });

      if (response.error) {
        setValues((values) => {
          return { ...values, error: response.error, success: false };
        });
      } else {
        setValues({
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    },
    [values]
  );

  const showError = useCallback(() => {
    return (
      <div className='alert alert-danger' style={{ display: values.error ? '' : 'none' }}>
        {values.error}
      </div>
    );
  }, [values.error]);

  const showSuccess = useCallback(() => {
    return (
      <div className='alert alert-info' style={{ display: values.success ? '' : 'none' }}>
        New account is created. Please <Link to='/signin'>Signin</Link>
      </div>
    );
  }, [values.success]);

  const signUpForm = useCallback(() => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input onChange={handleChange('name')} value={values.name} type='text' className='form-control' />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input onChange={handleChange('email')} value={values.email} type='email' className='form-control' />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input onChange={handleChange('password')} value={values.password} type='password' className='form-control' />
        </div>
        <input onClick={submitHandler} type='submit' className='btn btn-primary' value='Submit' />
      </form>
    );
  }, [handleChange, submitHandler, values.email, values.name, values.password]);

  return (
    <Layout title='Signup' description={`Signup to ${APP_NAME}`} className='container col-md-8 offset-md-2'>
      {showSuccess()}
      {showError()}
      {!values.success && signUpForm()}
    </Layout>
  );
};

export default Signup;
