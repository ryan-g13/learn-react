import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { content } = this.props;
    return(
      <div className='message' >
        <h1>{content.greeting}</h1>
        <p>Wilkommen {content.userName}, haben Sie eine Guten Tag</p> 
      </div>
    );
  }
}

// const Message = ({ content }) => {
//   return(
//     <div className='message' >
//       <h1>{content.greeting}</h1>
//       <p>Wilkommen {content.userName}, haben Sie eine Guten Tag</p> 
//     </div>
//   )
// }

export default Message;