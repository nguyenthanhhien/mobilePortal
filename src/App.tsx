import React, { Component } from 'react';
// import logo from './logo.svg';
import { Switch, Route, BrowserRouter, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import PrivateRoute from './components/utils/privateRoute';
import SignIn from './components/signIn/signIn';
import "./styles/variables.scss";
import Sidebar from './components/sideBar/sideBar';
const MainContainer = () => (
  <div className="container">
    <Sidebar />
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <PrivateRoute exact isSignedIn={true} component={MainContainer} />
            <Route render={() => <div>404 Page Not Found</div>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
