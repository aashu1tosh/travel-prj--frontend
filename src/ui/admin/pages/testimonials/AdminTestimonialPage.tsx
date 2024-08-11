import useAPI from '@hooks/useAPI';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import {
    ITestimonial,
    ITestimonialResponse,
} from '@interface/testimonial.interface';
import Button from '@ui/common/atoms/button/Button';
import Pagination from '@ui/common/molecules/pagination/Pagination';
import ConfirmationModal from '@ui/common/organisms/confirmationModal/ConfirmationModal';
import Modal from '@ui/common/organisms/modal/Modal';
import Table from '@ui/common/organisms/table/Table';
import { Suspense, lazy, useEffect, useState } from 'react';
import './AdminTestimonialPage.css';

const AddTestimonial = lazy(
    () => import('@ui/admin/organisms/addTestimonials/AddTestimonial')
);

const AdminTestimonialPage = () => {
    const { get } = useAPI<ITestimonialResponse>();
    const { mydelete } = useAPI<undefined>();
    const [testimonials, setTestimonials] = useState<ITestimonial[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const [totalPages, setTotalPages] =
        useState<PaginationInterface>(defaultPagination);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [addTestimonialModal, setAddTestimonialModal] =
        useState<boolean>(false);

    const openModal = () => setIsDeleteModalOpen(true);
    const closeModal = () => setIsDeleteModalOpen(false);

    const confirmDelete = (id: string) => {
        setId(id);
        openModal();
    };
    const openAddTestimonialModal = () => setAddTestimonialModal(true);
    const closeAddTestimonialModal = () => setAddTestimonialModal(false);

    const addTestimonialModalFxn = () => {
        openAddTestimonialModal();
    };

    const headers = [
        'S.No.',
        'Full Name',
        'Rating',
        'Reviewer Location',
        'Testimonial',
        'Media',
        'Action',
    ];

    let index = 0;

    const fetchData = async () => {
        const response = await get({
            url: `/testimonial?page=${totalPages?.currentPage || 1}&perpage=${totalPages?.perpage}`,
        });
        if (response.status) {
            setTestimonials(response?.data?.data);
            setTotalPages(response?.data?.total as PaginationInterface);
        }
    };

    const onDelete = async () => {
        const response = await mydelete({ url: `/testimonial`, id: id });
        if (response.status) {
            const updatedTeamMembers = testimonials?.filter(
                (testimonial) => (testimonial?.id as string) != id
            );
            setTestimonials(updatedTeamMembers);
            closeModal();
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <>
            <div className='admin-testimonial-page'>
                <div className='flex-space-between'>
                    <h1 className='custom-h'>Testimonials</h1>

                    <div
                        className='button-wrapper'
                        onClick={addTestimonialModalFxn}
                    >
                        <Button name='Add Testimonials'></Button>
                    </div>
                </div>
                <Table
                    headers={headers}
                    data={testimonials as ITestimonial[]}
                    renderRow={(item: ITestimonial) => (
                        <>
                            <td>{++index}</td>
                            <td>{item.fullName}</td>
                            <td>{item.rating}</td>
                            <td>{item.reviewerLocation}</td>
                            <td>{item.testimonial}</td>
                            <td>
                                <img
                                    src={item.media?.path}
                                    alt=''
                                    className='table-profile'
                                />
                            </td>
                            <td
                                onClick={() =>
                                    confirmDelete(item?.id as string)
                                }
                            >
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
                    <>{totalPages?.totalPages}</>
                )}
            </div>

            {isDeleteModalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                    <ConfirmationModal
                        open={isDeleteModalOpen}
                        onClose={closeModal}
                        onConfirm={onDelete}
                        title='Are you sure?'
                        message='You want to delete the team member'
                    />
                </Suspense>
            )}

            {addTestimonialModal && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Modal
                        open={addTestimonialModal}
                        onClose={closeAddTestimonialModal}
                    >
                        <AddTestimonial setTestimonials={setTestimonials} />
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default AdminTestimonialPage;
