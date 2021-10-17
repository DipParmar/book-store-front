import { NavLink, withRouter } from 'react-router-dom';
import './index.css';

const Menu = () => {
  return (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/'>
          Home
        </NavLink>
      </li>{' '}
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/signin'>
          Signin
        </NavLink>
      </li>{' '}
      <li className='nav-item'>
        <NavLink className='nav-link' exact activeClassName='is-active' to='/signup'>
          Signup
        </NavLink>
      </li>
    </ul>
  );
};

export default withRouter(Menu);
