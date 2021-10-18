import React, { useMemo } from 'react';
import Layout from '../../core/Layout';
import { Card } from '../../common/Card';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const userInformation = useMemo(
    () => [
      {
        content: name,
      },
      {
        content: email,
      },
      {
        content: 'User',
      },
    ],
    [email, name]
  );
  const purchaseHistory = useMemo(
    () => [
      {
        content: 'history',
      },
    ],
    []
  );

  const userLinks = useMemo(
    () => [
      {
        content: (
          <Link className='nav-link' to='/cart'>
            My Cart
          </Link>
        ),
      },
      {
        content: (
          <Link className='nav-link' to='/profile/update'>
            Update Profile
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
          <Card listName='Purchase History' listItems={purchaseHistory}></Card>
        </div>
        <div className='col-9'>
          <Card listName='User Information' listItems={userInformation}></Card>
          <Card listName='User Links' listItems={userLinks}></Card>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
