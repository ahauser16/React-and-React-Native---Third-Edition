import React from 'react';
import { render } from 'react-dom';

//SYNTAX FOR setState:

//setState({ stateName : updatedStateValue })

// OR

// setState((prevState) => ({ 
//   stateName: prevState.stateName + 1 
// }))

import MyComponent from './MyComponent';

const myComponent = render(<MyComponent />, document.getElementById('root'));
  //II - below is what the re-render looks like.

setTimeout(() => {
  myComponent.setState({ first: 'done!' });
}, 1000);

setTimeout(() => {
  myComponent.setState({ second: 'done!' });
}, 2000);

setTimeout(() => {
  myComponent.setState({ third: 'done!' });
}, 3000);

//The three previous functions take in a javascript object that represents the state object we want to merge into our existing state.  The fourth setTimeout function below takes a function as its sole argument and that function takes in the current state of the component.  
//N.B.  This is useful when you need to base state changes on current state values.  For this example when the fourth setTimeout function runs the setState function it sets (changes) the value of the 'fourth' prop from "loading..." to 'finished!'.  Then the setState function returns the NEW state of the component which can be merged with the existing state using the spread operator (e.g.  '...state')

setTimeout(() => {
  myComponent.setState(state => ({
    ...state,
    fourth: state.doneMessage
  }));
}, 4000);
