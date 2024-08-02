import encryptDecrypt from '@functions/encryptDecrypt';
import AdminTemplate from '@ui/admin/templates/adminTemplate/AdminTemplate';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = encryptDecrypt.decrypt(localStorage.getItem('accessToken') as string);
    if (token) {
        return <AdminTemplate />;
    } else
        return <Navigate to="/" replace />;
};

export default ProtectedRoute;