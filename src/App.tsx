import React from 'react';
import Router from './components/Router';
import { GlobalProvider } from './general/globalContext';

const App = () => {
  return (
    <GlobalProvider>
      <Router />
    </GlobalProvider>
  );
}

export default App;
