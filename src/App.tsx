import { OfficeSetupProvider } from '@context/OfficeSetupProvider';
import Dashboard from '@ui/admin/pages/dashboard/Dashboard';
import AboutUs from '@ui/landingPage/pages/aboutUs/AboutUs';
import Contact from '@ui/landingPage/pages/contact/Contact';
import LandingPage from '@ui/landingPage/pages/landingPage/LandingPage';
import LandingTemplate from '@ui/landingPage/templates/landingTemplate/LandingTemplate';
import AdminProtectedRoute from 'AdminProtectedRoute';
import ErrorBoundary from 'Error.Boundary';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';

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
                }
            ],
        },
        {
            path: '/admin',
            element: <AdminProtectedRoute />,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                    index: true,
                },
            ]
        },
        {
            path: '*',
            element: <>Not Found</>,
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
