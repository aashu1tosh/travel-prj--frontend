import useAPI from '@hooks/useAPI';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import {
    IFetchUser,
    IFetchUserDetail,
    IFetchUserResponse,
} from '@interface/user.interface';
import Pagination from '@ui/common/molecules/pagination/Pagination';
import Modal from '@ui/common/organisms/modal/Modal';
import { Suspense, lazy, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FcViewDetails } from 'react-icons/fc';
import { ImCross } from 'react-icons/im';
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
    const [userDetailModal, setUserDetailModal] = useState<boolean>();
    const [userDetails, setUserDetails] = useState<IFetchUserDetail | null>(
        null
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openUserDetailModal = () => setUserDetailModal(true);
    const closeUserDetailModal = () => setUserDetailModal(false);

    const fetchData = async () => {
        const response = await get({
            url: `/admin/users?page=${totalPages?.currentPage || 1}&perpage=${totalPages?.perpage}`,
            toastShow: false,
        });
        if (response.status) {
            setFetchedData(response?.data?.data);
            setTotalPages(response?.data?.pagination as PaginationInterface);
        }
    };

    const viewDetails = async (id: string) => {
        console.log('data');
        console.log(id);
        const response = await get({
            url: `/admin/user/${id}`,
            toastShow: true,
        });
        if (response.status) {
            const data = response.data as unknown as IFetchUserDetail;
            setUserDetails(data);
        }
        openUserDetailModal();
    };

    const confirmDelete = (id: string) => {
        setId(id);
        openModal();
    };

    const deleteUser = async () => {
        const response = await mydelete({ url: '/admin/users', id: id });
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
                                <td>
                                    {item?.createdAt?.toString().split('T')[0]}
                                </td>
                                <td>{item?.email}</td>
                                <td>{item?.role}</td>
                                <td>
                                    {item?.otpVerified ? (
                                        <FaCheck style={{ color: 'green' }} />
                                    ) : (
                                        <ImCross style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td>
                                    <div
                                        className='view-icon'
                                        onClick={() =>
                                            viewDetails(item?.id as string)
                                        }
                                    >
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

            {userDetailModal && (
                <Suspense>
                    <Modal
                        open={userDetailModal}
                        onClose={closeUserDetailModal}
                    >
                        <div>
                            <h3 className='custom-h'>User Details</h3>
                            {userDetails?.details?.firstName}
                        </div>
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default UserList;
