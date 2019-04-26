import React, { Component } from 'react';
import { subscribeToTimer, socket } from './api';

class App extends Component {
  
  state = {
    timestamp: 'no timestamp yet',
    message: ""
  };

  constructor(props) {
    super(props);

    subscribeToTimer((error, timestamp) => this.setState({
      timestamp
    }));

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);

    socket.on('chat message', msg => {
      console.log(msg);

      const p = document.createElement("p");
      p.append(msg);
      document.getElementById("chat").append(p);
    });
  }


  handleMessageSubmit(event) {
    event.preventDefault();
    console.log(`message: ${this.state.message}`);
    socket.emit('chat message', this.state.message);
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  render() { 
    return (
      <section className="App">
        <p className="App-intro">
          This is the timer value: { this.state.timestamp }
        </p>
        <form onSubmit={this.handleMessageSubmit}>
          <label>type a message to chat </label>
          <input
            type="text"
            value={ this.state.message }
            onChange = { this.handleMessageChange }
            name="message" />
          <input
            type="submit"
            value="Submit" />
        </form>
        <section id="chat" />
      </section>
    );
  }
}
 
export default App;