import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//Initially when our App loads the <User /> component isn't rendered because the initial state of SHOW is false.
//When a user clicks the Show User button the initial state values for the ID and NAME States are rendered and will be updated&rendered when the API promise resolves after 1 second.
//If a user clicks the Show User button and immediately clicks the Hide User button before our data finishes loading we do not get an error.  This is because of the Bluebird cleanup function in the useEffect Hook.









// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
