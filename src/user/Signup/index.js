import Layout from '../../core/Layout';
import { API } from '../../config';

import './index.css';

const Signup = () => {
  return (
    <Layout title='Signup' description='Signup to Book Store'>
      {API}
    </Layout>
  );
};

export default Signup;
