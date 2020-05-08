import React, { Component, useState } from 'react';
// import logo from './logo.svg';
import { Switch, Route, Redirect, BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/utils/privateRoute';
import SignIn from './components/signIn/signIn';
import NavMenu from './components/navMenu/navMenu';
import Layout from './components/layout/layout'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { pages } from './components/utils/page'
import Spinner from './components/spinner/spinner'
import LoadingProvider from './components/loadingProvider/loadingProvider'
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif'
    ].join(','),
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>

      <div className="App">
        <ToastContainer
          position="top-right"
          transition={Slide}
          autoClose={false}
        />
        <LoadingProvider>
          <Spinner />
          <Router basename={process.env.REACT_APP_BASENAME}>
            <Switch>
              <Redirect from="/" exact={true} to={pages.DealerManagement} />
              <Route path={pages.Login} component={SignIn} />
              <PrivateRoute path={pages.DealerManagement} component={Layout} />
            </Switch>
          </Router>
        </LoadingProvider>
      </div>
    </ThemeProvider>

  );
}

export default App;
