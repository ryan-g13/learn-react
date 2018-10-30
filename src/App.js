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

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

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
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);

    }
    // +------------------------------------------------------------------------------------------+
    // Methods 
    // +------------------------------------------------------------------------------------------+
    onDismiss(id) {
      const updatedList = element => element.objectID !== id;
      const updatedHits = this.state.result.hits.filter(updatedList);
      // this.setState({ result: Object.assign( {}, this.state.result, {hits: updatedHits })
      //}); // replaced by the below code 
      this.setState({ 
        result: { ...updatedHits, hits: updatedHits }
      });
    }

    onSearchFieldChange(event) {
      this.setState({ termSearched: event.target.value })
    }
    
    setSearchTopStories(result) {
      this.setState({ result });
    }

    componentDidMount() {
      const { termSearched } = this.state;

      fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${termSearched}`)
        .then(response => response.json())
        .then(data => this.setSearchTopStories(data))
        .catch(error => error);
    }
    // +------------------------------------------------------------------------------------------+
    // Rendering Application component to DOM 
    // +------------------------------------------------------------------------------------------+
  render() {
    const { message, result, termSearched } = this.state;

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
          { result ? <Table 
            list={result.hits}
            pattern={termSearched}
            onDismiss={this.onDismiss}
          /> 
          : null }
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
            return <div key={element.objectID} className='table-row'>
            <span style={{ width: '35%' }} > Title: <a href={element.url}>{element.title}</a></span>
            <span style={{ width: '30%' }} > Author: {element.author}</span>
            <span style={{ width: '10%' }} > Comments: {element.num_comments}</span>
            <span style={{ width: '10%' }} > Points: {element.points} </span>
            <span style={{ width: '10%' }} > 
              <Button
                onClick={() => onDismiss(element.objectID)}
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
