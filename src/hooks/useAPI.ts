// import axios from '@api/axois'
import axios from '@api/axios';
import { toast } from '@ui/common/molecules/toast/ToastManger';

interface IAxiosError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

interface IResponse<T> {
    status: boolean;
    message: string;
    data: T | null;
}

const useAPI = <T>() => {
    const get = async ({ url, toastShow = false }: { url: string, toastShow?: boolean }): Promise<IResponse<T>> => {
        try {
            const response = await axios.get(url);
            {
                toastShow && toast.show({
                    title: 'Operation Successful',
                    content: response?.data?.message as string,
                    duration: 5000,
                    type: 'success'
                });
            }
            return {
                status: true,
                message: response?.data?.message,
                data: response?.data?.data as T,
            };
        } catch (err: unknown) {
            const error = err as IAxiosError;
            {
                toastShow && toast.show({
                    title: 'Operation Successful',
                    content: error?.response?.data?.message as string,
                    duration: 5000,
                    type: 'error'
                });
            }
            return {
                status: false,
                message: error?.response?.data?.message as string,
                data: null,
            };
        }
    };

    const post = async ({
        url,
        toastShow = false,
        data,
    }: {
        url: string;
        toastShow?: boolean;
        data: T;
    }): Promise<IResponse<T>> => {
        try {
            const response = await axios.post(url, data);

            {
                toastShow && toast.show({
                    title: 'Operation Successful',
                    content: response?.data?.message as string,
                    duration: 5000,
                    type: 'success'
                });
            }

            return {
                status: true,
                message: response?.data?.message,
                data: response?.data?.data as T,
            };
        } catch (err: unknown) {
            const error = err as IAxiosError;
            console.log("🚀 ~ useAPI ~ error:", error)

            {
                toastShow && toast.show({
                    title: 'Operation Failed',
                    content: error?.response?.data?.message as string,
                    duration: 5000,
                    type: 'error'
                });
            }
            return {
                status: false,
                message: error?.response?.data?.message as string,
                data: null,
            };
        }
    };

    return { get, post };
};

export default useAPI;
