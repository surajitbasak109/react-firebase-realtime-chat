import React, { Component } from 'react';

import { auth } from './services/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

// Components
import { PrivateRoute, PublicRoute } from './components/Routes';
// import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';

class App extends Component {
  constructor() {
    super();

    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }

  render() {
    return this.state.loading ? (
      <h2>Loading...</h2>
    ) : (
      <Router>
        {/* <Navbar authenticated={this.state.authenticated} /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            path="/chat"
            authenticated={this.state.authenticated}
            component={Chat}
          />
          <PublicRoute
            path="/signup"
            authenticated={this.state.authenticated}
            component={Signup}
          />
          <PublicRoute
            path="/login"
            authenticated={this.state.authenticated}
            component={Login}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
