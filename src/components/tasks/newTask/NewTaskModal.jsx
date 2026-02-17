import React, { useEffect } from "react";
import "./NewTaskModal.css";
import NewTask from "./NewTask";
import { FiX } from "react-icons/fi";

const NewTaskModal = ({ isOpen, onClose, onSuccess }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === "modal-overlay") {
            onClose();
        }
    };

    const handleSuccess = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content animate-slide-up">
                <div className="modal-header">
                    <div className="header-text">
                        <h2>Create New Task</h2>
                        <p>Assign a task to your team members</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <FiX />
                    </button>
                </div>
                <div className="modal-body">
                    <NewTask isModal={true} onClose={onClose} onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    );
};

export default NewTaskModal;
