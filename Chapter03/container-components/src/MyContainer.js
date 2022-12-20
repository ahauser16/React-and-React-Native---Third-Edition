import React, { Component } from "react";
import MyList from "./MyList";

//N.B. I - The job of this MyContainer component is to fetch data and set its state.

//The state of the container is passed to the MyList component as PROPS.

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["First", "Second", "Third", "Fourth"]);
    }, 2000);
  });
}

export default class MyContainer extends Component {
  state = { items: [] };

  //  Any time the state is set the render() function is called.
  componentDidMount() {
    fetchData().then((items) => this.setState({ items }));
  }

  //Now this is where the CHILD component: MyList comes into play.  The state of the container is passed to MyList component as PROPS.
  render() {
    return <MyList {...this.state} />;
  }
}
