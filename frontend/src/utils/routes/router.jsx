import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import Navigation from '../../components/layout/navigation/Navigation';
import PreLoader from '../../components/layout/preloader/PreLoader';
import AuthenticationForm from '../../components/AuthenticationForm';
import Inbox from '../../components/Inbox';
import Chat from '../../components/Chat';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Inbox />} />
                <Route path="mail" element={<Inbox />} />
                <Route path="chat" element={<Chat />} />
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
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <Navigation />
                <Outlet />
            </div>
        </div>
    );
};

export default Router;
