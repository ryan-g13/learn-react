import React, {Component } from 'react';

export default class Table extends React.Component {
  render() {
    return (
      <div className='table'>
        <p>Hola</p>
        <ul>
          {list.filter(isSearched(termSearched)
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