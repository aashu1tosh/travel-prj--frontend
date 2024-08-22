import { MediaType } from '@constant/enum';
import { officeSetupData } from '@context/OfficeSetupProvider';
import { companyInformationLabel } from '@data/map';
import useAPI from '@hooks/useAPI';
import { useOfficeSetup } from '@hooks/useOfficeSetup';
import { ICompany } from '@interface/company.interface';
import { IMedia } from '@interface/media.interface';
import Button from '@ui/common/atoms/button/Button';
import DragAndDrop from '@ui/common/atoms/dragAndDrop/DragAndDrop';
import LabeledInput from '@ui/common/molecules/labeledInput/LabeledInput';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CompanyInformationForm = () => {
    const { officeSetup, changeOfficeSetup } = useOfficeSetup();
    const { post } = useAPI<ICompany>();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<ICompany>();

    const [mediaId, setMediaId] = useState<string>('');

    useEffect(() => {
        reset(officeSetup?.company);
    }, [officeSetup, reset]);

    const companyUpdate = async (data: ICompany) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, id, ...payload } = data;
        if (mediaId) payload.media = mediaId as unknown as IMedia;
        else payload.media = data?.media?.id as unknown as IMedia;
        const response = await post({ url: '/company', data: payload });

        if (response?.status) {
            const tempData = officeSetup as officeSetupData;
            if (tempData) tempData.company = response?.data as ICompany;
            changeOfficeSetup(tempData);
        }
    };

    const readOnlyKeys = ['id', 'createdAt', 'logoUrl', 'media'];
    const skipKeys = ['id', 'createdAt', 'logoUrl', 'media'];

    return (
        <form onSubmit={handleSubmit(companyUpdate)}>
            <div className='main-form'>
                {officeSetup &&
                    Object.entries(officeSetup?.company)?.map(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        ([key, _value]) => {
                            const readOnly = readOnlyKeys?.includes(key);
                            if (skipKeys?.includes(key)) return null;
                            return (
                                <div
                                    className='label-input-wrapper'
                                    key={Math?.random()}
                                >
                                    <LabeledInput
                                        name={key}
                                        label={companyInformationLabel[key]}
                                        key={key}
                                        register={register}
                                        readOnly={readOnly}
                                    />
                                </div>
                            );
                        }
                    )}
                <p>Current Logo:</p>
                {
                    <img
                        src={officeSetup?.company?.media?.path}
                        alt=''
                        className='logo'
                    />
                }
            </div>
            <p>If you want to upload a new logo</p>
            <DragAndDrop setMedia={setMediaId} type={MediaType?.LOGO} />
            <div className='button-wrapper'>
                <Button name={'Submit'} disabled={isSubmitting} />
            </div>
        </form>
    );
};

export default CompanyInformationForm;
