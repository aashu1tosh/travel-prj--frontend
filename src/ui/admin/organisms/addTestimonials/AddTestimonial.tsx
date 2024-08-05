import { TestimonialSchema } from '@config/schema/admin/testimonial.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import useAPI from '@hooks/useAPI';
import { IMedia } from '@interface/media.interface';
import {
    ITestimonial,
    ITestimonialReq,
} from '@interface/testimonial.interface';
import Button from '@ui/common/atoms/button/Button';
import DragAndDrop from '@ui/common/atoms/dragAndDrop/DragAndDrop';
import InputField from '@ui/common/atoms/inputField/InputField';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddTestimonial.css';

interface AddTestimonialProps {
    setTestimonials: Dispatch<SetStateAction<ITestimonial[] | undefined>>;
}

const AddTestimonial: React.FC<AddTestimonialProps> = ({ setTestimonials }) => {
    const { post } = useAPI<ITestimonial>();
    const [media, setMedia] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm<ITestimonialReq>({
        resolver: yupResolver(TestimonialSchema()),
    });

    const onSubmit = async (data: ITestimonialReq) => {
        const payload: ITestimonial = data as unknown as ITestimonial;
        payload.media = media as unknown as IMedia;
        payload.rating = parseInt(payload.rating as unknown as string);

        const response = await post({
            url: '/testimonial',
            data: payload,
            toastShow: true,
        });
        if (response.status) {
            const newTestimonial = response.data as ITestimonial;
            setTestimonials((prevTestimonials) => {
                if (prevTestimonials) {
                    return [...prevTestimonials, newTestimonial];
                } else {
                    return [newTestimonial];
                }
            });
            reset();
        }
    };

    return (
        <div className='add-testimonials'>
            <h2 className='custom-h'>Add Testimonials</h2>
            <p>
                <strong>Please enter the details of the Testimonial</strong>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        name={'fullName'}
                        placeholder='Full name'
                        required='true'
                        register={register}
                        error={errors?.fullName}
                    />
                    <InputField
                        name={'testimonial'}
                        placeholder='Enter testimonial'
                        required='true'
                        register={register}
                        error={errors?.testimonial}
                    />
                </div>

                <div>
                    <InputField
                        name={'rating'}
                        placeholder='Rating of our service'
                        required='true'
                        register={register}
                        error={errors?.rating}
                        type='number'
                    />
                    <InputField
                        name={'reviewerLocation'}
                        placeholder='Enter reviewers location'
                        register={register}
                        error={errors?.reviewerLocation}
                    />
                </div>

                <DragAndDrop setMedia={setMedia}></DragAndDrop>
                <Button type='submit' name={'Submit'} disabled={isSubmitting} />
            </form>
        </div>
    );
};

export default AddTestimonial;
