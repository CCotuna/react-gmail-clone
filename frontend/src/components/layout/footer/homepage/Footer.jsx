import React from 'react';
import googleLogo from '../../../../assets/images/homepage/googleLogo.svg';

import { AiFillQuestionCircle } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

function Footer() {
    return (
        <div className='flex justify-evenly items-center w-full bg-gray-100 py-10 text-gray-500'>
            <div className='flex items-center space-x-5 text-sm'>
                <img src={googleLogo} alt="" />
                <span>Privacy</span>
                <span>Terms</span>
                <span>About Google</span>
                <span>Google Products</span>
                <span>Policy</span>
                <span>Privacy & Security</span>
            </div>
            <div className='flex items-center space-x-5 text-sm'>
                <div className='flex items-center space-x-2'><AiFillQuestionCircle className="text-xl" /><span>Help</span></div>
                <div className='flex items-center space-x-2'><BsGlobe className="text-xl" /><span>English</span></div>
            </div>
        </div>
    );
};

export default Footer;