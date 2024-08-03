import React, { useState } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import './InputField.css';

interface InputFieldProps {
    placeholder?: string;
    type?: string;
    name: string;
    height?: number;
    readOnly?: boolean;
    error?: FieldError;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({
    placeholder,
    type = 'text',
    name,
    readOnly = false,
    error,
    register,
    height,
}) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleField = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <>
            <div
                className={`input-wrapper ${error ? 'input-error' : ''} ${readOnly ? 'read-only' : ''}`}
                style={{ height: `${height}px` }}
            >
                <input
                    type={
                        type && type === 'password'
                            ? showPassword
                                ? 'text'
                                : 'password'
                            : 'text'
                    }
                    readOnly={readOnly}
                    placeholder={placeholder}
                    {...(register ? register(name) : null)}
                />
                {type === 'password' && (
                    <span className='icon' onClick={toggleField}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                )}
            </div>

            {error && <span className='red-text'>{error?.message}</span>}
        </>
    );
};

export default InputField;
