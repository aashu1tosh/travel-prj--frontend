import { image } from '@constant/image';
import './Button.css';

interface ButtonProps {
    name: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    name,
    type = undefined,
    disabled = false,
}) => {
    return (
        <button type={type} disabled={disabled} id='custom-button'>
            {disabled ? <img src={image?.loader} id='loader' alt='' /> : name}
        </button>
    );
};

export default Button;
