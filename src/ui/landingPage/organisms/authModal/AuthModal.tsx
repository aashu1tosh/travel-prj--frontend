import { LoginSchema } from '@config/schema/common/auth.schema';
// import EncryptDecrypt from '@functions/encryptDecrypt';
import { image } from '@constant/image';
import encryptDecrypt from '@functions/encryptDecrypt';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUser } from '@interface/user.interface';
import Button from '@ui/common/atoms/button/Button';
import InputField from '@ui/common/atoms/inputField/InputField';
import Modal from '@ui/common/organisms/modal/Modal';
import useAPI from 'hooks/useAPI';
import { useOfficeSetup } from 'hooks/useOfficeSetup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './AuthModal.css';

interface FormData {
    email: string;
    password: string;
}

interface AuthModalProps {
    onClose: () => void;
}

const AuthModal = (props: AuthModalProps) => {
    const { onClose } = props;
    const { officeSetup } = useOfficeSetup();
    const { post } = useAPI<FormData | IUser>();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<FormData>({
        resolver: yupResolver(LoginSchema()),
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const response = await post({
            url: '/auth/login',
            data: data as FormData,
            toastShow: true,
        });
        const resData = response.data as IUser;
        const token = resData?.tokens?.accessToken as string;
        if (response.status) {
            localStorage.setItem(
                'accessToken',
                encryptDecrypt.encrypt(token) as string
            );
            navigate('/admin');
        }
    };

    return (
        <Modal open={true} onClose={onClose}>
            <div className='auth-modal'>
                <h1>Welcome</h1>

                <div className='logo-wrapper'>
                    <img src={officeSetup?.company?.media?.path || image?.logo} alt='' />
                </div>
                <p className='site-color'>{officeSetup?.company?.slogan}</p>

                <div className='auth-sign-in'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            placeholder='Enter your email'
                            name='email'
                            register={register}
                            error={errors?.email}
                        />

                        <InputField
                            placeholder='Enter your password'
                            name='password'
                            type='password'
                            register={register}
                            error={errors?.password}
                        />

                        <Button
                            type={'submit'}
                            name='Login'
                            disabled={isSubmitting}
                        ></Button>
                    </form>
                    <p>Forgot Password?</p>
                </div>
            </div>
        </Modal>
    );
};

export default AuthModal;
