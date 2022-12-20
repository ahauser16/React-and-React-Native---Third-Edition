import React, { Fragment, useReducer } from "react";
//N.B. --> We did not use useState or useEffect to manage our state at all in this example.

//I -  The useState() hookis a great way to manage the state of your component which can become challenging if your component has a lot of related pieces of state.  You end up with a lot of setter functions that you need to call individually, once you figured out how a change in one state value affects another state value.  With reducers, however, there is only one dispatch() function that's used to update the state of your component.

//II  - This is an example of the basics of reducer actions and how they update the state within a component.  Then we will study more in-depth examples of how to handle updating state values that depend on other state values.

//III - In React applications, a reducer function takes as its parameters/arguments: (i) the current state, (ii) an action and (iii) ANY other arguments that are needed to update the state.  A reducer function returns the new state object of the component: ...state.  The action argument tells the reducer function which new state to return and is often used in a SWITCH statement such as the reducer() function below.
//***************************************** */
//VI  - The reducer function below accepts the state argument which is the current state of the component and the action argument is the argument that's eventually passed to our dispatch() function.
//      The action.type value is used to determine what to do.  This reducer only has two possible actions: changeName and changeAge.  Based on this we use the object spread operator to return a new state object, made from the existing state and updated state object values.  In this example, depending on the value of action.type, either the name or age state values will be updated.

//VII - It's important to have a default handler in place that will throw an error when an unexpected action is passed to the reducer as an argument which is likely during production so it's better to have the reducer complain loudly about the invalid action than to have to figure out why your component has the wrong state set on it.
function reducer(state, action) {
  switch (action.type) {
    case "changeName":
      return { ...state, name: action.value };
    case "changeAge":
      return { ...state, age: action.value };
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

//IV  - The App component renders two fields and two labels using two pieces of state, one for each field.  Each input has the three properties: placeholder, value and onChange (the age field also has a type property). When the text value changes for either input the labels are updated by running a dispatch function that contains one object with two key/value pairs: (i) type: "string" and (ii) the new value to update the state value.

export default function App() {
  //V - The useReducer() function accepts two arguments: (i) the reducer function that updates the state AND (ii) the initial state of the component.  
  //    The useReducer() function returns an array with two items: (i) the state of the component and (ii) the dispatcher function.
  //    When using reducers, we only have one object as the state of the component as opposed to several smaller unrelated state values.  This is why we destructure the state object into the two constants: (i) name and (ii) age.
  const [{ name, age }, dispatch] = useReducer(reducer, {});

  return (
    <Fragment>
      <input
        placeholder="Name"
        value={name}
        onChange={e => dispatch({ type: "changeName", value: e.target.value })}
      />
      <p>Name: {name}</p>
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={e => dispatch({ type: "changeAge", value: e.target.value })}
      />
      <p>Age: {age}</p>
    </Fragment>
  );
}
