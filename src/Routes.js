import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserRoute, UnAuthenticatedRoute, AdminRoute } from './auth/customRoutes';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import { AddCategory } from './admin/AddCategory';
import { AddProduct } from './admin/AddProduct';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={Home} />
        <UnAuthenticatedRoute path='/signin' exact component={Signin} />
        <UnAuthenticatedRoute path='/signup' exact component={Signup} />
        <UserRoute path='/user/dashboard' exact component={UserDashboard}></UserRoute>
        <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}></AdminRoute>
        <AdminRoute path='/admin/create/category' exact component={AddCategory}></AdminRoute>
        <AdminRoute path='/admin/create/product' exact component={AddProduct}></AdminRoute>
        <Route path='*' component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
