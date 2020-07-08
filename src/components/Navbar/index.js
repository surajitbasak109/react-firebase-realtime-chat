import React from 'react';
import { auth } from '../../services/firebase';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar(props) {
  const logout = async (event) => {
    event.preventDefault();
    auth().signOut();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Chatty
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {props.authenticated ? (
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/logout"
                onClick={(e) => logout(e)}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/login"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
