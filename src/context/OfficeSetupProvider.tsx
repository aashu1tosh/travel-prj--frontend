import { ICompany, ICompanyInfo } from '@interface/company.interface';
import { ReactChildren } from '@interface/global.interface';
import useAPI from 'hooks/useAPI';
import React, { createContext, useEffect, useState } from 'react';
// import { LanguageEnum } from '@type/global.types';

interface officeSetupData {
    description: string;
    slogan: string;
    logoUrl: string;
    location: string;
    lat: string;
    long: string;
    email: string;
    availableDays: string;
    availableTime: string;
    phoneNumber: string;
    secondaryPhoneNumber: string;
    facebookLink: string;
    instagramLink: string;
    twitterLink: string;
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
            let fullData: officeSetupData = {
                description: '',
                slogan: '',
                logoUrl: '',
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
            };
            const response = await get({ url: '/company' });
            if (response.status) {
                const data = response.data as ICompany;
                fullData = Object.assign(fullData, data);
                fullData.logoUrl = data?.media?.path;
            }

            const companyInfoResponse = await get({
                url: '/contact-information',
            });
            if (companyInfoResponse.status) {
                const data = companyInfoResponse.data as ICompanyInfo;
                fullData = Object.assign(fullData, data);
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
