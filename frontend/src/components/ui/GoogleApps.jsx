import React from 'react';

function GoogleApps() {
    console.log("GoogleApps component");
    return (
        <div className='p-2 bg-gray-800 me-10'>
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-950 rounded-lg shadow-md w-96 ">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Gmail</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Calendar</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Meet</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Chat</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Drive</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Photos</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-pink-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">YouTube</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Maps</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-black rounded-full"></div>
                    <span className="mt-2 text-sm text-white">Play</span>
                </div>
            </div>
        </div>
    );
}

export default GoogleApps;
