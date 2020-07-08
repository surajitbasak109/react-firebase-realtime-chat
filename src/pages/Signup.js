import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle, signInWithGithub } from '../helpers/auth';

import { FaKey, FaGoogle, FaGithub } from 'react-icons/fa';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.githubSignIn = this.githubSignIn.bind(this);
  }
  componentDidMount() {}

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async githubSignIn() {
    try {
      await signInWithGithub();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div className="signup py-4">
        <div className="container">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto text-center">
            <form onSubmit={this.handleSubmit}>
              <h1>
                Sign Up to <Link to="/">Chatty</Link>
              </h1>
              <p>Fill in the form below to create an account</p>
              <div className="form-group">
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
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
                  value={this.state.password}
                  autoComplete="current-password"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                {this.state.error ? (
                  <div className="error">{this.state.error}</div>
                ) : null}
                <button type="submit" className="btn btn-info btn-block">
                  <FaKey /> Signup
                </button>
              </div>
              <div className="form-group">
                <p>Or</p>
                <button
                  onClick={this.googleSignIn}
                  type="button"
                  className="btn btn-danger btn-block"
                >
                  <FaGoogle /> Sign up with Google
                </button>
                <button
                  onClick={this.githubSignIn}
                  type="button"
                  className="btn btn-primary btn-block"
                >
                  <FaGithub /> Sign up with Github
                </button>
              </div>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
