import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthenticatedRoute, UnAuthenticatedRoute } from './auth/customRoutes';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Dashboard from './user/UserDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <UnAuthenticatedRoute path='/signin' exact component={Signin} />
        <UnAuthenticatedRoute path='/signup' exact component={Signup} />
        <AuthenticatedRoute path='/dashboard' exact component={Dashboard}></AuthenticatedRoute>
        <Route path='*' exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
