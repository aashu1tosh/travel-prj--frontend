import { officeSetupData } from '@context/OfficeSetupProvider';
import { companyContactInformationLabel } from '@data/map';
import useAPI from '@hooks/useAPI';
import { useOfficeSetup } from '@hooks/useOfficeSetup';
import { ICompanyInfo } from '@interface/company.interface';
import Button from '@ui/common/atoms/button/Button';
import MapComponent from '@ui/common/atoms/mapComponent/MapComponent';
import LabeledInput from '@ui/common/molecules/labeledInput/LabeledInput';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CompanyContactInformationForm = () => {
    const { patch } = useAPI();
    const { officeSetup, changeOfficeSetup } = useOfficeSetup();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<ICompanyInfo>();

    useEffect(() => {
        reset(officeSetup?.contactInformation);
    }, [officeSetup, reset]);

    const companyInfoUpdate = async (data: ICompanyInfo) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, ...payload } = data;
        payload.lat = officeSetup?.contactInformation?.lat as string;
        payload.long = officeSetup?.contactInformation?.long as string;
        console.log('🚀 ~ companyInfoUpdate ~ payload:', payload);

        const response = await patch({
            url: '/admin/contact-information',
            data: payload,
        });

        if (response.status) {
            const tempData = officeSetup as officeSetupData;
            if (tempData) tempData.contactInformation = data;
            changeOfficeSetup(tempData);
        }
    };

    const readOnlyKeys = ['id', 'createdAt', 'logoUrl', 'media'];
    const skipKeys = ['id', 'createdAt', 'lat', 'long'];

    return (
        <form onSubmit={handleSubmit(companyInfoUpdate)}>
            <div className='main-form'>
                {officeSetup &&
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    Object.entries(officeSetup?.contactInformation).map(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        ([key, _value]) => {
                            const readOnly = readOnlyKeys.includes(key);
                            if (skipKeys.includes(key)) return null;
                            return (
                                <div
                                    className='label-input-wrapper'
                                    key={Math.random()}
                                >
                                    <LabeledInput
                                        name={key}
                                        label={
                                            companyContactInformationLabel[key]
                                        }
                                        key={key}
                                        register={register}
                                        readOnly={readOnly}
                                    />
                                </div>
                            );
                        }
                    )}
            </div>
            <MapComponent></MapComponent>
            <div className='button-wrapper'>
                <Button name={'Submit'} disabled={isSubmitting} />
            </div>
        </form>
    );
};

export default CompanyContactInformationForm;
