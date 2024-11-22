import React from 'react';
import GmailLogo from '../../assets/logo/gmailLogo.svg';
import GoogleDrive from '../../assets/logo/googleAppsLogos/GoogleDrive.svg';
import GoogleClassroom from '../../assets/logo/googleAppsLogos/GoogleClassroom.svg';
import GoogleCalendar from '../../assets/logo/googleAppsLogos/GoogleCalendar.svg';
import GoogleDocs from '../../assets/logo/googleAppsLogos/GoogleDocs.svg';
import GoogleGemini from '../../assets/logo/googleAppsLogos/GoogleGemini.svg';
import GoogleSheets from '../../assets/logo/googleAppsLogos/GoogleSheets.svg';
import GoogleSlides from '../../assets/logo/googleAppsLogos/GoogleSlides.svg';
import GoogleChat from '../../assets/logo/googleAppsLogos/GoogleChat.svg';
import GoogleMeet from '../../assets/logo/googleAppsLogos/GoogleMeet.svg';
import GoogleForms from '../../assets/logo/googleAppsLogos/GoogleForms.svg';
import Youtube from '../../assets/logo/googleAppsLogos/Youtube.svg';
import GoogleMaps from '../../assets/logo/googleAppsLogos/GoogleMaps.svg';
import GoogleNews from '../../assets/logo/googleAppsLogos/GoogleNews.svg';
import GoogleAds from '../../assets/logo/googleAppsLogos/GoogleAds.svg';
import GooglePhotos from '../../assets/logo/googleAppsLogos/GooglePhotos.svg';
import GoogleTranslate from '../../assets/logo/googleAppsLogos/GoogleTranslate.svg';
import GoogleEarth from '../../assets/logo/googleAppsLogos/GoogleEarth.svg';
import GoogleTravel from '../../assets/logo/googleAppsLogos/GoogleTravel.svg';

const googleApps = [
  { name: 'Gmail', source: GmailLogo, link: 'https://mail.google.com' },
  { name: 'Google Drive', source: GoogleDrive, link: 'https://drive.google.com' },
  { name: 'Google Classroom', source: GoogleClassroom, link: 'https://classroom.google.com' },
  { name: 'Google Calendar', source: GoogleCalendar, link: 'https://calendar.google.com' },
  { name: 'Documente', source: GoogleDocs, link: 'https://docs.google.com' },
  { name: 'Gemini', source: GoogleGemini, link: 'https://gemini.google.com' },
  { name: 'Foi de calcul', source: GoogleSheets, link: 'https://sheets.google.com' },
  { name: 'Prezentari', source: GoogleSlides, link: 'https://slides.google.com' },
  { name: 'Chat', source: GoogleChat, link: 'https://chat.google.com' },
  { name: 'Meet', source: GoogleMeet, link: 'https://meet.google.com' },
  { name: 'Formulare', source: GoogleForms, link: 'https://forms.google.com' },
  { name: 'Youtube', source: Youtube, link: 'https://youtube.com' },
  { name: 'Maps', source: GoogleMaps, link: 'https://maps.google.com' },
  { name: 'Stiri', source: GoogleNews, link: 'https://news.google.com' },
  { name: 'Google Ads', source: GoogleAds, link: 'https://ads.google.com' },
  { name: 'Fotografii', source: GooglePhotos, link: 'https://photos.google.com' },
  { name: 'Traducere', source: GoogleTranslate, link: 'https://translate.google.com' },
  { name: 'Earth', source: GoogleEarth, link: 'https://earth.google.com' },
  { name: 'Calatorii', source: GoogleTravel, link: 'https://travel.google.com' },
];

function GoogleApps() {
  return (
    <div className="p-2 bg-gray-800 rounded-lg me-10">
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-950 rounded-xl shadow-md w-80 h-96 overflow-y-scroll">
        {googleApps.map((app, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <a href={app.link} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center hover:bg-gray-700 hover:rounded-xl p-2">
              <img 
                src={app.source} 
                alt={app.name} 
                className="w-10 h-10 mb-2" 
              />
              <span className="text-sm text-white text-center w-20 overflow-hidden whitespace-nowrap hover:whitespace-normal hover:overflow-visible transition-all">
                {app.name}
              </span>
            </a>
          </div> 
        ))}
      </div>
    </div>
  );
}

export default GoogleApps;
