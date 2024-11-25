import React from 'react';
// import './PreLoader.css';

import gmailIntroAnimation from '../preloader/gmailIntroAnimation.gif';

function PreLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img 
        src={gmailIntroAnimation}
        alt="Loading..." 
        className="h-96 w-auto"
      />
    </div>
  );
}

export default PreLoader;
