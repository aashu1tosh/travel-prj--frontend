import { phoneNumberRegex, positiveIntegerRegex } from '@constant/regex';
import * as Yup from 'yup';

export const TeamMemberSchema = () => {
    const schema = Yup.object({
        firstName: Yup.string().required('First name is  required'),

        lastName: Yup.string().required('Last name is  required'),

        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),

        phoneNumber: Yup.string()
            .optional()
            .matches(phoneNumberRegex, 'Invalid phone number'),

        position: Yup.string().required('Position required'),

        order: Yup.string()
            .required('Order is required')
            .matches(positiveIntegerRegex, 'Please provide a positive number'),

        media: Yup.string().optional(),
    });
    return schema;
};
