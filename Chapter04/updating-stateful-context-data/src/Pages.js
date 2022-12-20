import React, { Fragment, useContext } from 'react';
import { StatusContext } from './StatusContext';

//IV  - The SetStatus component is used to render an input component that contains a value property and an onChange property which allows the user to enter new values for the status context.  When a user enters a new value it causes the function within the onChange property to run which sets the status state value.

function SetStatus() {
  const [status, setStatus] = useContext(StatusContext);
  return <input value={status} onChange={e => setStatus(e.target.value)} />;
}

//V - Since the Status component only renders the value of the status state (as opposed to updating or setting that state value), it doesn't need the setStatus() function which (remember...) comes from the context data array and sets the state value. 

export function Status() {
  const [status] = useContext(StatusContext);
  return <p>{status}</p>;
}

//VI  -  NB that Page1 and Page3 both contain the <SetStatus /> component but the Page2 component does not.  Continue notes in App.js...

export function Page1() {
  return (
    <Fragment>
      <h1>Page 1</h1>
      <SetStatus />
    </Fragment>
  );
}

export function Page2() {
  return (
    <Fragment>
      <h1>Page 2</h1>
    </Fragment>
  );
}

export function Page3() {
  return (
    <Fragment>
      <h1>Page 3</h1>
      <SetStatus />
    </Fragment>
  );
}
