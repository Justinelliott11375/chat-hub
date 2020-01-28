import React, { Component } from 'react';
import './../App.css'
import { Dropdown, Button} from 'react-bootstrap';


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
      name: newRoomName
    });
    this.setState({ newRoomName: ""})
  }

  deleteRoom(deleteKey, deleteName) {
    if(deleteKey === undefined) {
      alert("No room currently selected");
    } else {
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
    let width = window.innerWidth;
    if(width <= 480) {
      return (
        <div id="headerMenuMobile">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          Current: {this.props.activeRoom.name === (null || undefined) ? "None" : this.props.activeRoom.name}
          </Dropdown.Toggle>
        <Dropdown.Menu id="dropdown-basic-button" title="Change Room">
        {
            this.state.rooms.map((room, index) =>
            <Dropdown.Item>
            <div id="roomsClickable" onClick={() => this.roomChange(room)} key={index}>{room.name}
           </div>
           </Dropdown.Item>
            )
          }
      </Dropdown.Menu>
      </Dropdown>
      <Button className="buttons" variant="primary" onClick={() => this.deleteRoom(this.props.activeRoom.key, this.props.activeRoom.name)}>Delete active room</Button>
      <div id="createRoomMobile">
          <form id="createRoomForm" onSubmit={ (e) => this.createRoom(e)}>
            <input type="text" placeholder="Create room" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
            <input className="buttons" type="submit" value="Create"></input>
          </form>
          </div>
      </div>
        /* <nav role="navigation">
          <ul>
            <li><div id="activeRoomMobile">Active Room: {this.props.activeRoom.name === (null || undefined) ? "None" : this.props.activeRoom.name}</div>
              <ul class="dropdown">
              {
            this.state.rooms.map((room, index) =>
            <li>
            <div id="roomsClickable" onClick={() => this.roomChange(room)} key={index}>{room.name}
           </div>
           </li>
            )
          }
              </ul>
            </li>
          </ul>
        </nav>
        */
      )
    } else {
      return (
        <section className="roomList">
          <div className="activeRoom">Active Room: {this.props.activeRoom.name === (null || undefined) ? "None" : this.props.activeRoom.name}</div>
          <div id="roomContainer">
          <div>Available rooms:</div>
          {
            this.state.rooms.map((room, index) =>
          <div id="roomsClickable" onClick={() => this.roomChange(room)} key={index}>{room.name}
          </div>
            )
          }
          </div>
          <div id="createRoom">
          <button className="buttons" onClick={() => this.deleteRoom(this.props.activeRoom.key, this.props.activeRoom.name)}>Delete active room</button>
          <form id="createRoomForm" onSubmit={ (e) => this.createRoom(e)}>
            <p id="create-room-p">Create new room:</p>
            <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
            <input className="buttons" type="submit" value="Create"></input>
          </form>
          </div>
        </section>
      );
    }
  }
};

export default RoomList;
