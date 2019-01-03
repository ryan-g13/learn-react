import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return( 
      <form>
        <input 
          type='text'
          value={value}
          onChange={onChange} 
        />
      </form>
    )
  }
}

/* 
Refactor the above component into a stateless function rather than a class based component. 
  - No access to lifecycle methods 
  - No access to contextual this, therefore no access to state.

  const Search = (props or {value, onChange, children }) => {
    const { value, onChange, children } = props;
    return(
      <form>
        <input 
          type='text
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
*/
