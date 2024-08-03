import Testimonials from '@ui/landingPage/molecules/testimonials/Testimonials';
import AboutSection from '@ui/landingPage/organisms/aboutSection/AboutSection';
import Hero from '@ui/landingPage/organisms/hero/Hero';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <>
            <Hero />
            <div className='container'>
                <AboutSection />
            </div>
            <Testimonials />
            <div className='container'>
                <AboutSection />
            </div>
        </>
    );
};

export default LandingPage;
