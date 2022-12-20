import React, { createContext, useState, useEffect } from "react";

//I   - The UserContext object is created by calling the createContext() React API.
//II  - The fetchUser() function is our mock API function.
//III - The UserProvider component's job is to call the fetchUser() API and set the USER state accordingly as the response from the API arrives which we accomplish utilizing the useState() and useEffect() hooks.  This UserProvider component renderes the <UserContext.Provider> component and passes in any {children} it receives.  The VALUE property is then made available to any child components of UserProvider and in this case, VALUE is the state that is set by calling the fetchUser() API which allows us to be able to pass the user VALUE to any components of the application.  CONTINUED notes in App.js



export const UserContext = createContext();

function fetchUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: "Adam" });
    }, 1000);
  });
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "..." });

  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
