import React, {Component} from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
interface PrivateRouteProps extends RouteProps {
  component: any;
  isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isSignedIn, ...rest } = props;

  return (
      <Route
          {...rest}
          render={(props) =>
              isSignedIn ? (
                  <Component {...props} />
              ) : (
                      <Redirect
                          to={{
                              pathname: '/login',
                              state: { from: props.location }
                          }}
                      />
                  )
          }
      />
  );
};

export default PrivateRoute;