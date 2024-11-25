import React from 'react';

import logo from '../../../assets/logo/gmailLogo.svg'
import CreateAccountBtn from '../CreateAccountBtn';

function CTASection() {
    return (
        <div className="flex flex-col text-center items-center justify-center space-y-5 p-5 sm:p-10 sm:py-20 bg-gray-100">
            <div className="flex flex-col sm:flex-row sm:space-x-5 space-y-5 sm:space-y-0 items-center justify-center">
                <img
                    src={logo}
                    alt="Download on App Store"
                    className="w-16 sm:w-20 h-auto"
                />
            </div>
            <span className='text-4xl font-normal'>
                Show the world how it’s done.
            </span>
            <span className='text-lg text-gray-500'>
                Get started with a more powerful Gmail.
            </span>
            <div className='flex items-center justify-between space-x-10'>
                <CreateAccountBtn />
                <span className="hidden md:block text-blue-500">
                    For work
                </span>
            </div>
        </div>
    );
};

export default CTASection;