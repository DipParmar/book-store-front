import { NavLink, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../../auth';
import './index.css';

const Menu = ({ history }) => {
  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/'>
          Home
        </NavLink>
      </li>

      {!isAuthenticated() ? (
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
        <li className='nav-item'>
          <span
            className='nav-link signout'
            exact
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );
};

export default withRouter(Menu);
