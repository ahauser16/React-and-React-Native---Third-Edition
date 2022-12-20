import React, { Fragment, useState } from 'react';
import User from './User';

//The App component renders a button that is used to toggle the SHOW state whose value determines whether or not the User component is rendered via another component called ShowHideUser.

//The logic below means that if SHOW is true then the <User /> component is rendered, otherwise, the <User /> component is removed THEREBY triggering our cleanup function from our useEffect() Hook.
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
