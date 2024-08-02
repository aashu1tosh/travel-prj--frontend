import { passwordRegex } from '@constant/regex';
import * as Yup from 'yup';

export const LoginSchema = () => {

    const schema = Yup.object({
        email: Yup.string()
            .required(
                'Email/username required')
            .email('Invalid email/username'),

        password: Yup.string()
            .required('Password is required')
            .matches(passwordRegex, 'Password should be strong')

    });
    return schema;
};
