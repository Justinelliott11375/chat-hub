import React, { Component } from 'react';
import './../App.css'
//import Button from 'react-bootstrap/Button';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [], newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomName;
    this.roomsRef.push({
      name: newRoomName/* createDate: Date.now() , from exercise with mentor, leaving in code for reference */
    });
    this.setState({ newRoomName: ""})
  }

  deleteRoom(deleteKey, deleteName) {
    const deletingRoom = this.roomsRef.child(deleteKey);
    deletingRoom.remove(function(error) {
      alert(error ? "failed" : deleteName
      + " successfully deleted!")
    });
    this.props.setActiveRoom("")
    console.log("delete fired")
    const otherRooms= this.state.rooms.filter(room => room.key !== deleteKey);
      this.setState({ rooms: otherRooms});

  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  roomChange (room) {
    this.props.setActiveRoom(room);

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room )});
    });
  }


  render() {
    return (
      <section className="roomList">
        <div className="activeRoom">Active Room: {this.props.activeRoom.name === (null || undefined) ? "No room currently selected" : this.props.activeRoom.name}</div>
        <div id="roomContainer">
        <div>Available rooms:</div>
        {
          this.state.rooms.map((room, index) =>
        <div id="roomsClickable" onClick={() => this.roomChange(room)} key={index}>{room.name}
        </div>
          )
        }
         </div>
        <form id="createRoom" onSubmit={ (e) => this.createRoom(e)}>
        <button onClick={() => this.deleteRoom(this.props.activeRoom.key, this.props.activeRoom.name)}>Delete active room</button>
          <p id="create-room-p">Create new room:</p>
          <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
          <input type="submit" value="Create"></input>
        </form>
      </section>
    );
  }
};

export default RoomList;
