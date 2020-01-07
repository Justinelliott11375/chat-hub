import React, { Component } from 'react';

class User extends Component {

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user)
    });
  }

  handleSignIn(e) {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider);
  console.log("signed in");
  };

  handleSignOut(e) {
    this.props.firebase.auth().signOut();
    this.props.setUser(null);
    console.log("signed out")
  }

  signInAnonymous(e){
    this.props.firebase.auth().signInAnonymously()
    this.props.setUser("Guest");
  }

  
  render() {

    const userDisplayName = this.props.activeUser === (undefined || null) ? "Guest" : this.props.activeUser.displayName;

  if(this.props.activeUser === null) {
      return (
        <section className="userName">
          <div>Hello! Sign in with Google or continue as Guest</div>
          {<button type="text" onClick={() => this.handleSignIn()}>sign in with Google</button>}
          {<button type="text" onClick={() => this.signInAnonymous()}>continue as Guest</button>}
        </section>
      );
    } else if(this.props.activeUser === "Guest") {
    return (
      <section className="userName">
        <div>Hello, Guest!</div>
        {<button type="text" onClick={() => this.handleSignOut()}>sign out</button>}
      </section>
    );
    } else {
      return (
        <section className="userName">
          <div>hello, {userDisplayName}!</div>
          {<button type="text" onClick={() => this.handleSignOut()}>sign out</button>}
        </section>
      );
    }
  }
};
export default User;
 