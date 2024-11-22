import React from 'react';

import HomepageNavigation from '../components/layout/navigation/HomepageNavigation';
import HeroSection from '../components/ui/HeroSection';

function Home() {
  return (
    <div>
      <HomepageNavigation />
      <div className='px-52'>
        <HeroSection/>
      </div>
    </div>
  );
};

export default Home;