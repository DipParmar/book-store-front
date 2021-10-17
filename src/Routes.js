import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup/index';
import Signin from './user/Signin/index';
import Home from './core/Home/index';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' exact component={Signin} />
        <Route path='/signup' exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
