import { image } from '@constant/image';
import React from 'react';
import { Link } from 'react-router-dom';
// import ThemeToggleButton from 'ui/atom/ThemeToggleButton/ThemeToggleButton';
import { useOfficeSetup } from 'hooks/useOfficeSetup';
import moment from 'moment';
import './Navbar.css';

const Navbar: React.FC = () => {
    const { officeSetup } = useOfficeSetup();
    return (
        <div id='unique-navbar'>
            <div>
                <p>Welcome Admin</p>
            </div>
            <Link to='/'>
                <div className='navbar-logo'>
                    <img
                        src={officeSetup?.company?.media?.path || image?.logo}
                        alt='Logo'
                    />
                </div>
            </Link>

            <div className='navbar-links'>
                <li>{moment().format('YYYY-MM-DD HH:mm:ss')}</li>
            </div>
        </div>
    );
};

export default Navbar;
