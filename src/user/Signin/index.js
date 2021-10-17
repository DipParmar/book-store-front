import { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../core/Layout';
import { APP_NAME } from '../../config';
import { signin, authenticate } from '../../auth';

import './index.css';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'parmar.dpp@gmail.com',
    password: '12345678',
    error: '',
    loading: false,
    redirectToReferrer: false,
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
      const { email, password } = values;
      setValues({ ...values, error: '', loading: true });
      const response = await signin({ email, password });

      if (response.error) {
        setValues((values) => {
          return { ...values, error: response.error, loading: false };
        });
      } else {
        authenticate(response, () => {
          setValues((values) => ({
            ...values,
            error: '',
            loading: false,
            redirectToReferrer: true,
          }));
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

  const showLoading = useCallback(() => {
    return (
      <div className='alert alert-info' style={{ display: values.loading ? '' : 'none' }}>
        <h2>Loading....</h2>
      </div>
    );
  }, [values.loading]);

  const redirectUser = useCallback(() => {
    if (values.redirectToReferrer) {
      return <Redirect to='/'></Redirect>;
    }
  }, [values.redirectToReferrer]);

  const signInForm = useCallback(() => {
    return (
      <form>
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
  }, [handleChange, submitHandler, values.email, values.password]);

  return (
    <Layout title='Signin' description={`Signin to ${APP_NAME}`} className='container col-md-8 offset-md-2'>
      {showLoading()}
      {showError()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
