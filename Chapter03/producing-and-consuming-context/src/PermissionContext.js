import React, { Component, createContext } from "react";

//NB The createContext() function creates the actual context and its return value is one object containing two components: Provider and Consumer.
const { Provider, Consumer } = createContext("permissions");

//This instantiation of a class component is an abstraction that allows the PermissionProvider to be used all throughout the application.
export class PermissionProvider extends Component {
  //Within the class component we instantiate the State which contains the data that components will use.  These keys&values determine whether the feature will be displayed or not.
  state = {
    first: true,
    second: false,
    third: true,
  };

  render() {
    return (
      //The value that's rendered is the <Provider> component which provides any children with context data set via the VALUE PROP.
      //this = PermissionProvider
      <Provider value={this.state}>{this.props.children}</Provider>
    );
  }
}

//Now declaring the PermissionConsumer functional component is an abstraction for PermissionConsumer.
const PermissionConsumer = ({ name, children }) => (
  //The child of the <Consumer> component is always a function that takes the context data as an argument.  Here the PermissionConsumer component has a NAME PROP that is a string and refers to the name of the feature (e.g. "first", "second", "third" from the First.js, Second.js and Third.js components, respectively).  When the string value referenced by NAME is compared to the string value referenced in our context's STATE object and if that comparison evaluates to FALSE then nothing is rendered.
  <Consumer>{(value) => value[name] && children}</Consumer>
);

export { PermissionConsumer };
