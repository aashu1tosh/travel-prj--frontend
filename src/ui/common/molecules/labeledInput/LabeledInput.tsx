import InputField from '@ui/common/atoms/inputField/InputField';
import { FieldError, UseFormRegister } from 'react-hook-form';
import './LabeledInput.css';

interface LabeledInputProps {
    label: string;
    placeholder?: string;
    type?: string;
    name: string;
    height?: number;
    readOnly?: boolean;
    error?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
    label,
    placeholder,
    type = 'text',
    name,
    readOnly = false,
    error,
    register,
    height,
}) => {
    return (
        <>
            <label htmlFor=''>{label}</label>
            <InputField
                placeholder={placeholder}
                readOnly={readOnly}
                name={name}
                type={type}
                register={register}
                height={height}
                error={error}
            />
        </>
    );
};

export default LabeledInput;
