import React, { useState } from 'react';
import { StatusProvider } from './StatusContext';
import { Page1, Page2, Page3, Status } from './Pages';

//VIII  - This section on Updating Stateful Context Data illustrates how to create a context containing global data that various components in an app need to share such as data from an API endpoint so you can implement a context provider component that performs this API data fetch and then shares it with other components.  In order to provide these components with the global data you can utilize the useContext() hook (which resembles the useState hook).

//IX  - This section also illustrates how context data can be changed by different components which involves passing a state setter function as part of the context data so that components can use it to update the context value.

function ChoosePage({ page }) {
  const Page = [Page1, Page2, Page3][page];
  return <Page />;
}

function App() {
  const [page, setPage] = useState(0);

  return (
    <StatusProvider>
      <button onClick={() => setPage(0)} disabled={page === 0}>
        Page 1
      </button>
      <button onClick={() => setPage(1)} disabled={page === 1}>
        Page 2
      </button>
      <button onClick={() => setPage(2)} disabled={page === 2}>
        Page 3
      </button>
      <ChoosePage page={page} />

      {/*VII  - The Status component  is used by the App component to display the status state value on every page including Page2*/}
      <Status />
    </StatusProvider>
  );
}

export default App;
