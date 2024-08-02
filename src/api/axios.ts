import encryptDecrypt from '@functions/encryptDecrypt';
import axios from 'axios';
const { decrypt } = encryptDecrypt;

const getToken = () => {
    const token = localStorage.getItem('accessToken') ?? '{}';
    const accessToken = decrypt(token) ?? '';
    return accessToken as string;
};

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
AxiosInstance.interceptors.request.use(async (config: any) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
});

export default AxiosInstance;
