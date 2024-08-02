import { phoneNumberRegex } from '@constant/regex';
import * as Yup from 'yup';

export const ContactFormSchema = () => {
    const schema = Yup.object({
        fullName: Yup.string().required('Full Name is required'),

        phoneNumber: Yup.string()
            .required('Phone is required')
            .matches(phoneNumberRegex, 'Phone Number should be valid'),

        subject: Yup.string().required('Subject is required'),

        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),

        message: Yup.string().required('Message is required'),

        check: Yup.boolean().isTrue('Check agreement'),
    });
    return schema;
};
