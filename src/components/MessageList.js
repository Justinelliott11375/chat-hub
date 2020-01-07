import React, {
    Component
  } from 'react';
  
  class MessageList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [],
        content: "",
        username: "",
        sentAt: "",
        roomId: ""
      };
      this.messageRef = this.props.firebase.database().ref('messages');
      this.createMessage = this.createMessage.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.timeStampConverter = this.timeStampConverter.bind(this);
    };
  
    componentDidMount() {
      this.messageRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({
          messages: this.state.messages.concat(message)
        });
      });
    }
  
    timeStampConverter(timeStamp) {
      return new Date(timeStamp);
    }
    createMessage(e) {
      console.log('createMessage fired');
      e.preventDefault();
      if(this.state.username === undefined) {
        this.messageRef.push({
          content: this.state.content,
          username: "Guest",
          sentAt: this.state.sentAt,
          roomId: this.state.roomId.key
        });
      } else {
        this.messageRef.push({
          content: this.state.content,
          username: this.state.username,
          sentAt: this.state.sentAt,
          roomId: this.state.roomId.key
        });
      }
      this.setState({
        content: "",
        username: "",
        sentAt: "",
        roomId: "",
      })
    }
  
    handleChange(e) {
      if (this.props.activeUser === null) {
        alert("You must sign in to send messages!")
      } else {
        e.preventDefault();
        this.setState({
          username: this.props.activeUser.displayName,
          content: e.target.value,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          roomId: this.props.activeRoom
        })
      }
    }
  
    render() {
      const messageList = (this.state.messages.map((message) => {
        if (message.roomId === this.props.activeRoom.key) {
          return <div key={message.key}> {message.username}: {message.content} </div>
        }
        return null;
      }));
  
      return (
        <section className="activeMessageList">
          <div className="messageListText"> {messageList}
          </div>
          <form id="messageBar" onSubmit={this.createMessage}>
            <input id="messageField" type="text" value={this.state.content} onChange={this.handleChange}>
            </input>
            <input class="buttons" type="submit" value="Send">
            </input>
          </form>
        </section>
      );
    }
  };
  export default MessageList; 