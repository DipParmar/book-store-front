import React, { useMemo } from 'react';
import Layout from '../../core/Layout';
import { Card } from '../../common/Card';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminInformation = useMemo(
    () => [
      {
        content: name,
      },
      {
        content: email,
      },
      {
        content: role === 1 ? 'Admin' : 'User',
      },
    ],
    [email, name, role]
  );

  const adminLinks = useMemo(
    () => [
      {
        content: (
          <Link className='nav-link' to='/create/category'>
            Create Category
          </Link>
        ),
      },
      {
        content: (
          <Link className='nav-link' to='/create/product'>
            Create Product
          </Link>
        ),
      },
    ],
    []
  );
  return (
    <Layout title='Dashboard' className='container-fluid' description={`G'day ${name}`}>
      <div className='row'>
        <div className='col-3'>
          <Card listName='Admin Links' listItems={adminLinks}></Card>
        </div>
        <div className='col-9'>
          <Card listName='Admin Information' listItems={adminInformation}></Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
