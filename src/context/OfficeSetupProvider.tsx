import { MediaType } from '@constant/enum';
import { ICompany, ICompanyInfo } from '@interface/company.interface';
import { ReactChildren } from '@interface/global.interface';
import useAPI from 'hooks/useAPI';
import React, { createContext, useEffect, useState } from 'react';

export interface officeSetupData {
    company: ICompany;
    contactInformation: ICompanyInfo;
}

export interface OfficeSetupContextType {
    officeSetup: officeSetupData | null;
    changeOfficeSetup: (newOfficeSetup: officeSetupData) => void;
}

const OfficeSetupContext = createContext<OfficeSetupContextType>({
    officeSetup: null,
    changeOfficeSetup: () => {},
});

export const OfficeSetupProvider: React.FC<ReactChildren> = ({ children }) => {
    const [officeSetup, setOfficeSetup] = useState<officeSetupData | null>(
        null
    );
    const { get } = useAPI<ICompany | ICompanyInfo>();

    const changeOfficeSetup = (newData: officeSetupData) => {
        setOfficeSetup(newData);
    };

    const fetchOfficeSetup = async () => {
        try {
            const fullData: officeSetupData = {
                company: {
                    description: '',
                    slogan: '',
                    media: {
                        name: '',
                        mimeType: '',
                        type: MediaType.PROFILE,
                        path: '',
                    },
                },
                contactInformation: {
                    location: '',
                    lat: '',
                    long: '',
                    email: '',
                    availableDays: '',
                    availableTime: '',
                    phoneNumber: '',
                    secondaryPhoneNumber: '',
                    facebookLink: '',
                    instagramLink: '',
                    twitterLink: '',
                },
            };
            const response = await get({ url: '/company' });
            if (response.status) {
                const data = response.data as ICompany;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // const { media, ...companyData } = data;
                fullData.company = Object.assign(fullData.company, data);
            }

            const companyInfoResponse = await get({
                url: '/contact-information',
            });
            if (companyInfoResponse.status) {
                const data = companyInfoResponse.data as ICompanyInfo;
                fullData.contactInformation = Object.assign(
                    fullData.contactInformation,
                    data
                );
            }
            setOfficeSetup(fullData);
        } catch (error) {
            console.error('Error fetching office setup data:', error);
        }
    };

    useEffect(() => {
        fetchOfficeSetup();
    }, []);

    return (
        <OfficeSetupContext.Provider value={{ officeSetup, changeOfficeSetup }}>
            {children}
        </OfficeSetupContext.Provider>
    );
};

export { OfficeSetupContext };
