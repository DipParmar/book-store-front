import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component></Component>
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    ></Route>
  );
};

export const UnAuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated() ? <Component></Component> : props.history.goBack())}
    ></Route>
  );
};
