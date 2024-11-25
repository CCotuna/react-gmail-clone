import React, { useState, useEffect } from 'react';
import logo from '../../../assets/logo/gmailLogo.svg';
import { Link } from 'react-router-dom';
import CreateAccountBtn from '../../ui/CreateAccountBtn';

function HomepageNavigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);


        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="shadow-lg px-4 py-2 w-full bg-white z-50 fixed top-0 left-0">
            <div className="flex justify-between items-center">
                <Link to={'/'}>
                    <div className="flex items-center">
                        <img src={logo} alt="Gmail Logo" className="w-7 h-7 ms-2 mr-2" />
                        <span className="text-xl text-gray-500 font-light">Gmail</span>
                    </div>
                </Link>

                <ul className="flex items-center space-x-5">
                    <li className={`block md:hidden text-blue-500 py-2 px-7 border rounded-md ${isScrolled ? 'hidden' : ''}`}>
                        <Link to={'/login'}>Sign In</Link>
                    </li>
                    <li className="hidden md:block text-blue-500">
                        <Link>For work</Link>
                    </li>
                    <Link to={'/login'}>
                        <li className="hidden md:block text-blue-500 py-2 px-7 border rounded-md">
                            Sign In
                        </li>
                    </Link>
                    <li className={`hidden md:block ${isScrolled ? '' : 'hidden'}`}>
                        <CreateAccountBtn />
                    </li>
                    <li className={`block md:hidden ${isScrolled ? '' : 'hidden'}`}>
                        <CreateAccountBtn />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default HomepageNavigation;
