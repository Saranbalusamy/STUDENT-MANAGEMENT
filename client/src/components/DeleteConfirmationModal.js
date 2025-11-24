import React from "react";
import Modal from "react-modal";

const DeleteConfirmationModal = ({ isOpen, closeModal, onDelete }) => {
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(31, 41, 55, 0.8)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    content: {
      background: "transparent",
      border: "none",
      padding: "0",
      position: "relative",
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      overflow: "visible",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Confirmation Modal"
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="modern-modal-content">
        <div className="modern-modal-header">
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            🗑️ Delete Student
          </h2>
        </div>
        
        <div className="modern-modal-body">
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              filter: 'grayscale(1)',
              opacity: 0.6
            }}>
              ⚠️
            </div>
            <h4 style={{ 
              color: 'var(--danger-color)', 
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Are you absolutely sure?
            </h4>
            <p style={{ 
              color: 'var(--gray-600)', 
              margin: 0,
              lineHeight: '1.5'
            }}>
              This action cannot be undone. This will permanently delete the student's
              information from the database.
            </p>
          </div>
        </div>
        
        <div className="modern-modal-footer">
          <button
            onClick={closeModal}
            className="modern-btn modern-btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="modern-btn modern-btn-danger"
          >
            🗑️ Delete Student
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
