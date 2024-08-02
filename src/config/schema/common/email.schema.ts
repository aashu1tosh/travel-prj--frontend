import * as Yup from 'yup';

export const EmailSchema = () => {
    const schema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
    });
    return schema;
};
