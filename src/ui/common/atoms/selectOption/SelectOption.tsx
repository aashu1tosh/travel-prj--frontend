import { FieldError, UseFormRegister } from 'react-hook-form';
import './SelectOption.css';

interface OptionInterface {
    label: string;
    value: string;
}
interface SelectOptionProps {
    label?: string;
    name: string;
    options?: OptionInterface[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    error?: FieldError;
    required?: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({
    label = '',
    name,
    register,
    required = false,
    options,
    error,
}) => {
    return (
        <>
            <div className='select-option'>
                <label htmlFor={name}>
                    {label}
                    <span className='red-text'>{required ? '*' : ''}</span>
                </label>

                <select
                    id={name}
                    {...register(name)}
                    className={error ? 'input-error' : ''}
                >
                    {/* <option value="" disabled selected hidden>Please Choose...</option> */}
                    {options &&
                        options.map((data, index) => (
                            <option value={data?.value} key={index}>
                                {data?.label}
                            </option>
                        ))}
                </select>
            </div>
            {error && <span className='red-text'>{error?.message}</span>}
        </>
    );
};

export default SelectOption;
