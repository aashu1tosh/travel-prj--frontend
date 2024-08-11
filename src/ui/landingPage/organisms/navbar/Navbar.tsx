import { image } from '@constant/image';
import { useOfficeSetup } from 'hooks/useOfficeSetup';
import { Suspense, lazy, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Lazy load the modal component
const AuthModal = lazy(
    () => import('@ui/landingPage/organisms/authModal/AuthModal')
);

const Navbar = () => {
    const { officeSetup } = useOfficeSetup();
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    };
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
        toggleMenu();
    };
    const closeModal = () => setIsModalOpen(false);

    interface Route {
        path: string;
        title: string;
    }

    const routes: Route[] = [
        {
            path: '/',
            title: 'Home',
        },
        {
            path: '/about_us',
            title: 'About Us',
        },
        {
            path: '/tours',
            title: 'Tours Page',
        },
        {
            path: '/destination',
            title: 'Destination',
        },
        {
            path: '/services',
            title: 'Services',
        },
        {
            path: '/date_pricing',
            title: 'Date & Pricing',
        },
        {
            path: '/blog',
            title: 'Blog',
        },
        {
            path: '/contact',
            title: 'Contact',
        },
    ];

    return (
        <>
            <nav className={`container`}>
                <a href='/'>
                    <img
                        alt=''
                        src={
                            `${officeSetup?.company?.media?.path}` ||
                            image?.logo
                        }
                        className='logo'
                    />
                </a>

                <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                    {routes.map((val, idx) => (
                        <Link to={`${val.path}`} key={idx}>
                            <li key={idx} onClick={toggleMenu}>
                                {val.title}
                            </li>
                        </Link>
                    ))}
                    <li className='icons' onClick={openModal}>
                        <FaRegUserCircle />
                    </li>
                </ul>
                <span className='menu-icon' onClick={toggleMenu}>
                    <GiHamburgerMenu />
                </span>
            </nav>

            {isModalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <AuthModal onClose={closeModal}></AuthModal>
                </Suspense>
            )}
        </>
    );
};

export default Navbar;
