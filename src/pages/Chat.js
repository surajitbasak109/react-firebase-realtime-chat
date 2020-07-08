import React, { Component } from 'react';
import './chat.css';
import { auth, db } from '../services/firebase';
import Moment from 'react-moment';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: '',
      writeError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    this.setState({ readError: null });

    try {
      db.ref('chats').on('value', (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        this.setState({ chats });
      });
    } catch (error) {
      this.setState({ readError: error.message });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ writeError: null });

    try {
      await db.ref('chats').push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
      });

      this.setState({ content: '' });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="chat-window py-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="user-info">
                <div>
                  Logged in as: <strong>{this.state.user.email}</strong>
                </div>
              </div>
              <div className="chats">
                {this.state.chats.map((chat) => {
                  return (
                    <div
                      className={`chat-message ${
                        chat.uid === user.uid ? 'message-out' : 'message-in'
                      }`}
                      key={chat.timestamp}
                    >
                      <div className="chat-wrap">
                        <div className="chat-container">
                          <span className="message-text">{chat.content}</span>
                          <span className="message-time">
                            <Moment fromNow>{chat.timestamp}</Moment>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-12">
            {/* message form */}
            <div className="chat-form">
              <form onSubmit={this.handleSubmit}>
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    onChange={this.handleChange}
                    value={this.state.content}
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your message"
                    className="form-control input-flat"
                  />
                  {this.state.writeError ? this.state.writeError : null}

                  <button type="submit" className="btn btn-info btn-flat">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
