import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {

    const list = [ 
      {
        title: 'REACT',
        url: 'https://facebook.github.io/react/',
        author: 'Jimmay',
        num_comments: 3,
        points: 7,
        objectId: 0,
      },
      {
        title: 'REDUX',
        url: 'https://github.com/reactjs/redux',
        author: 'Danjamin',
        num_comments: 1,
        points: 5,
        objectId: 1,
      }
    ]

    let message = {
    message: 'Hallo, Wilkommen zu meine React App!',
    userName: 'MonsieurFluffNStuff',
    psw: true,
    }

    return (
      <div className="App">
        <h1>{message.message}</h1>
        <p>Wilkommen {message.userName}, haben Sie eine Guten Tag</p>
        <ul>
          {list.map(element => {
            return <li key={element.objectId}>
            <span>Title: <a href={element.url}>{element.title}</a></span>
            <span> Author: {element.author}</span>
            <span> Comments: {element.num_comments}</span>
            <span> Points: {element.points} </span>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
