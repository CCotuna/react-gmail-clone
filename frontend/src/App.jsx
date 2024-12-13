import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './utils/routes/router.jsx';
import Snowfall from 'react-snowfall';

function App() {
  return (
    <BrowserRouter>
      <div className="relative w-screen h-screen">
        <Snowfall
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 50,
          }}
          color="white"
          snowflakeCount={150}
        />
        <div className='z-10'>
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
