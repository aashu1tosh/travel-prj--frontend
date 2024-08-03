import React from 'react';
import { FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <>
            <div id='unique-sidebar' className={'sidebar open'}>
                <div className='sidebar-content'>
                    <Link to='/admin'>
                        {' '}
                        <li>
                            <FaTachometerAlt /> Dashboard
                        </li>
                    </Link>
                    <Link to='/admin/user-list'>
                        <li>
                            {' '}
                            <MdAdminPanelSettings /> User List
                        </li>
                    </Link>
                    <Link to='/admin/update-password'>
                        <li>Update Password</li>
                    </Link>
                    <li>
                        <FaSignOutAlt /> Logout
                    </li>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
