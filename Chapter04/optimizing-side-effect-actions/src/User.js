import React, { Fragment, useEffect, useState } from 'react';
import { Promise } from 'bluebird';

//By default React assumes that every effect that is run needs to be cleaned up.  This typically isn't the case.  For example, you might have specific property or state values that require cleanup when they change.  You can pass an array of valoues to watch as the second argument to useEffect().  For example, if you have a resolved state that requires cleanup when it changes, you would write your 'effect' code like this:

/* **********************************************
const [resolved, setResolved] = useState(false);
useEffect( () => {
  // INSERT EFFECT CODE HERE

  return () => {
    // THE CLEANUP CODE THAT DEPENDS ON "resolved"
  }
}, [resolved]);
********************************************** */

// With the code above, the CLEANUP CODE function will ONLY run if the resolved state value changes.  Furthermore, if the EFFECT CODE runs and the resolved state hasn't changed, then the CLEANUP CODE will not run.

//Another common case is to never run the cleanup code, except for when the component is removed which is what we want to happen in the example from the previous section: "Canceling requests and resetting state".  In the previous example the cleanup code runs after every render which means our application is repeatedly fetching the user API data when all we really want is to fetch it once when the component is first mounted (first rendered).

//Below is the code from the previous section with some modifications to the User component.  We added an empty array as a second argument to our useEffect() function which tells React that there are NO VALUES TO WATCH and that we only want to run the cleanup code when the component is removed.

//We also added a 'console.count('fetching user')' to the fetchUser() function which makes it easier to look at the browser dev tools console and make sure that our component data is only fetched once.  NB -> If you remove the [] argument that is passed to useEffect(), then you will notice that fetchUser() is called several times.

Promise.config({ cancellation: true });

function fetchUser() {
  //this console.count is new
  console.count('fetching user');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Adam' });
    }, 1000);
  });
}

export default function User() {
  const [id, setId] = useState('loading...');
  const [name, setName] = useState('loading...');

  useEffect(() => {
    const promise = fetchUser().then(user => {
      setId(user.id);
      setName(user.name);
    });

    return () => {
      promise.cancel();
    };
    //notice the empty array is included as a parameter/argument to the useEffect function.
  }, []);

  return (
    <Fragment>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </Fragment>
  );
}
