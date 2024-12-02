import React from 'react';
import BackgroundChanger from '../../utils/background/backgroundChanger';

function Settings({ setWallpaper }) {
  return (
    <div className='h-[calc(100vh-5rem)] text-center mx-2 p-6 bg-gray-50 rounded-2xl'>
      <span className=''>Settings</span>
      <BackgroundChanger setWallpaper={setWallpaper} />
    </div>
  );
};

export default Settings;