import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Upon the first render the app renders the initial state values for ID:"loading..." and NAME:"loading..."
//After one second the setTimeout function resolves the PROMISE that contains the data from the API response which is then used to update the ID and NAME states.  This causes the entire App component to re-render.
//IN PRACTICE (in the real world) there is a good chance that an internet user will navigate around the application while an API request is still pending so we can modify our useEffect() Hook to deal with canceling these requests.
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
