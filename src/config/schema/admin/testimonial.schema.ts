import { positiveIntegerRegex } from '@constant/regex';
import * as Yup from 'yup';

export const TestimonialSchema = () => {
    const schema = Yup.object({
        fullName: Yup.string().required('Full name is  required'),

        testimonial: Yup.string().required('Testimonial is required'),

        rating: Yup.string()
            .required('Rating is required')
            .matches(positiveIntegerRegex, 'Number from 1 to 5 required'),

        reviewerLocation: Yup.string().required(
            'Reviewers location is required'
        ),

        media: Yup.string().optional(),
    });
    return schema;
};
