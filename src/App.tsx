import { OfficeSetupProvider } from '@context/OfficeSetupProvider';
import CompanyInfo from '@ui/admin/pages/companyInfo/CompanyInfo';
import AdminContactForm from '@ui/admin/pages/contactForm/AdminContactForm';
import Dashboard from '@ui/admin/pages/dashboard/Dashboard';
import SitePages from '@ui/admin/pages/sitePages/SitePages';
import TeamMembersList from '@ui/admin/pages/teamMembers/TeamMembersList';
import AdminTestimonialPage from '@ui/admin/pages/testimonials/AdminTestimonialPage';
import UserList from '@ui/admin/pages/usersList/UserList';
import AboutUs from '@ui/landingPage/pages/aboutUs/AboutUs';
import Contact from '@ui/landingPage/pages/contact/Contact';
import LandingPage from '@ui/landingPage/pages/landingPage/LandingPage';
import LandingTemplate from '@ui/landingPage/templates/landingTemplate/LandingTemplate';
import AdminProtectedRoute from 'AdminProtectedRoute';
import ErrorBoundary from 'Error.Boundary';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorPage from './ErrorPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingTemplate />,
            children: [
                {
                    path: '',
                    element: <LandingPage />,
                    index: true,
                },
                {
                    path: 'about_us',
                    element: <AboutUs />,
                },
                {
                    path: 'tours',
                    element: <Contact />,
                },
                {
                    path: 'destination',
                    element: <Contact />,
                },
                {
                    path: 'services',
                    element: <Contact />,
                },
                {
                    path: 'date_pricing',
                    element: <Contact />,
                },
                {
                    path: 'blog',
                    element: <Contact />,
                },
                {
                    path: 'contact',
                    element: <Contact />,
                },
            ],
        },
        {
            path: '/admin',
            element: <AdminProtectedRoute />,
            children: [
                {
                    path: '',
                    element: <Dashboard />,
                    index: true,
                },
                {
                    path: 'user-list',
                    element: <UserList />,
                },
                {
                    path: 'company-info',
                    element: <CompanyInfo />,
                },
                {
                    path: 'site-pages',
                    element: <SitePages />,
                },
                {
                    path: 'team-members',
                    element: <TeamMembersList />,
                },
                {
                    path: 'testimonials',
                    element: <AdminTestimonialPage />,
                },
                {
                    path: 'contact-form',
                    element: <AdminContactForm />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },
        {
            path: '*',
            element: <ErrorPage />,
        },
    ]);

    return (
        <>
            <OfficeSetupProvider>
                <ErrorBoundary>
                    <RouterProvider router={router} />
                </ErrorBoundary>
            </OfficeSetupProvider>
        </>
    );
}

export default App;
