import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import './Modal.css';
interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <dialog open className="center-dialog">
                <FaWindowClose onClick={onClose} size={25} style={{ float: "right", color: "red", cursor: "pointer" }} /><br />
                {children}
            </dialog>
        </>
    );
};

export default Modal;
