import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

import Sidebar from '../../components/layout/sidebar/Sidebar';
import Navigation from '../../components/layout/navigation/Navigation';
import PreLoader from '../../components/layout/preloader/PreLoader';
import Authentication from '../../components/Authentication';
import Inbox from '../../components/Inbox';
import Chat from '../../components/Chat';
import Email from '../../components/Email';
import wallpaper from '../../assets/images/backgrounds/tempBg5.jpg';
import NavigationPanel from '../../components/layout/navigation/NavigationPanel';
import DisplayTempEmails from '../../components/DisplayTempEmails';

import Home from '../../pages/Home.jsx'

const Router = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PreLoader />;
    }

    return (
        <Routes>
        <Route
            path="/"
            element={user ? <Navigate to="/gmail" /> : <Home />}
        />

        <Route
            path="/login"
            element={user ? <Navigate to="/gmail" /> : <Authentication />}
        />

        <Route
            path="/gmail"
            element={user ? <Layout filter={filter} setFilter={setFilter} /> : <Navigate to="/login" />}
        >
            <Route index element={<Inbox filter={filter} />} />
            <Route path="mail" element={<Inbox filter={filter} />} />
            <Route path="mail/:emailId" element={<Email />} />
            <Route
                path="chat"
                element={
                    <div className="flex flex-col space-y-20 text-white">
                        <Chat />
                        <DisplayTempEmails />
                    </div>
                }
            />
        </Route>

        {/* Ruta fallback */}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    );
};

const Layout = ({ filter, setFilter }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isNavPanelOpen, setIsNavPanelOpen] = useState(false);

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
                <Sidebar setIsNavPanelOpen={setIsNavPanelOpen} />
                <div className="flex-grow ms-4 me-2">
                    <Navigation />
                    <div className="flex mt-2">
                        <div
                            className={`transition-all duration-200 ease-in-out ${isNavPanelOpen ? 'w-64' : 'w-0'
                                } overflow-hidden`}>
                            <NavigationPanel setFilter={setFilter} />
                        </div>
                        <div className="flex-grow">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Router;
