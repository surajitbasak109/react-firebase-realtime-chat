import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <div className="home d-flex align-items-center justify-content-center min-vh-100 flex-column">
        <div className="d-flex justify-content-center align-items-center text-center">
          <h1 className="display-4 order-1">Welcome to Chatty</h1>
        </div>
        <div className="order-2 mt-2">
          <Link to="/login" className="btn btn-info btn-flat">
            Let's Start
          </Link>
        </div>
      </div>
    );
  }
}
