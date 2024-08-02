import Footer from '@ui/landingPage/organisms/footer/Footer';
import Navbar from '@ui/landingPage/organisms/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const LandingTemplate = () => {
    return (
        <>
            <div
                style={{
                    overflowX: 'hidden',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'sticky',
                        top: '0',
                        zIndex: 99,
                    }}
                >
                    <Navbar />
                </div>
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default LandingTemplate;
