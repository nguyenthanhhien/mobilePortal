import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route, BrowserRouter, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/utils/privateRoute';
import Login from './components/login/login';
import Home from './components/home';
import SignIn from './components/signIn/signIn/signIn';

const DefaultContainer = () => (
  <div>
    <div className="container">
      <Route path="/home" component={Home} />
    </div>
  </div>
)

class App extends Component {


  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <PrivateRoute exact isSignedIn={true} component={DefaultContainer} />
            <Route render={() => <div>404 Page Not Found</div>} /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
