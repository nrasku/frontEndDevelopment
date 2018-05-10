import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home';
import CustomersPage from './components/CustomersPage'
import ClassPage from './components/ClassPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigation />
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              Please select a service from the above navigation
            </p>
            { this.props.children }
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/customers" component={CustomersPage} />
              <Route exact path="/classes" component={ClassPage} />
              <Route render={() => <h1>404 Page Not Found.</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
