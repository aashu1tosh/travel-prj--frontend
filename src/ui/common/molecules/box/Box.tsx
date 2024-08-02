import './Box.css';

interface BoxProps {
    img: string;
    heading: string;
    p: string;
}

const Box: React.FC<BoxProps> = ({ img, heading, p }) => {
    return (
        <div className='box'>
            <div className='img-wrapper'>
                <img src={img} alt='' />
            </div>
            <h2>{heading}</h2>
            <p>{p}</p>
        </div>
    );
};

export default Box;
