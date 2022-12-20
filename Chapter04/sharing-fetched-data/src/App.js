import React, { useState } from 'react';
import { UserProvider } from './UserContext';
import { Page1, Page2, Page3 } from './Pages';

//IV  -   The App component renders three buttons that, when clicked, render their corresponding PAGE content.  The PAGE state is used to control the page that is displayed and defaults to 0.
//V   -   When App is first rendered, the Page1 component is rendered.  This happens with the help of the ChoosePage component, which renders the correct page based on the PAGE state that is passed to it.

//VI  - The ChoosePage component receives the destructured PROP 'page' as its sole argument.
//VII - The code block that follows declares the Page constant and assigns it (i) an array containing three pages and a second array containing only the page state.
//VIII- The ChoosePage component returns the <Page /> component.
function ChoosePage({ page }) {
  const Page = [Page1, Page2, Page3][page];
  return <Page />;
}

//IX  - The initial value of the page state is 0.
function App() {
  const [page, setPage] = useState(0);

  return (
    <UserProvider>
      {/* 
      X - Each button has an onClick PROP containing a setter function that sets the value of the page state to the appropriate page index number for that button.  Remember that in JS the first item in an array has a value of 0 (zero).  The result is clicking on a button switches to the corresponding page #.
      Each button also has a disabled PROP containing JSX that evaluates to True if the page state value is equal to the appropriate page index number for that button.  The result is that the button is disabled for a page if that page is displayed (chosen by User).  NOTES CONTINUED IN Pages.js...
      */}
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
    </UserProvider>
  );
}

export default App;
