import React, {Component} from 'react';
// import logo from './logo.svg';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import './App.scss';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Body from './components/layout/body';

class App extends Component {


  render() {
    
    return (
      <div className="App">
        {/* <Header /> */}
        <Body />
        {/* <Footer /> */}
        
      </div>
    );
  }
}

export default App;
