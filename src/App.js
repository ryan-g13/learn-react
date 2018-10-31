import React, { Component } from 'react';
// import logo from './logo.svg';
// import Search from './Search';
// import Table from './Table';
// import Button from './Button';
// import Message from './Message';

import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = 25;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      termSearched: DEFAULT_QUERY,
      message: {
        greeting: 'Hallo, Wilkommen zu meine React App!',
        userName: 'MonsieurFluffNStuff',
        psw: true,
      },
    }
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    }

    // +------------------------------------------------------------------------------------------+
    // Methods 
    // +------------------------------------------------------------------------------------------+
    onDismiss(id) {
      const updatedList = element => element.objectID !== id;
      const updatedHits = this.state.result.hits.filter(updatedList);
      this.setState({ 
        result: { ...updatedHits, hits: updatedHits }
      });
    }

    onSearchFieldChange(event) {
      this.setState({ termSearched: event.target.value })
    }

    onSearchSubmit(event) {
      const { termSearched } = this.state;
      this.fetchSearchTopStories(termSearched);
      event.preventDefault();
    }
    
    setSearchTopStories(result) {
      const { hits, page } = result;
      const previousHits = page !== 0 ? this.state.result.hits : [];
      const updatedHits = [...previousHits, ...hits];
      
      this.setState({ 
        result: { hits: updatedHits, page } 
      });
    }

    componentDidMount() {
      const { termSearched } = this.state;
      this.fetchSearchTopStories(termSearched);
    }

    fetchSearchTopStories(termSearched, page = 0) {
      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${termSearched}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
        .then(response => response.json())
        .then(data => this.setSearchTopStories(data))
        .catch(error => error);
    }

    // +------------------------------------------------------------------------------------------+
    // Rendering Application component to DOM 
    // +------------------------------------------------------------------------------------------+
  render() {
    const { message, result, termSearched } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="page">
        <div className="interactions" >
          <Message 
            content={message}
          />
          <Search 
              value={termSearched}
              onChange={this.onSearchFieldChange} 
              onSubmit={this.onSearchSubmit}
            >
            Enter your search term
          </Search>
        </div>
          { result ? <Table 
            list={result.hits}
            // pattern={termSearched}
            onDismiss={this.onDismiss}
          /> 
          : null }
          <div className="interactions" >
            <button onClick={() =>  this.fetchSearchTopStories(termSearched, page + 1) }>
              More
            </button>
          </div>
      </div>
    );
  }
}

// +------------------------------------------------------------------------------------------+
// Components both Class extensions and functional components(stateless) 
// +------------------------------------------------------------------------------------------+

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
    const { list, onDismiss } = this.props;
    return (
      <div className='table'>
        <h2>Results</h2>
          { list.map(element => {
            return <div key={element.objectID} className='table-row'>
            <span style={{ width: '35%' }} > Title: <a href={element.url}>{element.title}</a></span>
            <span style={{ width: '30%' }} > Author: {element.author}</span>
            <span style={{ width: '10%' }} > Comments: {element.num_comments}</span>
            <span style={{ width: '10%' }} > Points: {element.points} </span>
            <span style={{ width: '10%' }} > 
              <Button
                onClick={() => onDismiss(element.objectID)}
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

const Search = ({value, onChange, children, onSubmit }) => 
    <form onSubmit={onSubmit}>
      { children } 
      <input 
        type='text'
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        { children }
      </button>
    </form>

export default App;
