import { ITeamMember } from '@interface/teamMembers.interface';
import TeamCard from '@ui/landingPage/molecules/teamCard/TeamCard';
import Hero from '@ui/landingPage/organisms/hero/Hero';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const { get } = useAPI<ITeamMember[]>();
    const [teamMembers, setTeamMembers] = useState<ITeamMember[]>();

    const fetchData = async () => {
        const response = await get({ url: '/team-member' });
        if (response.status) setTeamMembers(response.data as ITeamMember[]);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Hero />
            <div className='container'>
                <div className='team-members'>
                    <h4>Team Members</h4>
                    <h2>
                        We’ve Expert Team
                        <span className='block'>Members Meet With Team</span>
                    </h2>
                    <div className='team'>
                        {teamMembers &&
                            teamMembers.map((val, idx) => (
                                <TeamCard
                                    firstName={val?.firstName}
                                    lastName={val?.lastName}
                                    email={val?.email}
                                    phoneNumber={null}
                                    position={val?.position}
                                    mediaUrl={val?.media?.path}
                                    key={idx}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
