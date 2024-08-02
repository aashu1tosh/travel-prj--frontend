import Hero from '@ui/landingPage/organisms/hero/Hero';
import './LandingPage.css';
import Testimonials from '@ui/landingPage/molecules/testimonials/Testimonials';

const LandingPage = () => {
    return (
        <>
            <Hero />
            <div className='container'></div>
            <Testimonials />
            <div className='container'></div>
        </>
    );
};

export default LandingPage;
