import React, { useEffect} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { FloatButton, notification, Button } from "antd";
import { ArrowUpOutlined } from '@ant-design/icons';

function UserLayout() {
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
    try {
        const token = localStorage.getItem('accessToken');
        const rawUser = localStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;
        const isAdmin = user?.role === 'admin';

        if (!token && isAdmin && location.pathname.startsWith('/admin')) {
            navigate('/admin', {replace: true});
        }
    } catch {}
    }, [location.pathname, navigate])

    return (
        <div className='App'>
            <Navigation />
            <main className='main-content'>
                <Outlet />
            </main>
            <Footer />
            <FloatButton.BackTop icon={<ArrowUpOutlined />} />
        </div>
    )
}

export default UserLayout
