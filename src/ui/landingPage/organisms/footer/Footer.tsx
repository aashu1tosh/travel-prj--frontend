import { EmailSchema } from '@config/schema/common/email.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import FacebookIcon from '@ui/common/atoms/FacebookIcon';
import InstagramIcon from '@ui/common/atoms/InstagramIcon';
import TwitterIcon from '@ui/common/atoms/TwitterIcon';
import { useOfficeSetup } from 'hooks/useOfficeSetup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { HiPaperAirplane } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import './Footer.css';

interface IEmail {
    email: string;
}

const Footer = () => {
    const { officeSetup } = useOfficeSetup();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<IEmail>({
        resolver: yupResolver(EmailSchema()),
    });

    const submitNewLetter: SubmitHandler<IEmail> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <footer className='container footer'>
            <div id='footer-1'>
                <img
                    src={officeSetup?.company?.media?.path}
                    alt=''
                    className='logo'
                />
                <p id='description'>{officeSetup?.company?.description}</p>
            </div>
            <div id='footer-2'>
                <h3>POPULAR DESTINATION</h3>
            </div>
            <div id='footer-3'>
                <h3>CONTACT INFORMATION</h3>
                <h5>Information Care Pvt. Ltd</h5>
                <ul>
                    <li>
                        <div className='list'>
                            <div className='icons'>{<FaMapMarkerAlt />}</div>
                            <div>
                                {officeSetup?.contactInformation?.location}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='list'>
                            <div className='icons'>{<FaPhoneAlt />}</div>
                            <div>
                                {officeSetup?.contactInformation?.phoneNumber}
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className='list'>
                            <div className='icons'>{<MdEmail />}</div>
                            <div>{officeSetup?.contactInformation?.email}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div id='footer-4'>
                <h3>NEWS LETTER</h3>
                <p>Subscribe our newsletter to get our latest update & news.</p>

                <form onSubmit={handleSubmit(submitNewLetter)}>
                    <div className='input-wrapper'>
                        <input
                            type='text'
                            placeholder='Email Address'
                            {...register('email')}
                        />
                        <button
                            type='submit'
                            className='plane-icon'
                            disabled={isSubmitting}
                        >
                            <HiPaperAirplane
                                size={19}
                                style={{ transform: 'rotate(45deg)' }}
                            />
                        </button>
                    </div>
                </form>
                {errors.email && (
                    <span className='red-text'>{errors.email.message}</span>
                )}

                <p>
                    I agree to all terms and policies by providing email address
                </p>

                <div className='social'>
                    <a
                        href={officeSetup?.contactInformation?.facebookLink}
                        target='_black'
                    >
                        <span>
                            <FacebookIcon />
                        </span>
                    </a>
                    <a
                        href={officeSetup?.contactInformation?.instagramLink}
                        target='_black'
                    >
                        <span>
                            <InstagramIcon />
                        </span>
                    </a>
                    <a
                        href={officeSetup?.contactInformation?.twitterLink}
                        target='_black'
                    >
                        <span>
                            <TwitterIcon />
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
