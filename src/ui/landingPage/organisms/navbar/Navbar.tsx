import { useOfficeSetup } from 'hooks/useOfficeSetup';
import { Suspense, lazy, useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import './Navbar.css';


// Lazy load the modal component
const AuthModal = lazy(() => import('@ui/landingPage/organisms/authModal/AuthModal'));

const Navbar = () => {
    const { officeSetup } = useOfficeSetup();
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    const toggleMenu = () => {
        mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
    };
    const [sticky, setSticky] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 25 ? setSticky(true) : setSticky(false);
        });
    }, []);

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
            <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
                <a href='/'>
                    <img alt='' src={`${officeSetup?.logoUrl}`} className='logo' />
                </a>

                <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                    {routes.map((val, idx) => (
                        <Link to={`${val.path}`} key={idx}>
                            <li key={idx}>{val.title}</li>
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

            {
                isModalOpen && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthModal onClose={closeModal}>
                        </AuthModal>
                    </Suspense>
                )
            }
        </>
    );
};

export default Navbar;
