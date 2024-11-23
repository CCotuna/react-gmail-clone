import React from 'react';

import downloadAppStore from '../../../assets/images/homepage/downloadAppStore.svg';
import downloadGooglePlay from '../../../assets/images/homepage/downloadGooglePlay.svg';

function DownloadSection() {
  return (
    <div className="flex flex-col text-center items-center justify-center space-y-5 p-5 sm:p-10 bg-gray-100">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-normal px-5 sm:px-10">
        Bring the best of Gmail to your device
      </span>
      <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0 items-center justify-center">
        <img
          src={downloadAppStore}
          alt="Download on App Store"
          className="w-32 sm:w-40 h-auto"
        />
        <img
          src={downloadGooglePlay}
          alt="Download on Google Play"
          className="w-40 sm:w-48 h-auto"
        />
      </div>
    </div>
  );
}

export default DownloadSection;
