import GoBackButton from '@ui/common/atoms/goBackButton/GoBackButton';
import 'ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className='error-container'>
            <h1 className='error-code'>404</h1>
            <p className='error-message'>Oops! Page Not Found</p>
            <p className='error-description'>
                The page you're looking for doesn't exist.
            </p>
            <GoBackButton />
        </div>
    );
};

export default ErrorPage;
