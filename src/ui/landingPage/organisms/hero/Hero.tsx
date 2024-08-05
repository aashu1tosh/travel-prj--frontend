import { image } from '@constant/image';
import { pageMapLabel } from '@data/map';
import { IHeroData } from '@interface/heroData.interface';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
    const [heroData, setHeroData] = useState<IHeroData | null>();
    const { get } = useAPI<IHeroData>();

    const location = useLocation();
    const page =
        (location.pathname as string) === '/'
            ? 'home'
            : (location.pathname as string);

    const fetchData = async () => {
        try {
            const response = await get({ url: `/page/${page}` });
            if (response.status) {
                setHeroData(response.data);
            }
        } catch (error) {
            console.log('fetchData', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return (
        <div className='hero'>
            <div className='hero-img'>
                <img
                    src={heroData?.media?.path || image?.heroFallback}
                    alt=''
                />
                {/* <img src={image?.test7} alt='' /> */}

                <div className='hero-text container'>
                    <h3>{pageMapLabel[heroData?.page as string]}</h3>
                    <p>{heroData ? heroData?.slogan : 'Explore with us'}</p>
                </div>
            </div>
        </div>
    );
};

export default Hero;
