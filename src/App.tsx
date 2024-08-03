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
import ErrorPage from './ErrorPage';
import UserList from '@ui/admin/pages/usersList/UserList';

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
