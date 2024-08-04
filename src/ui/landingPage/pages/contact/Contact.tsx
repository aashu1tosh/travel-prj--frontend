import { ContactFormSchema } from '@config/schema/common/contactForm.schema';
import { image } from '@constant/image';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@ui/common/atoms/button/Button';
import InputField from '@ui/common/atoms/inputField/InputField';
import Box from '@ui/common/molecules/box/Box';
import Hero from '@ui/landingPage/organisms/hero/Hero';
import useAPI from 'hooks/useAPI';
import { useOfficeSetup } from 'hooks/useOfficeSetup';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Contact.css';

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    check?: true;
}

type FormDataWithoutCheck = Omit<FormData, 'check'>;

const Contact = () => {
    const { officeSetup } = useOfficeSetup();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(ContactFormSchema()),
    });
    const { post } = useAPI<FormDataWithoutCheck | null>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { check, ...payload } = data;
        const response = await post({
            url: '/user/contact-form',
            data: payload,
        });
        if (response.status) reset();
    };

    return (
        <>
            <Hero />
            <div className='container'>
                <div className='contact-company-info'>
                    <h2>
                        Ready to Get our best Services! <br />
                        Feel free to contact with us
                    </h2>
                    <div className='contact-box'>
                        <Box
                            img={image?.location}
                            heading={'Location'}
                            p={
                                officeSetup?.contactInformation
                                    ?.location as string
                            }
                        />
                        <Box
                            img={image?.email}
                            heading={'Email'}
                            p={officeSetup?.contactInformation?.email as string}
                        />
                        <Box
                            img={image?.contact}
                            heading={'Contact'}
                            p={
                                (officeSetup?.contactInformation
                                    ?.phoneNumber as string) +
                                '\n' +
                                officeSetup?.contactInformation
                                    ?.secondaryPhoneNumber
                            }
                        />
                    </div>

                    <div className='contact-main'>
                        <div className='left'>
                            <h4>Contact With Us</h4>
                            <h2>
                                Have questions?{' '}
                                <span className='block'>
                                    Feel free to write us
                                </span>
                            </h2>
                        </div>
                        <div className='right'>
                            <div className='form-container'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='flex-space-between c-form-row'>
                                        <div>
                                            <InputField
                                                name={'fullName'}
                                                placeholder='Full Name'
                                                register={register}
                                                error={errors?.fullName}
                                            />
                                        </div>
                                        <div>
                                            <InputField
                                                name={'email'}
                                                placeholder='Email'
                                                register={register}
                                                error={errors?.email}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex-space-between c-form-row'>
                                        <div>
                                            <InputField
                                                name={'phoneNumber'}
                                                placeholder='Phone Number'
                                                register={register}
                                                error={errors?.phoneNumber}
                                            />
                                        </div>

                                        <div>
                                            <InputField
                                                name={'subject'}
                                                placeholder='Subject'
                                                register={register}
                                                error={errors?.subject}
                                            />
                                        </div>
                                    </div>
                                    <textarea
                                        // name='message'
                                        id=''
                                        placeholder='Message Please'
                                        className='message-box'
                                        {...register('message')}
                                    ></textarea>
                                    {errors.message && (
                                        <span className='red-text'>
                                            {errors?.message.message}
                                        </span>
                                    )}

                                    <div className='flex'>
                                        <input
                                            type='checkbox'
                                            id=''
                                            {...register('check')}
                                        />
                                        <p id='agreement'>
                                            I agree that my data is being stored
                                            and collected
                                        </p>
                                    </div>
                                    {errors.check && (
                                        <span className='red-text'>
                                            {errors?.check.message}
                                        </span>
                                    )}
                                    <Button
                                        type={'submit'}
                                        name={'Submit'}
                                        disabled={isSubmitting}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
