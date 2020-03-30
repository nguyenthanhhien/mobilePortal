import React, {Component} from 'react';
import {
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import { pages } from './../utils/page'
interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
      <Route
          {...rest}
          render={(props) =>
            sessionStorage.getItem('Authdata') ? (
                  <Component {...props} />
              ) : (
                      <Redirect
                          to={{
                              pathname: pages.Login,
                              state: { from: props.location }
                          }}
                      />
                  )
          }
      />
  );
};

export default PrivateRoute;