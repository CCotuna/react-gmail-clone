import React from 'react';

import HomepageNavigation from '../components/layout/navigation/HomepageNavigation';
import HeroSection from '../components/ui/homepage/HeroSection';
import GeminiSection from '../components/ui/homepage/GeminiSection';
import SecuritySection from '../components/ui/homepage/SecuritySection';
import DownloadSection from '../components/ui/homepage/DownloadSection';
import BenefitsSection from '../components/ui/homepage/BenefitsSection';

function Home() {
  return (
    <div>
      <HomepageNavigation />
      <div className='px-52 space-y-20 mb-40'>
        <HeroSection/>
        <GeminiSection/>
        <SecuritySection />
        <DownloadSection />
        <BenefitsSection />
      </div>
    </div>
  );
};

export default Home;