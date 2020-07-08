import React, { Fragment } from 'react';
import { auth } from '../../services/firebase';
import './index.css';
// Icons
import { MdMoreVert } from 'react-icons/md';

const UserInfo = ({ user, showMenu, toggleMenu }) => {
  let displayName = user.displayName ? user.displayName : user.email;
  let avatarUrl = user.photoURL ? user.photoURL : '../../assets/avatar.png';

  const logout = async (event) => {
    event.preventDefault();
    auth().signOut();
  };

  return (
    <Fragment>
      <header className="current-user">
        <div className="user-avatar" role="button">
          <div
            className="d1"
            style={{
              height: '40px',
              width: '40px',
            }}
          >
            <img
              src={avatarUrl}
              alt=""
              draggable="false"
              className="user-avatar-img"
            />
          </div>
        </div>
        <div className="display-name" role="button">
          <div className="d1">
            <div className="d2">
              <span title={displayName} className="s3">
                {displayName}
              </span>
            </div>
          </div>
        </div>
        <div className="user-actions">
          <div className="d1">
            <div className="d2">
              <div role="button" title="Menu" onClick={() => toggleMenu()}>
                <span>
                  <MdMoreVert />
                </span>
              </div>
              <span>
                {showMenu && (
                  <div
                    className="d3"
                    tabIndex="-1"
                    style={{
                      transformOrigin: 'right top',
                      transform: 'scale(1)',
                      opacity: 1,
                    }}
                  >
                    <ul className="u1">
                      <li className="l1" tabIndex="-1">
                        <div
                          className="d4"
                          role="button"
                          onClick={(e) => logout(e)}
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default UserInfo;
