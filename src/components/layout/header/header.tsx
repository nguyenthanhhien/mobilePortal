import React, {Component} from 'react';
import './header.scss'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
export default class Header extends Component {
  render() {    
    return (
      <div className="page-header">
        <Router>
          <div className="container-fluid">
            <div className="row">
            <div className="Body-left col-lg-3 col-sm-12">
                {/* <ul>
                  <li><Link to="/jquery">Demo Jquery</Link></li>
                  <li><Link to="/bootstrap">Demo Bootstrap</Link></li>
                  <li><Link to="/reactstrap">Demo Reactstrap</Link></li>
                  <li><Link to="/react-router">Demo React Router</Link></li>
                  <li><Link to="/react-loadable">Demo react-loadable</Link></li>
                  <li><Link to="/react-reveal">Demo react-reveal</Link></li>
                  <li><Link to="/react-scrollchor">Demo react-scrollchor</Link></li>
                  <li><Link to="/redux">Demo Redux</Link></li>
                  <li><Link to="/animate-css">Demo animate.css</Link></li>
                  <li><Link to="/react-table">Demo react-table</Link></li>
                  <li><Link to="/link-not-found">Go to link not found</Link></li>
                </ul> */}
              </div>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}