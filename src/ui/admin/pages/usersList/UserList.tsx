import useAPI from '@hooks/useAPI';
import { IFetchUser, IFetchUserResponse } from '@interface/user.interface';
import { useEffect, useState } from 'react';
import { FcViewDetails } from 'react-icons/fc';
import './UserList.css'; // Import the CSS file

const UserList = () => {
    const { get } = useAPI<IFetchUserResponse>();
    const [fetchedData, setFetchedData] = useState<IFetchUser[] | null>();

    const fetchData = async () => {
        const response = await get({ url: '/admin/users', toastShow: true });
        console.log('🚀 ~ fetchData ~ response:', response);
        if (response.status) setFetchedData(response?.data?.data);
        // console.log(response.data)
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
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
                            <td>
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
    );
};

export default UserList;
