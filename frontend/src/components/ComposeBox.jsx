import React, { useState } from 'react';
import ComposeEmail from './ui/ComposeEmail';
import { IoMdClose } from "react-icons/io";


function ComposeBox({ onClose }) {
  return (
    <div className="compose-box bg-white p-4 shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Compose</h2>
        <button
          className="text-red-500 hover:text-red-700 font-bold text-2xl"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
      <ComposeEmail />
    </div>
  );
};

export default ComposeBox;
