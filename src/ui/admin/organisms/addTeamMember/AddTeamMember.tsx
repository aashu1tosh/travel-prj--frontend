import { TeamMemberSchema } from '@config/schema/admin/teamMember.schema';
import { MediaType } from '@constant/enum';
import { yupResolver } from '@hookform/resolvers/yup';
import useAPI from '@hooks/useAPI';
import {
    ITeamMember,
    ITeamMemberPayload,
    ITeamMemberReq,
} from '@interface/teamMembers.interface';
import Button from '@ui/common/atoms/button/Button';
import DragAndDrop from '@ui/common/atoms/dragAndDrop/DragAndDrop';
import InputField from '@ui/common/atoms/inputField/InputField';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import './AddTeamMember.css';

interface AddTeamMembersProps {
    teamMembers: ITeamMember[] | undefined;
    setTeamMembers: Dispatch<SetStateAction<ITeamMember[] | undefined>>;
}

const AddTeamMember: React.FC<AddTeamMembersProps> = ({ setTeamMembers }) => {
    const { post } = useAPI<ITeamMemberPayload>();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm<ITeamMemberReq>({
        resolver: yupResolver(TeamMemberSchema()),
    });
    const [media, setMedia] = useState<string>('');

    const onSubmit = async (data: ITeamMemberReq) => {
        // Object.defineProperty(data, "media", { value: media });
        const payload: ITeamMemberPayload =
            data as unknown as ITeamMemberPayload;
        payload.order = parseInt(data.order);
        payload.media = media;
        const response = await post({
            url: '/team-member',
            data: payload,
            toastShow: true,
        });
        if (response.status) {
            const newMember = response.data as unknown as ITeamMember;
            setTeamMembers((prevMembers) => {
                if (prevMembers) {
                    return [...prevMembers, newMember];
                } else {
                    return [newMember];
                }
            });
            reset();
        }
    };

    return (
        <div className='add-team-members'>
            <h2 className='custom-h'>Add Team Members</h2>
            <p>
                <strong>Please enter the details of the team</strong>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        name={'firstName'}
                        placeholder='Members first name'
                        required='true'
                        register={register}
                        error={errors?.firstName}
                    />
                    <InputField
                        name={'lastName'}
                        placeholder='Members last name'
                        required='true'
                        register={register}
                        error={errors?.lastName}
                    />
                </div>

                <div>
                    <InputField
                        name={'email'}
                        placeholder='Members email address'
                        required='true'
                        register={register}
                        error={errors?.email}
                    />
                    <InputField
                        name={'phoneNumber'}
                        placeholder='Members phone number'
                        register={register}
                        error={errors?.phoneNumber}
                    />
                </div>

                <div>
                    <InputField
                        name={'position'}
                        placeholder='Members position'
                        required='true'
                        register={register}
                        type='number'
                        error={errors?.position}
                    />
                    <InputField
                        name={'order'}
                        placeholder='Order of display'
                        required='true'
                        register={register}
                        error={errors?.order}
                    />
                </div>

                <DragAndDrop setMedia={setMedia} type={MediaType?.PROFILE} />
                <Button type='submit' name={'Submit'} disabled={isSubmitting} />
            </form>
        </div>
    );
};

export default AddTeamMember;
