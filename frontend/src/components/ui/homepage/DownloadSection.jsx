import React from 'react';

import downloadAppStore from '../../../assets/images/homepage/downloadAppStore.svg';
import downloadGooglePlay from '../../../assets/images/homepage/downloadGooglePlay.svg';

function DownloadSection() {
  return (
    <div className='flex flex-col text-center items-center justify-center space-y-5 p-10 bg-gray-100'>
      <span className='text-4xl font-normal'>Bring the best of Gmail to your device</span>
      <div className='flex space-x-5 items-center justify-center'>
        <img src={downloadAppStore} alt="" className='w-40 h-16' />
        <img src={downloadGooglePlay} alt="" className='w-48 h-24' />
      </div>
    </div>
  );
};

export default DownloadSection;