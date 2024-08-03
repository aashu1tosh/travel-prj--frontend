import React from 'react';
// import Modal from './Modal';
import Modal from '@ui/common/organisms/modal/Modal';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className='confirmation-modal'>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className='modal-buttons'>
                    <button onClick={onConfirm} className='confirm-button'>
                        Confirm
                    </button>
                    <button onClick={onClose} className='cancel-button'>
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
