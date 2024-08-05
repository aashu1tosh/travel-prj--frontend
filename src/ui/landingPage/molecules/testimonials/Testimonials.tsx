import { image } from '@constant/image';
import {
    ITestimonial,
    ITestimonialResponse,
} from '@interface/testimonial.interface';
import Button from '@ui/common/atoms/button/Button';
import RatingStars from '@ui/landingPage/atoms/ratingStars/RatingStars';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const { get } = useAPI<ITestimonialResponse>();
    const [testimonial, setTestimonial] = useState<ITestimonial[] | null>();

    const fetchData = async () => {
        const response = await get({
            url: `/testimonial?page=${1}&perpage=${1}`,
        });
        if (response.status) setTestimonial(response?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='testimonials'>
            <div className='container testimonials-container'>
                <div className='left'>
                    <h4>
                        <i>Testimonials</i>
                    </h4>
                    <h2>What they’re talking about our Policy</h2>
                    <div className='button-wrapper'>
                        <Button name={'All Testimonials'}></Button>
                    </div>
                </div>

                <div className='right'>
                    {testimonial ? (
                        <div>
                            <p className='main-testimonial'>
                                {testimonial[0].testimonial}
                            </p>
                            <RatingStars rating={testimonial[0].rating} />
                            <p>{testimonial[0].fullName}</p>
                            <p>{testimonial[0].reviewerLocation}</p>
                            <div className='border-wrapper'>
                                {testimonial[0].media ? (
                                    <img
                                        src={testimonial[0].media.path}
                                        className='profile'
                                    />
                                ) : (
                                    <img
                                        src={image?.userFallback}
                                        className='profile'
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>No testimonials available</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
