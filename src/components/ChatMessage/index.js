import React, { Fragment } from 'react';
import Moment from 'react-moment';
// Icons
import { FaAngleDown } from 'react-icons/fa';
import { TailIn, TailOut } from '../../components/Tail';

const ChatMessage = ({ chats, user }) => {
  return (
    <Fragment>
      <div className="chats">
        <div className="copyable-area">
          <span></span>
          <span>
            <div
              className="scroll-to-bottom"
              role="button"
              style={{
                transform: 'scaleX(1) scaleX(1)',
                opacity: 1,
              }}
            >
              <span className="sa1"></span>
              <span className="sb1">
                <FaAngleDown />
              </span>
            </div>
          </span>
          <div className="da1" tabIndex="0">
            <div className="da2"></div>
            {/* <div className="db2"></div> */}
            <div
              className="dc3"
              tabIndex="-1"
              rol="region"
              aria-label="Message list. Press right arrow key on a message to open message context menu."
            >
              {chats.map((chat) => {
                return (
                  <div
                    className={`chat-message focusable-list-item ${
                      chat.uid === user.uid ? 'message-out' : 'message-in'
                    }`}
                    key={chat.timestamp}
                  >
                    <div className="message-container">
                      <span className="tail-icon">
                        {chat.uid === user.uid ? <TailOut /> : <TailIn />}
                      </span>
                      <div className="chat-wrap">
                        <div className="chat-container">
                          <div className="copyable-text">
                            <div className="dab1">
                              <span className="message-text selectable-text invisible-space">
                                <span>{chat.content}</span>
                              </span>
                              <span className="extra-space"></span>
                            </div>
                          </div>
                          <div className="message-time">
                            <div className="db1">
                              <span dir="auto" className="sb1">
                                <Moment fromNow>{chat.timestamp}</Moment>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ChatMessage;
