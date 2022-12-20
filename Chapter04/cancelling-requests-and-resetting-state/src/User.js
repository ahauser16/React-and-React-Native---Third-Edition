import React, { Fragment, useEffect, useState } from "react";
//http://bluebirdjs.com/docs/getting-started.html
//https://www.npmjs.com/package/bluebird
//Bluebird is a fully featured promise library with focus on innovative features and performance.
import { Promise } from "bluebird";

//It's likely that users will navigate around your application and cause components to be removed from the DOM before responses to their respective API requests arrive.

//When this happens, an error occurs BECAUSE the component will attempt to update the state values of a component that has been removed.
/////////////////////////////////////////////////////////////////
Promise.config({ cancellation: true });

//when the fetchUser() function is called it creates a promise that, when resolved, contains the fetched data from the API (e.g. after one second the id: 1 and name: "Adam" are returned).
function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Adam" });
    }, 1000);
  });
}

export default function User() {
  const [id, setId] = useState("loading...");
  const [name, setName] = useState("loading...");

  //When the useEffect() Hook below is executed a promise is created by calling fetchUser and also returns a function that React runs when the component is removed from the DOM (unmounted).

  //The useEffect Hook is built in a way that we can return a function inside it and this return function is where the cleanup happens. The cleanup function prevents memory leaks and removes some unnecessary and unwanted behaviors.

  //   useEffect(() => {
  //     effect
  //     return () => {
  //         cleanup
  //     }
  // }, [input])

  useEffect(() => {
    const promise = fetchUser().then((user) => {
      setId(user.id);
      setName(user.name);
    });

    //Here we are using the cancel() function from the Bluebird promise library to cancel the request if the component unmounts which prevents the component from trying to update its state after it has been removed.
    return () => {
      promise.cancel();
    };
  });

  return (
    <Fragment>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </Fragment>
  );
}

//AXIOS EXAMPLE
//https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/

//For AXIOS calls we can use the Axios Cancel Token.
//https://github.com/axios/axios#cancellation

/*
useEffect(() => {

  ***set our variable to true***
  let isApiSubscribed = true;

  axios.get(API).then((response) => {
      if (isApiSubscribed) {
          ***insert handle success code here***
      }
  });
  return () => {
      ***cancel the subscription***
      isApiSubscribed = false;
  };
}, []);
*/
