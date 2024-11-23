import React from 'react';

import HomepageNavigation from '../components/layout/navigation/HomepageNavigation';
import HeroSection from '../components/ui/homepage/HeroSection';
import GeminiSection from '../components/ui/homepage/GeminiSection';
import SecuritySection from '../components/ui/homepage/SecuritySection';
import DownloadSection from '../components/ui/homepage/DownloadSection';
import BenefitsSection from '../components/ui/homepage/BenefitsSection';
import GoogleWorkspaceSection from '../components/ui/homepage/GoogleWorkspaceSection';

function Home() {
  return (
    <div>
     <HomepageNavigation />
      <div className="space-y-20 mb-40">
        <div className="px-5 sm:px-10 lg:px-52">
          <HeroSection />
          <GeminiSection />
          <SecuritySection />
          <DownloadSection />
        </div>
        <BenefitsSection /> 
        <div className="px-5 sm:px-10 lg:px-52">
          <GoogleWorkspaceSection />
        </div>
      </div>
    </div>
  );
};

export default Home;