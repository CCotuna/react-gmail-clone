import React from 'react';
import Snowfall from 'react-snowfall';

function TestSnowfall() {
  return (
    <div className="w-screen h-screen z-50">
      <Snowfall
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
        color="white"
        speed={5}
        snowflakeCount={10000}
      />
    </div>
  );
}

export default TestSnowfall;
