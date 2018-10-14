import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    let message = {
    message: 'Hallo, Wilkommen zu meine React App!',
    userName: 'MonsieurFluffNStuff',
    psw: true,
  }
    return (
      <div className="App">
        <h1>{message.message}</h1>
        <p>Wilkommen {message.userName}, haben Sie eine Guten Tag</p>
        <p> Your password is {message.psw}</p>
      </div>
    );
  }
}

export default App;
