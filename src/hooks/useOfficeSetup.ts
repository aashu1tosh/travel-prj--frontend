import {
    OfficeSetupContext,
    OfficeSetupContextType,
} from '@context/OfficeSetupProvider';
import { useContext } from 'react';

export const useOfficeSetup = (): OfficeSetupContextType => {
    const context = useContext(OfficeSetupContext);
    if (!context) {
        throw new Error(
            'useOffice must be used within a office setup provider'
        );
    }
    return context;
};
