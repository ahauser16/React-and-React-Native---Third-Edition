import React, { Fragment, useEffect, useState } from "react";

function fetchUser() {
  //The fetchUser() function returns a PROMISE which resolves to be a simple object with two properties, id and name.
  return new Promise((resolve) => {
    //The setTimeout() function delays the promise resolution for 1 second so as to mimic asynchronous behavior just like a normal fetch() call would.
    setTimeout(() => {
      resolve({ id: 1, name: "Adam" });
    }, 1000);
  });
}

export default function App() {
  //We declare our initial state for ID and NAME and the setter functions we will use to update that state.
  const [id, setId] = useState("loading...");
  const [name, setName] = useState("loading...");

  //The useEffect() Hook is used to run "side-effects" within the component.  Meaning that functional components should have one job: return JSX content to render to the DOM.  So if the component needs to do something else (such as fetching API data) then that code should be placed (lexically) inside a useEffect() Hook such as in the example below.

  //The useEffect() Hook expects a function as an argument which is called after the component finishes rendering in a safe way that does not interfere with anything else that React is doing with the component under the hood.

  //After our state is defined the useEffect() function is used to set up an IIFE function that calls fetchUser() and sets the state of the App component WHEN the promise resolves.

  useEffect(() => {
    fetchUser().then((user) => {
      setId(user.id);
      setName(user.name);
    });
  });

  return (
    <Fragment>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
    </Fragment>
  );
}
