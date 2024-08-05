import './Box.css';

interface BoxProps {
    img: string;
    heading: string;
    p: string;
    a?: string;
}

const Box: React.FC<BoxProps> = ({ img, heading, p, a }) => {
    return (
        <div className='box'>
            <div className='img-wrapper'>
                <img src={img} alt='' />
            </div>
            <h2>{heading}</h2>
            <p>{a ? <a href={`${a}:${p}`}>{p}</a> : p}</p>
        </div>
    );
};

export default Box;
