import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      termSearched: '',
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
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);

    }
    // +------------------------------------------------------------------------------------------+
    // Methods 
    // +------------------------------------------------------------------------------------------+
    onDismiss(id) {
      const updatedList = this.state.list.filter(element => {
        return element.objectId !== id;
      })
      this.setState({ list: updatedList });
    }

    onSearchFieldChange(event) {
      this.setState({ termSearched: event.target.value })
    }
    
    // +------------------------------------------------------------------------------------------+
    // Rendering Application component to DOM 
    // +------------------------------------------------------------------------------------------+
  render() {
    return (
      <div className="App">
        <h1>{this.state.message.greeting}</h1>
        <p>Wilkommen {this.state.message.userName}, haben Sie eine Guten Tag</p>
        <form>
          <input type='text' 
            onChange={this.onSearchFieldChange}
          />
        </form>
        <ul>
          {this.state.list.filter(isSearched(this.state.termSearched)
            // item => 
            // this.state.termSearched === '' ? item : item.title.toLowerCase() === this.state.termSearched.toLowerCase()

            ).map(element => {
            return <li key={element.objectId}>
            <span>Title: <a href={element.url}>{element.title}</a></span>
            <span> Author: {element.author}</span>
            <span> Comments: {element.num_comments}</span>
            <span> Points: {element.points} </span>
            <span> 
              <button
                onClick={() => this.onDismiss(element.objectId)}
              > Mark as Read
              </button>
            </span>
            </li>
          })}
        </ul>
      </div>
    );
  }
}

const isSearched = termSearched => item => {
    return item.title.toLowerCase().includes(termSearched.toLowerCase());
  }

export default App;
