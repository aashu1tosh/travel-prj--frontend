import CompanyContactInformationForm from '@ui/admin/organisms/companyContactInformationForm/CompanyContactInformationForm';
import CompanyInformationForm from '@ui/admin/organisms/companyInformationForm/CompanyInformationForm';
import './CompanyInfo.css';

const CompanyInfo = () => {
    return (
        <div className='company-info'>
            <div className='company-info-form'>
                <h1 className='custom-h'>Company Information</h1>
                <CompanyInformationForm />
            </div>

            <br />
            <h1 className='custom-h'>Company Contact Information</h1>
            <div className='company-info-form'>
                <CompanyContactInformationForm />
            </div>
        </div>
    );
};

export default CompanyInfo;
