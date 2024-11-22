import React from 'react';
import logo from '../../../assets/logo/gmailLogo.svg'
import { Link } from 'react-router-dom';

import CreateAccountBtn from '../../ui/CreateAccountBtn';

function HomepageNavigation() {
    return (
        <nav className='shadow-lg px-4 py-2'>
            <div className='flex justify-between items-center'>
                <Link to={'/'} >
                    <div className="flex items-center">
                        <img src={logo} alt="Gmail Logo" className="w-7 h-7 ms-2 mr-2" />
                        <span className="text-xl text-gray-500 font-light">Gmail</span>
                    </div>
                </Link>
                <ul className='flex space-x-5 items-center'>
                    <li className='text-blue-500'>
                        <Link>For work</Link>
                    </li>
                    <li className='text-blue-500 py-2 px-7 border rounded-md'>
                        <Link>Sign In</Link>
                    </li>
                    <CreateAccountBtn />
                </ul>
            </div>
        </nav>
    );
};

export default HomepageNavigation;