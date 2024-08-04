import './TeamCard.css';

interface TeamCardProps {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    position: string;
    mediaUrl: string;
}
const TeamCard = (props: TeamCardProps) => {
    const { firstName, lastName, email, phoneNumber, position, mediaUrl } =
        props;
    return (
        <div className='flip-card'>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img src={mediaUrl} alt='Avatar' />
                </div>
                <div className='flip-card-back'>
                    <h1>{`${firstName ?? 'First Name'} ${lastName ?? 'Last Name'}`}</h1>
                    <h2>{position ?? 'Position'}</h2>
                    <h3>{email ?? 'alternative@mail.com'}</h3>
                    <h3>{phoneNumber ?? '98XXXXXXXX'}</h3>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
