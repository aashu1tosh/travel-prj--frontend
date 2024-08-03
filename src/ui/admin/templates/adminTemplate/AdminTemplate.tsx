import Navbar from '@ui/admin/organisms/navbar/Navbar';
import Sidebar from '@ui/admin/organisms/sidebar/Sidebar';
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
