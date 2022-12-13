import React, { Component } from 'react';

export default class MyComponent extends Component {
  //I - below is what the initial render looks like.
  state = {
    first: 'loading...',
    second: 'loading...',
    third: 'loading...',
    fourth: 'loading...',
    doneMessage: 'finished!'
  };

  render() {
    const { state } = this;

    return (
      <ul>
        {Object.keys(state)
          .filter(key => key !== 'doneMessage')
          .map(key => (
            <li key={key}>
              <strong>{key}: </strong>
              {state[key]}
            </li>
          ))}
      </ul>
    );
  }
}


//revisit ES6 Arrow Functions

// ES5 Regular function:
//************************* */
// var add = function(x, y) { 
//   return x + y;
//   };
//************************* */

//IS THE EQUIVALENT OF:

// ES6 Arrow function:
//************************* */
// let add = (x, y) => x + y;
//************************* */


//N.B. that you can include the curly braces and return in the expression but its not necessary.
// let add = (x, y) => { RETURN x + y };
