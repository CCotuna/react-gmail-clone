import React from 'react';
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineWifiOff, MdDevicesOther } from "react-icons/md";

function BenefitsSection() {
  return (
    <div className="w-full bg-gray-100 px-5 py-10 sm:px-10 lg:px-20 xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col items-start space-y-5">
          <span className="bg-blue-500 rounded-full w-12 h-12 text-white flex items-center justify-center text-2xl">
            <IoCheckmark />
          </span>
          <div className="flex flex-col space-y-2">
            <span className="text-xl lg:text-2xl font-light text-black">
              Works with other tools
            </span>
            <span className="text-sm lg:text-xl font-light text-gray-500">
              Gmail works great with desktop clients like Microsoft Outlook, Apple Mail, and Mozilla Thunderbird, including contact and event sync.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-5">
          <span className="bg-blue-500 rounded-full w-12 h-12 text-white flex items-center justify-center text-2xl">
            <MdOutlineWifiOff />
          </span>
          <div className="flex flex-col space-y-2">
            <span className="text-xl lg:text-2xl font-light text-black">
              Stay productive, even offline
            </span>
            <span className="text-sm lg:text-xl font-light text-gray-500">
              Gmail offline lets you read, reply, delete, and search your Gmail messages when you’re not connected to the internet.
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-5">
          <span className="bg-blue-500 rounded-full w-12 h-12 text-white flex items-center justify-center text-2xl">
            <MdDevicesOther />
          </span>
          <div className="flex flex-col space-y-2">
            <span className="text-xl lg:text-2xl font-light text-black">
              Experience Gmail on any device
            </span>
            <span className="text-sm lg:text-xl font-light text-gray-500">
              Enjoy the ease and simplicity of Gmail, wherever you are.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BenefitsSection;
