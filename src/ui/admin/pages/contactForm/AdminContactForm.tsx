import useAPI from '@hooks/useAPI';
import {
    IContactFormData,
    IFetchContactForm,
} from '@interface/contactForm.interface';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import Pagination from '@ui/common/molecules/pagination/Pagination';
import Table from '@ui/common/organisms/table/Table';
import { useEffect, useState } from 'react';

const AdminContactForm = () => {
    const { get } = useAPI<IFetchContactForm>();
    const [contactForms, setContactForms] = useState<IContactFormData[]>();
    const [totalPages, setTotalPages] =
        useState<PaginationInterface>(defaultPagination);
    const [refresh, setRefresh] = useState<boolean>(false);

    const headers = [
        'S.No.',
        'Full Name',
        'Email',
        'Phone Number',
        'Subject',
        'Message',
        'Action',
    ];

    let index = 0;

    const fetchData = async () => {
        const response = await get({
            url: `/admin/contact-form?page=${totalPages?.currentPage || 1}&perpage=${totalPages?.perpage}`,
        });
        console.log('🚀 ~ fetchData ~ admin:', response);
        if (response.status) setContactForms(response?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <div>
            <h1 className='custom-h'>Contact Forms</h1>
            <Table
                headers={headers}
                data={contactForms as IContactFormData[]}
                renderRow={(item: IContactFormData) => (
                    <>
                        <td>{++index}</td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.subject}</td>
                        <td>{item.message ?? 'n/a'}</td>
                        <td>
                            <span className='delete-icon'>Delete</span>
                        </td>
                    </>
                )}
            />

            {totalPages?.totalPages ? (
                <Pagination
                    setTotalPages={
                        setTotalPages as React.Dispatch<
                            React.SetStateAction<PaginationInterface>
                        >
                    }
                    pagination={totalPages ?? defaultPagination}
                    setRefresh={setRefresh}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default AdminContactForm;
