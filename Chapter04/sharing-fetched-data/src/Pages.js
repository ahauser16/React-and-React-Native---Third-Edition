import React, { Fragment, useContext } from 'react';
import { UserContext } from './UserContext';

//XI  - All three page components are the same except for their <h1> tag values.
//XII - The UserName component is used by each page and utilizes the useContext() hook to extract the state-value of UserContext that is set by the UserProvider component when the API call responds.  This means that the user context value is updated by the useContext() hook whenever the user value changes.

//XIII  - Also, NB thatin this example the page components (Page1, Page2, and Page3) have NO knowledge of this global user data.  Instead of having to pass data down from the top-level component as property values, we can rely on useContext() when we need access to global data, no matter how deeply nested the component is in our JSX markup.  It's OK for components to be stateless, such as the page components, when they have nothing to do with the data.

function Username() {
  const user = useContext(UserContext);
  return (
    <p>
      Logged in as <strong>{user.name}</strong>
    </p>
  );
}

export function Page1() {
  return (
    <Fragment>
      <h1>Page 1</h1>
      <Username />
    </Fragment>
  );
}

export function Page2() {
  return (
    <Fragment>
      <h1>Page 2</h1>
      <Username />
    </Fragment>
  );
}

export function Page3() {
  return (
    <Fragment>
      <h1>Page 3</h1>
      <Username />
    </Fragment>
  );
}
