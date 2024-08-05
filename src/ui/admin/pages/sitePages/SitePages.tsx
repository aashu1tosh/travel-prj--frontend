import { pageMapLabel } from '@data/map';
import useAPI from '@hooks/useAPI';
import {
    IHeroData,
    IHeroDataAdmin,
    IHeroDataPayload,
} from '@interface/heroData.interface';
import Button from '@ui/common/atoms/button/Button';
import DragAndDrop from '@ui/common/atoms/dragAndDrop/DragAndDrop';
import SelectOption from '@ui/common/atoms/selectOption/SelectOption';
import LabeledInput from '@ui/common/molecules/labeledInput/LabeledInput';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './SitePage.css';

const SitePages = () => {
    const { post } = useAPI<IHeroDataPayload>();
    const [heroData, setHeroData] = useState<IHeroData | null>();
    const { get } = useAPI<IHeroData>();
    const [page, setPage] = useState<string>('home');
    const [media, setMedia] = useState<string>('');

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm<IHeroDataAdmin>({
        defaultValues: {
            slogan: heroData?.slogan,
        },
    });

    const options = Object.entries(pageMapLabel).map(([value, label]) => ({
        label,
        value,
    }));

    const onSubmit = async (data: IHeroDataAdmin) => {
        const payload: IHeroDataPayload = data as unknown as IHeroDataPayload;
        payload.media = media;
        const response = await post({
            url: '/page',
            toastShow: true,
            data: payload,
        });
        if (response.status) {
            const newData = response.data as unknown as IHeroData;
            setHeroData(newData);
        }
    };

    const fetchData = async () => {
        try {
            const response = await get({ url: `/page/${page}` });
            if (response.status) {
                setHeroData(response.data);
                reset({
                    slogan: response?.data?.slogan,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const onChangeClicked = (e: FormEvent<HTMLDivElement>) => {
        const event = e as unknown as ChangeEvent<HTMLInputElement>;
        setPage(event.target.value);
    };

    return (
        <div>
            <h1 className='custom-h'>Site Pages</h1>

            <div className='site-page-main'>
                <div onChange={(e) => onChangeClicked(e)}>
                    <SelectOption
                        label='Select a Page'
                        name='page'
                        options={options}
                        // options={}
                        register={register}
                        error={errors?.page}
                    />
                </div>
                <br />
                <br />

                <p>Something like this is being displayed in the site</p>

                <div className='hero-admin-display'>
                    <div className='hero-admin-img'>
                        <img src={heroData?.media?.path} alt='' />

                        <div className='hero-admin-text container'>
                            <h3>{pageMapLabel[heroData?.page as string]}</h3>
                            <p>{heroData?.slogan}</p>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <p>
                    If you like to change the image or slogan below section will
                    help you
                </p>
                <br />
                <br />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <LabeledInput
                        label={'Slogan for page'}
                        name={'slogan'}
                        placeholder='Enter a slogan'
                        register={register}
                    />
                    <DragAndDrop setMedia={setMedia} />
                    <Button
                        type='submit'
                        name={'Submit'}
                        disabled={isSubmitting}
                    />
                </form>
            </div>
        </div>
    );
};

export default SitePages;
