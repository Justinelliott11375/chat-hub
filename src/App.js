import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCpiPyD-5MvNFyMRI6H6pGn7UbTMPnYvQY",
    authDomain: "chat-hub-65a65.firebaseapp.com",
    databaseURL: "https://chat-hub-65a65.firebaseio.com",
    projectId: "chat-hub-65a65",
    storageBucket: "chat-hub-65a65.appspot.com",
    messagingSenderId: "946230590935",
    appId: "1:946230590935:web:77bcdcb95a523abfed5f92",
    measurementId: "G-TY8K7E1T7N"
  };
  firebase.initializeApp(firebaseConfig);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {}, activeUser: null
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room}, () => console.log("Active room:", this.state.activeRoom));
  }


  setUser(user) {
    this.setState({activeUser: user});
  }

  render() {
    return (
      <div className="App">

        <main>
          <User firebase={firebase} setUser={this.setUser} activeUser={this.state.activeUser}/>
          <RoomList firebase={ firebase } setActiveRoom={ (room) => this.setActiveRoom(room) } activeRoom={this.state.activeRoom}/>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} activeUser={this.state.activeUser}/>
        </main>
      </div>
    );
  }
}

export default App;
