import Menu from '../Menu';

import './index.css';

const Layout = ({ title = 'Title', description = 'Description', className, children }) => {
  return (
    <>
      <Menu />
      <div className='jumbotron'>
        <h2>{title}</h2>
        <p className='lead'>{description}</p>
      </div>
      <div {...{ className }}>{children}</div>
    </>
  );
};

export default Layout;
