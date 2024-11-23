import React from 'react';

import Accordion from '../../Accordion';
import geminiData from '../../../constants/geminiData';

function GeminiSection() {
  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-10 py-10 space-y-4">
      <span className="text-2xl sm:text-3xl lg:text-4xl font-normal">
        Gemini in Gmail
      </span>
      <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-4 max-w-2xl">
        Save time managing your inbox at home or on the go with Gemini. Add Gemini to your Google One Premium
        plan for personal use or to your Google Workspace plan for work.
      </p>
      <Accordion data={geminiData} imagePosition="left" />
    </div>
  );
}

export default GeminiSection;
