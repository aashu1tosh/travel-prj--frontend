import Navbar from '@ui/admin/organisms/Navbar/Navbar';
import Sidebar from '@ui/admin/organisms/Sidebar.tsx/Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminTemplate.css';

const AdminTemplate = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='main-content'>
                <Outlet />
            </div>
        </>
    );
};

export default AdminTemplate;
