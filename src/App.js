import React, { Component } from 'react';
// import logo from './logo.svg';
// import Search from './Search';
// import Table from './Table';
// import Button from './Button';
// import Message from './Message';

import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      termSearched: DEFAULT_QUERY,
      // list: [ 
      //   {
      //     title: 'REACT',
      //     url: 'https://facebook.github.io/react/',
      //     author: 'Jimmay',
      //     num_comments: 3,
      //     points: 7,
      //     objectId: 0,
      //   },
      //   {
      //     title: 'REDUX',
      //     url: 'https://github.com/reactjs/redux',
      //     author: 'Danjamin',
      //     num_comments: 1,
      //     points: 5,
      //     objectId: 1,
      //   }
      // ],
      message: {
        greeting: 'Hallo, Wilkommen zu meine React App!',
        userName: 'MonsieurFluffNStuff',
        psw: true,
      },
    }
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
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
    
    setSearchTopStories(results) {
      this.setState({ results });
    }

    componentDidMount() {
      const { termSearched } = this.state;

      fetch(url)
        .then(response => response.json())
        .then(data => this.setSearchTopStories(data))
        .catch(error => error);
    }
    // +------------------------------------------------------------------------------------------+
    // Rendering Application component to DOM 
    // +------------------------------------------------------------------------------------------+
  render() {
    const { message, results, termSearched } = this.state;

    if(!results) { return null; }

    return (
      <div className="page">
        <div className="interactions" >
          <Message 
            content={message}
          />
          <Search 
              value={termSearched}
              onChange={this.onSearchFieldChange} 
            >
            Enter your search term
          </Search>
        </div>
          <Table 
            // list={list}
            list={results.hits}
            pattern={termSearched}
            onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

const Message = ({ content }) => {
  return(
    <div className='message' >
      <h1>{content.greeting}</h1>
      <p>Wilkommen {content.userName}, haben Sie eine Guten Tag</p> 
    </div>
  )
}


class Table extends React.Component {
  render() {
    const {pattern, list, onDismiss } = this.props;
    return (
      <div className='table'>
        <h2>Results</h2>
        {list.filter(isSearched(pattern)
        ).map(element => {
            return <div key={element.objectId} className='table-row'>
            <span style={{ width: '35%' }} > Title: <a href={element.url}>{element.title}</a></span>
            <span style={{ width: '30%' }} > Author: {element.author}</span>
            <span style={{ width: '10%' }} > Comments: {element.num_comments}</span>
            <span style={{ width: '10%' }} > Points: {element.points} </span>
            <span style={{ width: '10%' }} > 
              <Button
                onClick={() => onDismiss(element.objectId)}
                // className='button-inline' // not sure about this class
              > Mark as Read
              </Button>
            </span>
            </div>
          })}
      </div>
    );
  }
}

const Button = ({ onClick, className, children }) => {
  return(
    <button 
        className={className}
        onClick={onClick}
        type="button"
      > 
      {children}
      </button>
  );
}

const Search = ({value, onChange, children }) => {
  return(
    <form>
      { children } 
      <input 
        type='text'
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

const isSearched = termSearched => item => {
    return item.title.toLowerCase().includes(termSearched.toLowerCase());
  }

export default App;
