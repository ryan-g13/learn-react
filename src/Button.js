import React, { Component } from 'react';

class Button extends React.Component {
  render() {
    const {
      onClick, 
      className = '',
      children
    } = this.props;
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
}
/* Alternative method of functional stateless button component.
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

*/
export default Button;