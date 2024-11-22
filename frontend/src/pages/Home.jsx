import React from 'react';

import HomepageNavigation from '../components/layout/navigation/HomepageNavigation';
import HeroSection from '../components/ui/homepage/HeroSection';
import GeminiSection from '../components/ui/homepage/GeminiSection';
import SecuritySection from '../components/ui/homepage/SecuritySection';
import DownloadSection from '../components/ui/homepage/DownloadSection';

function Home() {
  return (
    <div>
      <HomepageNavigation />
      <div className='px-52 space-y-20'>
        <HeroSection/>
        <GeminiSection/>
        <SecuritySection />
        <DownloadSection />
      </div>
    </div>
  );
};

export default Home;