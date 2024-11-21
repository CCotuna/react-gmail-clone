import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import Navigation from '../../components/layout/navigation/Navigation';
import PreLoader from '../../components/layout/preloader/PreLoader';
import AuthenticationForm from '../../components/AuthenticationForm';
import Inbox from '../../components/Inbox';
import Chat from '../../components/Chat';
import Email from '../../components/Email';

import wallpaper from '../../assets/images/backgrounds/tempBg5.jpg';
import NavigationPanel from '../../components/layout/navigation/NavigationPanel';
import DisplayTempEmails from '../../components/DisplayTempEmails';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Inbox />} />
                <Route path="mail" element={<Inbox />} />
                <Route path="chat" element={<>
                    <div className='flex flex-col space-y-20 text-white'>
                    <Chat />
                    <DisplayTempEmails />
                    </div>
                    </>} />
                <Route path="email-details" element={<Email />} />
            </Route>
            <Route path="/login" element={<AuthenticationForm />} />
        </Routes>
    );
};

const Layout = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer); 
    }, []);

    if (isLoading) {
        return <PreLoader />;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundAttachment: 'fixed',
                }}
            />

            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-10" />
            
            <div className="flex z-10 relative">
                <Sidebar />
                <div className="flex-grow ms-4 me-2">
                    <Navigation />
                    <div className='flex mt-2'>
                        <NavigationPanel />
                        
                        <div className=' w-full'>
                        <Outlet />
                        {/* <NavigationPanel /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Router;
