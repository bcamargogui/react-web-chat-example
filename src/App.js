import React from 'react';
// RCE CSS
import 'react-chat-elements/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageList from './components/MessageList';
import InputBar from './components/InputBar';
import './App.css';
import { messages as mockedMessages } from './data';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { addUser, addMessage } from './store/actions';
import MyProfile from './components/MyProfile';
import socketIOClient from "socket.io-client";

const mapStateToProps = ({ core: { messages, username, avatar } }) => ({ messages, username, avatar });

const mapActionsToProps = dispatch => ({
  addMessage: (message) => dispatch(addMessage(message)),
  addUser: (user) => dispatch(addUser(user)),
})

class App extends React.Component {
  socket = socketIOClient(process.env.REACT_APP_SOCKET_URL);

  async componentDidMount() {
    // add myself to list of users
    const { username, avatar } = this.props;
    const user = { name: username, image: avatar };

    // socket events
    this.socket.emit('guest.new', user);
    this.socket.on('message.show', this.receiveNewMessage);
    this.socket.on('guest.show', this.receiveNewUser);
  }
  receiveNewMessage = msg => this.props.addMessage(msg);

  receiveNewUser = user => this.props.addUser(user);

  onSubmitMessage = (text) => {
    const { username } = this.props;
    const payload = { text, sender: username };
    this.socket.emit('message.new', payload);
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="App">
        <Container>
          <MyProfile />
          <MessageList data={messages} />
          <InputBar onSubmit={this.onSubmitMessage} />
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(App);
