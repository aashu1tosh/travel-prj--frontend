import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GoBackButton.css';

const GoBackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <p id='go-back' onClick={() => navigate(-1)}>
            Go Back
        </p>
    );
};

export default GoBackButton;
