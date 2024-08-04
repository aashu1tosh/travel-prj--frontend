import useAPI from '@hooks/useAPI';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import { IFetchUser, IFetchUserResponse } from '@interface/user.interface';
import Pagination from '@ui/common/molecules/pagination/Pagination';
import { Suspense, lazy, useEffect, useState } from 'react';
import { FcViewDetails } from 'react-icons/fc';
import './UserList.css';

const ConfirmationModal = lazy(
    () => import('@ui/common/organisms/confirmationModal/ConfirmationModal')
);

const UserList = () => {
    const { get, mydelete } = useAPI<IFetchUserResponse | null>();

    const [fetchedData, setFetchedData] = useState<IFetchUser[] | null>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [totalPages, setTotalPages] =
        useState<PaginationInterface>(defaultPagination);
    const [id, setId] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        const response = await get({
            url: `/admin/users?page=${totalPages?.currentPage || 1}&perpage=${totalPages?.perpage}`,
            toastShow: true,
        });
        console.log('🚀 ~ fetchData ~ response:', response);
        if (response.status) {
            setFetchedData(response?.data?.data);
            setTotalPages(response?.data?.pagination as PaginationInterface);
        }
    };

    const confirmDelete = (id: string) => {
        setId(id);
        openModal();
    };

    const deleteUser = async () => {
        const response = await mydelete({ url: '/admin/users/', id: id });
        if (response.status) {
            const updatedUserData = fetchedData?.filter(
                (data) => data.id !== id
            );
            setFetchedData(updatedUserData);
            closeModal();
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);
    return (
        <>
            <h1 className='custom-h'>Users List</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Created At</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Otp Verified</th>
                        <th>Detail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {fetchedData &&
                        (fetchedData || [])?.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.createdAt as unknown as string}</td>
                                <td>{item?.email}</td>
                                <td>{item?.role}</td>
                                <td>{item?.otpVerified.toString()}</td>
                                <td>
                                    <div className='view-icon'>
                                        <FcViewDetails size={24} />
                                    </div>
                                </td>
                                <td
                                    onClick={() =>
                                        confirmDelete(item?.id as string)
                                    }
                                >
                                    <div className='delete-icon'>
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
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

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

            {isModalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <ConfirmationModal
                        open={true}
                        onClose={closeModal}
                        onConfirm={deleteUser}
                        title='Are you sure?'
                        message='You want to delete the user'
                    />
                </Suspense>
            )}
        </>
    );
};

export default UserList;
