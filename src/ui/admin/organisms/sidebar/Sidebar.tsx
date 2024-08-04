import React, { Suspense, lazy, useState } from 'react';
import { CgWebsite } from 'react-icons/cg';
import { FaInfoCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { FaWpforms } from 'react-icons/fa6';
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { TbLetterT } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface Route {
    path: string;
    title: string;
    icon?: React.ReactNode; // or React.ComponentType
}

const ConfirmationModal = lazy(
    () => import('@ui/common/organisms/confirmationModal/ConfirmationModal')
);

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const confirmLogout = () => {
        openModal();
    };

    const logout = async () => {
        localStorage.removeItem('accessToken');
        closeModal();
        navigate('/');
    };

    const routes: Route[] = [
        {
            path: '/admin',
            title: 'Dashboard',
            icon: <FaTachometerAlt />,
        },
        {
            path: '/admin/user-list',
            title: 'User lists',
            icon: <MdAdminPanelSettings />,
        },
        {
            path: '/admin/company-info',
            title: 'Company Info',
            icon: <FaInfoCircle />,
        },
        {
            path: '/admin/site-pages',
            title: 'Site Pages',
            icon: <CgWebsite />,
        },
        {
            path: '/admin/team-members',
            title: 'Team Members',
            icon: <RiTeamFill />,
        },
        {
            path: '/admin/testimonials',
            title: 'Testimonials',
            icon: <TbLetterT />,
        },
        {
            path: '/admin/contact-form',
            title: 'Contact Forms',
            icon: <FaWpforms />,
        },
    ];

    return (
        <>
            <div id='unique-sidebar' className={'sidebar open'}>
                <div className='sidebar-content'>
                    {routes.map((val, idx) => (
                        <Link to={`${val.path}`} key={idx}>
                            <li key={idx}>
                                {val?.icon} {val.title}
                            </li>
                        </Link>
                    ))}
                    <li onClick={confirmLogout}>
                        <FaSignOutAlt /> Logout
                    </li>
                </div>
            </div>

            {isModalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <ConfirmationModal
                        open={true}
                        onClose={closeModal}
                        onConfirm={logout}
                        title='Are you sure?'
                        message='You want to logout from the system'
                    />
                </Suspense>
            )}
        </>
    );
};

export default Sidebar;
