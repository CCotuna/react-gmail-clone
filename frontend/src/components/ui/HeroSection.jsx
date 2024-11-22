import React from 'react';

import CreateAccountBtn from './CreateAccountBtn';

function HeroSection() {
  return (
    <div className='flex space-x-10 items-center justify-center'>
      <div>
        <span>Secure, smart, and easy to use email</span>
        <span>Get more done with Gmail. Now integrated with Google Chat, Google Meet, and more, all in one place.</span>
        <div>
            <CreateAccountBtn />
        <li className='text-blue-500'>
                        <Link>For work</Link>
                    </li>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HeroSection;