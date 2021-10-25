import { useMemo } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../../auth';
import { itemTotal } from '../../common/utils/cartHelpers';
import './index.css';

const Menu = ({ history }) => {
  const { user } = isAuthenticated();

  const isAdmin = useMemo(() => user?.role === 1, [user?.role]);

  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/'>
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/shop'>
          Shop
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/cart'>
          Cart
          <sup>
            <small className='cart-badge'>{itemTotal()}</small>
          </sup>
        </NavLink>
      </li>

      {!user ? (
        <>
          <li className='nav-item'>
            <NavLink className='nav-link' exact activeClassName='is-active' to='/signin'>
              Signin
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' exact activeClassName='is-active' to='/signup'>
              Signup
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className='nav-item'>
            <NavLink
              className='nav-link'
              exact
              activeClassName='is-active'
              to={(isAdmin ? '/admin' : '/user') + '/dashboard'}
            >
              Dashboard
            </NavLink>
          </li>
          <li className='nav-item'>
            <span
              className='nav-link signout'
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Signout
            </span>
          </li>
        </>
      )}
    </ul>
  );
};

export default withRouter(Menu);
