import useAPI from '@hooks/useAPI';
import { ITeamMember } from '@interface/teamMembers.interface';
import Button from '@ui/common/atoms/button/Button';
import ConfirmationModal from '@ui/common/organisms/confirmationModal/ConfirmationModal';
import Modal from '@ui/common/organisms/modal/Modal';
import Table from '@ui/common/organisms/table/Table';
import { Suspense, lazy, useEffect, useState } from 'react';
import './TeamMembersList.css';

const AddTeamMember = lazy(
    () => import('@ui/admin/organisms/addTeamMember/AddTeamMember')
);

const TeamMembersList = () => {
    const { get, mydelete } = useAPI<ITeamMember[]>();
    const [teamMembers, setTeamMembers] = useState<ITeamMember[]>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [addTeamModal, setAddTeamModal] = useState<boolean>(false);

    const openModal = () => setIsDeleteModalOpen(true);
    const closeModal = () => setIsDeleteModalOpen(false);

    const confirmDelete = (id: string) => {
        setId(id);
        openModal();
    };

    const addTeamModalFxn = () => {
        openAddTeamModal();
    };

    const openAddTeamModal = () => setAddTeamModal(true);
    const closeAddTeamModal = () => setAddTeamModal(false);

    const onDelete = async () => {
        const response = await mydelete({ url: `/team-member`, id: id });
        console.log(response);
        if (response.status) {
            const updatedTeamMembers = teamMembers?.filter(
                (member) => (member?.id as string) != id
            );
            setTeamMembers(updatedTeamMembers);
            closeModal();
        }
    };

    const fetchData = async () => {
        const response = await get({ url: '/team-member' });
        console.log('🚀 ~ fetchData ~ response:', response);
        if (response.status) setTeamMembers(response.data as ITeamMember[]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const headers = [
        'S.No.',
        'First Name',
        'Last Name',
        'Email',
        'Order',
        'Phone Number',
        'Position',
        'Media',
        'Action',
    ];
    let index = 0;
    return (
        <>
            <div className='admin-team-members'>
                <div className='parent-container'>
                    <div className='button-wrapper' onClick={addTeamModalFxn}>
                        <Button name='Add Team Members'></Button>
                    </div>
                </div>

                <h1 className='custom-h'>Team Member List</h1>
                <Table
                    headers={headers}
                    data={teamMembers as ITeamMember[]}
                    renderRow={(item: ITeamMember) => (
                        <>
                            <td>{++index}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.order}</td>
                            <td>{item.phoneNumber ?? 'n/a'}</td>
                            <td>{item.position}</td>
                            <td>
                                <img src={item.media?.path} alt='' />
                            </td>
                            <td
                                onClick={() =>
                                    confirmDelete(item?.id as string)
                                }
                            >
                                <span className='delete-icon'>Delete</span>
                            </td>
                        </>
                    )}
                />
            </div>

            {/* <DragAndDrop></DragAndDrop> */}

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
            {addTeamModal && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Modal open={addTeamModal} onClose={closeAddTeamModal}>
                        <AddTeamMember
                            teamMembers={teamMembers}
                            setTeamMembers={setTeamMembers}
                        />
                    </Modal>
                </Suspense>
            )}
        </>
    );
};

export default TeamMembersList;
