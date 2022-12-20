import React from 'react';

//MyList is a functional component that expects an items PROP

export default ({ items }) => (
  <ul>
    {items.map(i => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);
