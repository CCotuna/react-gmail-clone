import { Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from '../../components//layout/sidebar/Sidebar';
import Navigation from '../../components/layout/navigation/Navigation';
import PreLoader from '../../components/layout/preloader/PreLoader';
import AuthenticationForm from '../../components/AuthenticationForm';
import Home from '../../pages/Home';
import Inbox from '../../components/Inbox';
import Chat from '../../components/Chat';

const Router = () => {
    return (
        <>
            <Routes>
                    <Route path={"/"} element={<Layout />}>
                        <Route path={"mail"} element={<Inbox />} />
                        <Route path={"chat"} element={<Chat />} />
                    </Route>
                    <Route path="/login" element={<AuthenticationForm />} />
            </Routes>
        </>
    )
}

const Layout = () => {
    return(
        <div>
        <PreLoader />
        <div><Sidebar /></div>
        <div>
            <Navigation />
            <Outlet />
        </div>
    </div>
    )
}

export default Router;