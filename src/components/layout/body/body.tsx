import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, RouteProps } from 'react-router-dom';
import './body.scss'
import Home from '../../home';
import Login from '../../login';
import PrivateRoute from '../../utils/privateRoute';
export default class Body extends Component {
  render() {
    let a = false
    return (
      
      <div className="page-body">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" isSignedIn={true} component={Home} />
            <Route render={() => <div>404 Page Not Found</div>} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}

