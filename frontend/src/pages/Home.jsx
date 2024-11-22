import React from 'react';

import HomepageNavigation from '../components/layout/navigation/HomepageNavigation';
import HeroSection from '../components/ui/HeroSection';
import GeminiSection from '../components/ui/GeminiSection';

function Home() {
  return (
    <div>
      <HomepageNavigation />
      <div className='px-52'>
        <HeroSection/>
        <GeminiSection/>
      </div>
    </div>
  );
};

export default Home;