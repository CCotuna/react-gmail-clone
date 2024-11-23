import React from 'react';

import gmailLogo from '../../../assets/logo/gmailLogo.svg';
import GoogleCalendar from '../../../assets/logo/googleAppsLogos/GoogleCalendar.svg';
import GoogleDrive from '../../../assets/logo/googleAppsLogos/GoogleDrive.svg';
import GoogleDocs from '../../../assets/logo/googleAppsLogos/GoogleDocs.svg';
import GoogleMeet from '../../../assets/logo/googleAppsLogos/GoogleMeet.svg';

function GoogleWorkspaceSection() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex space-x-4">
        <img src={gmailLogo} alt="Gmail Logo" className="w-8 h-8" />
        <img src={GoogleCalendar} alt="Google Calendar Logo" className="w-8 h-8" />
        <img src={GoogleDrive} alt="Google Drive Logo" className="w-8 h-8" />
        <img src={GoogleDocs} alt="Google Docs Logo" className="w-8 h-8" />
        <img src={GoogleMeet} alt="Google Meet Logo" className="w-8 h-8" />
      </div>

      <div className="text-center space-y-4 flex flex-col max-w-2xl">
        <span className="text-4xl font-normal">
          Gmail is now part of <br className='hidden lg:block' /> Google Workspace
        </span>
        <span className="text-lg text-gray-500">
          Collaborate faster, from any device, anytime, all in one place.
        </span>
        <span className="text-gray-500 text-lg">
          Google Workspace is a set of productivity and collaboration tools that helps individuals, teams, 
          and businesses stay on top of everything. It is a flexible, innovative solution for business or 
          personal use that includes all of your favorite apps like Gmail, Calendar, Drive, Docs, Meet, and more.
        </span>
      </div>

      <span className="text-blue-500 font-medium cursor-pointer">Learn more</span>
    </div>
  );
}

export default GoogleWorkspaceSection;
