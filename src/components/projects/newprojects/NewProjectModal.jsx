import React, { useEffect } from "react";
import "../../tasks/newTask/NewTaskModal.css"; // Reuse standard modal styling
import NewProject from "./NewProject";
import { FiX } from "react-icons/fi";

const NewProjectModal = ({ isOpen, onClose, onSuccess }) => {
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
        onSuccess && onSuccess();
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content animate-slide-up" style={{ maxWidth: '1000px' }}>
                <div className="modal-header">
                    <div className="header-text">
                        <h2>Initialize New Project</h2>
                        <p>Define goals and assign leads for a new initiative</p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>
                        <FiX />
                    </button>
                </div>
                <div className="modal-body">
                    <NewProject isModal={true} onClose={onClose} onSuccess={handleSuccess} />
                </div>
            </div>
        </div>
    );
};

export default NewProjectModal;
