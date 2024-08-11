import useAPI from '@hooks/useAPI';
import {
    IContactFormData,
    IFetchContactForm,
} from '@interface/contactForm.interface';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import Tooltip from '@ui/common/atoms/toolTip/ToolTip';
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
        if (response.status) {
            setContactForms(response?.data?.data);
            setTotalPages(response?.data?.pagination as PaginationInterface);
        }
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
                        <td>
                            {item.message ? (
                                item.message?.length > 90 ? (
                                    <Tooltip text={item?.message}>
                                        <p>
                                            {item.message
                                                .toString()
                                                .substring(0, 90) + '...'}
                                        </p>
                                    </Tooltip>
                                ) : (
                                    item.message.toString()
                                )
                            ) : (
                                'n/a'
                            )}
                        </td>
                        <td>
                            <span className='delete-icon'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <path d='M3 6h18' />
                                    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                                    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                                </svg>
                            </span>
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
