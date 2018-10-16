import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [ 
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
      ],
      message: {
        greeting: 'Hallo, Wilkommen zu meine React App!',
        userName: 'MonsieurFluffNStuff',
        psw: true,
      },
    }
  }
  render() {

    return (
      <div className="App">
        <h1>{this.state.message.greeting}</h1>
        <p>Wilkommen {this.state.message.userName}, haben Sie eine Guten Tag</p>
        <ul>
          {this.state.list.map(element => {
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
