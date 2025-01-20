import React, { useState } from 'react';
import ComposeEmail from './ui/ComposeEmail';
import { IoMdClose } from "react-icons/io";


function ComposeBox({ onClose }) {
  return (
    <div className="compose-box bg-white rounded-t-lg shadow-md">
      <div className="flex justify-between items-center p-2 px-3 rounded-t-lg bg-gray-200">
        <h2 className="text-sm">Mesaj nou</h2>
        <button
          className="hover:text-red-500 font-bold text-md"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
      <ComposeEmail onClose={onClose} />
    </div>
  );
};

export default ComposeBox;
