import React from 'react';

import { Link } from 'react-router-dom';
import CreateAccountBtn from './CreateAccountBtn';

import heroGmail from '../../assets/images/homepage/heroGmail.webp';

function HeroSection() {
    return (
        <div className='flex w-full space-x-20 mt-10 items-center justify-center'>
            <div className='flex flex-col space-y-5'>
                <span className='text-6xl font-semibold leading-snug'>Secure, smart, and <br /> easy to use email</span>
                <span className='text-lg text-gray-500'>Get more done with Gmail. Now integrated with Google Chat,<br /> Google Meet, and more, all in one place.</span>
                <div className='flex items-center space-x-10'>
                    <CreateAccountBtn />
                    <span className='text-blue-500'>
                        <Link>For work</Link>
                    </span>
                </div>
            </div>
            <div className='max-w-xl'>
                <img src={heroGmail} alt="" className='' />
            </div>
        </div>
    );
};

export default HeroSection;