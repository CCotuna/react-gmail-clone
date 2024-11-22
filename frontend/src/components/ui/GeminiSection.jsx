import React from 'react';

import Accordion from '../Accordion';
import accordionData from '../../constants/geminiData';

function GeminiSection() {
  

  return (
    <div className="flex flex-col items-center space-y-10 text-center">
      <span className="text-4xl font-normal">Gemini in Gmail</span>
      <p className="text-lg text-gray-500 mt-4">
        Save time managing your inbox at home or on the go with Gemini. Add Gemini to your Google One Premium
        <br /> plan for personal use or to your Google Workspace plan for work.
      </p>
      <Accordion data={accordionData} imagePosition="left" />
    </div>
  );
}

export default GeminiSection;
