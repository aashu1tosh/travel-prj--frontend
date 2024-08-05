import { officeSetupData } from '@context/OfficeSetupProvider';
import { companyInformationLabel } from '@data/map';
import useAPI from '@hooks/useAPI';
import { useOfficeSetup } from '@hooks/useOfficeSetup';
import { ICompany } from '@interface/company.interface';
import Button from '@ui/common/atoms/button/Button';
import LabeledInput from '@ui/common/molecules/labeledInput/LabeledInput';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CompanyInformationForm = () => {
    const { officeSetup, changeOfficeSetup } = useOfficeSetup();
    const { patch } = useAPI<ICompany>();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<ICompany>();

    useEffect(() => {
        reset(officeSetup?.company);
    }, [officeSetup, reset]);

    const companyUpdate = async (data: ICompany) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, id, media, ...payload } = data;
        const response = await patch({ url: '/company', data: payload });

        if (response.status) {
            const tempData = officeSetup as officeSetupData;
            if (tempData) tempData.company = data;
            changeOfficeSetup(tempData);
        }
    };

    const readOnlyKeys = ['id', 'createdAt', 'logoUrl', 'media'];

    return (
        <form onSubmit={handleSubmit(companyUpdate)}>
            <div className='main-form'>
                {officeSetup &&
                    Object.entries(officeSetup.company).map(
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        ([key, _value]) => {
                            const readOnly = readOnlyKeys.includes(key);
                            return (
                                <div
                                    className='label-input-wrapper'
                                    key={Math.random()}
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
            </div>
            <div className='button-wrapper'>
                <Button name={'Submit'} disabled={isSubmitting} />
            </div>
        </form>
    );
};

export default CompanyInformationForm;
