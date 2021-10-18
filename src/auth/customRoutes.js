import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '.';

export const UserRoute = ({ component: Component, ...rest }) => {
  const { user } = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.role === 0 ? (
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
      render={(props) =>
        !isAuthenticated() ? (
          <Component></Component>
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: {
                from: props.location,
              },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { user } = isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        user?.role === 1 ? (
          <Component></Component>
        ) : (
          <Redirect
            to={{
              pathname: '/home',
              state: {
                from: props.location,
              },
            }}
          ></Redirect>
        )
      }
    ></Route>
  );
};
