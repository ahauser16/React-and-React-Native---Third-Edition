import React, { Fragment, useReducer, useEffect } from "react";

//I -  When our components have one piece of state that depends on another, it's difficult to use the useState() hook because using it assumes that each state value will be updated one a time.  In real applications, there are often scenarios where updating one piece of state means that another piece of state needs to be updated as well, based on this new state value.

//II  - In the example below a user can select two state values: (i) an item (First, Second, Third, etc.) and (ii) a quantity of that item (any integer greater than or equal to zero AND less than or equal to 10).  Based on those two values the page displays the total cost so whenever either the quantity or item fields change then the total must also change.

//III - Since this example has several pieces of state that depend on one another in moderately complex ways it's the perfect opportunity to put the useReducer() hook into action.  Our initialState object contains the two key/value pairs: (a) quantity: 1, which represents the initial quantity value, and (b) selected: 1, which represents the id of the initial selected item, and (c) an array called options that contains three objects each of which contains three key/value pairs: (i) id, (ii) name and (iii) value (each have the same keys but different values).  There will be other state values to be set later on but these are wha't required for the initial render.

const initialState = {
  options: [
    { id: 1, name: "First", value: 10 },
    { id: 2, name: "Second", value: 50 },
    { id: 3, name: "Third", value: 200 },
  ],
  quantity: 1,
  selected: 1,
};

//VII  - The state of the increment and decrement buttons is dependent on the quantity value so both the incrementDisabled and decrementDisabled state values are computed in the reduceButtonStates() function, which is used by the init, decrementQuantity and incrementQuantity actions.
function reduceButtonStates(state) {
  return {
    ...state,
    decrementDisabled: state.quantity === 0,
    incrementDisabled: state.quantity === 10,
  };
}

//V - Each of the actions could potentially change the total state which is why the code to compute the total was moved into its own function: reduceTotal().
function reduceTotal(state) {
  const option = state.options.find((option) => option.id === state.selected);
  return { ...state, total: state.quantity * option.value };
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    //VI  - When the component first mounts, we need to compute the total because we don't want to have an initial state for something that's derived from other state values.  So instead we utilize the init action and use the useEffect() hook to call it once when the component is first mounted/rendered.
    case "init":
      newState = reduceTotal(state);
      return reduceButtonStates(newState);
    case "decrementQuantity":
      newState = { ...state, quantity: state.quantity - 1 };
      newState = reduceTotal(newState);
      return reduceButtonStates(newState);
    case "incrementQuantity":
      newState = { ...state, quantity: state.quantity + 1 };
      newState = reduceTotal(newState);
      return reduceButtonStates(newState);
    case "selectItem":
      newState = { ...state, selected: Number(action.id) };
      return reduceTotal(newState);
    default:
      throw new Error(`${action.type} is not a valid action`);
  }
}

export default function App() {
  const [
    {
      options,
      selected,
      quantity,
      total,
      decrementDisabled,
      incrementDisabled,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //IV  - The reducer() function is passed to useReducer() and is responsible for handling different action paths: (i) init which is when the component first mounts/first renders, (ii) decrementQuantity which is when the decrement quantity button is pressed, (iii) incrementQuantity which is when the increment quantity button is pressed and (iv) selectItem which is when the item was changed.

  useEffect(() => {
    dispatch({ type: "init" });
  }, []);

//VIII  - The goal is to keep related state operations close to one another since they are related.  The perfect place to do this is in a reducer function.  We factored out common reducer behavior into their own functions: (i) reduceButtonStates and (ii) reduceTotal, which results in a functional component that doesn't have to directly perform any complex state updates.  Instead, it just needs to make dispatch() calls, keeping the component itself focused on markup and event handling.

  return (
    <Fragment>

      <section>
        <button
          disabled={decrementDisabled}
          onClick={() => dispatch({ type: "decrementQuantity" })}
        >
          -
        </button>
        <button
          disabled={incrementDisabled}
          onClick={() => dispatch({ type: "incrementQuantity" })}
        >
          +
        </button>
        <input readOnly value={quantity} />
      </section>

      <section>
        <select
          value={selected}
          onChange={(e) => dispatch({ type: "selectItem", id: e.target.value })}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </section>

      <section>
        <strong>{total}</strong>
      </section>
    </Fragment>
  );
}
