import React, { Fragment, useState } from 'react';
import User from './User';

//The App component renders a button that is used to toggle the SHOW state (a/k/a the mount/unmount state) whose value determines whether or not the User component is rendered via another component called ShowHideUser.

//The logic below means that: (i) the ShowHideUser component is passed the (destructured) SHOW property and (ii) if SHOW is TRUE then the <User /> component is True and will mount otherwise <User /> will not mount (it will not render), (iii) the initial state of SHOW is set to FALSE, (iv) when a user clicks the button SHOW is set to TRUE which (a) causes the <User /> component to render, (b) the button text to change from 'Show User' (SHOW === FALSE) to 'Hide User' (SHOW === TRUE).  When SHOW === FALSE the <User /> component is removed THEREBY triggering our cleanup function from our useEffect() Hook.

//Effects are run by React after every render which might not be a desired behavior, especially if your effect is something that is relatively slow such as an asynchronous network request.  Instead we may want to call the API after the first render and nothing more.  See Optimizing side-effect actions for more info.
const ShowHideUser = ({ show }) => (show ? <User /> : null);

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <button onClick={() => setShow(!show)}>
        {show ? 'Hide User' : 'Show User'}
      </button>
      <ShowHideUser show={show} />
    </Fragment>
  );
}
