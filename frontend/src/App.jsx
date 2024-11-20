import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './utils/routes/router.jsx';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;