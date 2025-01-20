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
import NavigationPanel from '../../components/layout/navigation/NavigationPanel';

import defaultBackground from '../../assets/images/backgrounds/tempBg8.jpg';

import Home from '../../pages/Home.jsx'
import ChatList from '../../components/ChatList.jsx';
import { loadBackground } from '@/utils/background/backgroundFunctions';
import Settings from '../../components/ui/Settings.jsx';

import ComposeBox from '../../components/ComposeBox.jsx';

const Router = () => {
    const [user, setUser] = useState(null);
    const [filter, setFilter] = useState('all');
    const [introComplete, setIntroComplete] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [wallpaper, setWallpaper] = useState(defaultBackground);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    console.log(defaultBackground, 'wallpaper');

    useEffect(() => {
        const introTimer = setTimeout(() => {
            setIntroComplete(true);
        }, 2000);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthChecked(true);
            if (currentUser) {
                loadBackground(setWallpaper, defaultBackground);
            } else {
                setWallpaper(defaultBackground);
            }
        });

        return () => {
            clearTimeout(introTimer);
            unsubscribe();
        };
    }, []);

    if (!introComplete || (!user && !authChecked)) {
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
                element={user ? <Layout filter={filter} setFilter={setFilter} isComposeOpen={isComposeOpen} setIsComposeOpen={setIsComposeOpen} wallpaper={wallpaper} setWallpaper={setWallpaper} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} /> : <Navigate to="/login" />}
            >
                <Route index element={<Inbox filter={filter} isComposeOpen={isComposeOpen} setIsComposeOpen={setIsComposeOpen} />} />
                <Route path="mail" element={<Inbox filter={filter} isComposeOpen={isComposeOpen} setIsComposeOpen={setIsComposeOpen} isSettingsOpen={isSettingsOpen} />} />
                <Route path="mail/:emailId" element={<Email />} />
                <Route path="chat" element={<ChatList />} />
                <Route path="chat/:conversationId" element={<Chat />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const Layout = ({ filter, setFilter, isComposeOpen, setIsComposeOpen, wallpaper, setWallpaper, isSettingsOpen, setIsSettingsOpen }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isNavPanelOpen, setIsNavPanelOpen] = useState(false);

    console.log(wallpaper)

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
                    backgroundImage: wallpaper ? `url(${wallpaper})` : 'none',
                    backgroundAttachment: 'fixed',
                }}
            >
                {!wallpaper && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900 to-white" />
                )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-10" />
            <div className="flex z-10 relative">
                <Sidebar setIsNavPanelOpen={setIsNavPanelOpen} />
                <div className="flex-grow ms-4 me-2">
                    <Navigation setIsSettingsOpen={setIsSettingsOpen} />
                    <div className="flex mt-2">
                        <div
                            className={`transition-all duration-200 ease-in-out ${isNavPanelOpen ? 'w-64' : 'w-0'
                                } overflow-hidden`}>
                            <NavigationPanel setFilter={setFilter} setIsComposeOpen={setIsComposeOpen} />
                        </div>
                        <div className="flex-grow">
                            <Outlet />
                        </div>
                        <div className={`${isSettingsOpen ? 'w-64' : 'w-0'
                            } overflow-hidden`}>
                            <Settings setWallpaper={setWallpaper} />
                        </div>
                    </div>
                </div>
            </div>
            {isComposeOpen && (
                <div className="absolute bottom-4 right-4 z-40">
                    <ComposeBox onClose={() => setIsComposeOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Router;
