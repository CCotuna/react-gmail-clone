import React from 'react';
import { Link } from 'react-router-dom';
import CreateAccountBtn from '../CreateAccountBtn';
import heroGmail from '../../../assets/images/homepage/heroGmail.webp';

function HeroSection() {
    return (
        <div className="flex flex-col lg:flex-row w-full space-y-10 lg:space-y-0 lg:space-x-20 mt-10 items-center justify-center px-5 lg:px-0">
            <div className="flex flex-col space-y-5 text-center lg:text-left">
                <span className="text-3xl sm:text-4xl lg:text-5xl 2xl:6xl font-semibold leading-snug">
                    Secure, smart, and <br className="hidden lg:block" /> easy to use email
                </span>
                <span className="text-sm sm:text-base lg:text-lg text-gray-500">
                    Get more done with Gmail. Now integrated with Google Chat,<br className="hidden lg:block" /> Google Meet, and more, all in one place.
                </span>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-10 space-y-5 sm:space-y-0 justify-center lg:justify-start">
                    <CreateAccountBtn />
                    <span className="text-blue-500">
                        <Link>For work</Link>
                    </span>
                </div>
            </div>
            <div className="max-w-xs sm:max-w-sm lg:max-w-xl">
                <img src={heroGmail} alt="Gmail illustration" className="w-full h-auto" />
            </div>
        </div>
    );
}

export default HeroSection;
