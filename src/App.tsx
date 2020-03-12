import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route, BrowserRouter, Link, BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/utils/privateRoute';
import SignIn from './components/signIn/signIn';
import NavMenu from './components/navMenu/navMenu';
import Layout from './components/layout/layout'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer
          position="top-right"
          transition={Slide}
          autoClose={false}
        />
        <Router>
          <Switch>
            <Route path="/login" component={SignIn} />
            <PrivateRoute path="/dealers" exact isSignedIn={true} component={Layout} />

            <Route render={() => <div>404 Page Not Found</div>} />
          </Switch>
        </Router>
        {/* </ToastProvider> */}
      </div>
    );
  }
}

export default App;
