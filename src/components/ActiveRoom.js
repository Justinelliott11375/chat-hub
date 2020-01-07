import React, { Component } from 'react';
import RoomList from './RoomList';
import MessageList from './MessageList';
import * as firebase from 'firebase';

class ActiveRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <section class="activeRoom">
        <div>Active Room: {this.props.activeRoom.name}</div>
      </section>
    );
  }
}

export default ActiveRoom;
