import React, { Component } from 'react';
import './chat.css';
import { auth, db } from '../services/firebase';

// components
import UserInfo from '../components/UserInfo';
import ChatMessage from '../components/ChatMessage';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: auth().currentUser,
      chats: [],
      content: '',
      readError: '',
      writeError: '',
      showMenu: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
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

  toggleMenu(event) {
    this.setState({ showMenu: !this.state.showMenu });
  }

  render() {
    const { user, showMenu } = this.state;
    // console.log(user);
    return (
      <div
        className="chat-window"
        style={{
          transform: 'scaleX(1)',
        }}
      >
        <div className="chat-background"></div>
        {/* Current User information */}
        <UserInfo
          user={user}
          showMenu={showMenu}
          toggleMenu={this.toggleMenu}
        />

        {/* Chat Messages */}
        <ChatMessage chats={this.state.chats} user={user} />
        <div className="dax1c" style={{ height: '0px' }}></div>
        {this.state.writeError ? (
          <div className="error-container">{this.state.writeError}</div>
        ) : null}

        {/* message form */}
        <footer className="chat-form">
          <div className="chat-form-wrap">
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrap">
                <input
                  onChange={this.handleChange}
                  value={this.state.content}
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your message"
                  className="chat-input"
                />
              </div>
            </form>
          </div>
          <div className="extra-space"></div>
        </footer>
      </div>
    );
  }
}
