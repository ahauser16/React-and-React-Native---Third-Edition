import React, { createContext, useState } from "react";

//I - global data that is shared throughout your application isn't limited to read-only API response data.  Sometimes, components themselves need to update global state values.  To enable this capability, we need to pass: (a) data from context producers and (b) a MECHANISM to update the data.  Since state data stored in a context provider (a) is created by with the useState() hook, we can pass the setter function (b) along with the state value.

//II  - Referring to the fetched data example from last section but substituting user state with status state (we will be using status context instead of user context).  Structuring our code this way (i) provides components access to the status state value and (ii) the status state setter function.

//III - The StatusProvider component contains the status state object that is called: value, which is assigned an initial state value of the string: "set a status".  Remember that the useState() hook returns an array that contains: (i) a state value and (ii) a state setter function, which in this case is passed to the value property of <StatusContext.Provider>.  Continue to Pages.js for more notes...

export const StatusContext = createContext();

export function StatusProvider({ children }) {
  const value = useState("set a status");
  console.log(value);
  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
}
