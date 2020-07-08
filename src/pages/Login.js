import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';

// Icons
import { FaLockOpen } from 'react-icons/fa';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    const { email, password } = this.state;
    try {
      await signin(email, password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <div className="login py-4">
          <div className="container">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto text-center">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <h1>
                  Login to <Link to="/">Chatty</Link>
                </h1>
                <p>Fill in the form below to login to your account.</p>
                <div className="form-group">
                  <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    value={email}
                    autoComplete="current-username"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                    autoComplete="current-password"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  {this.state.error ? (
                    <div className="error">{this.state.error}</div>
                  ) : null}
                  <button type="submit" className="btn btn-primary btn-block">
                    <FaLockOpen /> Login
                  </button>
                </div>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
