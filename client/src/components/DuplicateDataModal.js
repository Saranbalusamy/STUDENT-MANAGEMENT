import React from "react";
import Modal from "react-modal";

const DuplicateDataModal = ({ isOpen, closeModal }) => {
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
      contentLabel="Duplicate Data Modal"
      style={modalStyles}
      ariaHideApp={false}
    >
      <div className="modern-modal-content">
        <div className="modern-modal-header" style={{ 
          background: 'linear-gradient(135deg, var(--warning-color), #d97706)',
          color: 'white'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            ⚠️ Duplicate Data Error
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
              🚫
            </div>
            <h4 style={{ 
              color: 'var(--warning-color)', 
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              Student Already Exists
            </h4>
            <p style={{ 
              color: 'var(--gray-600)', 
              margin: 0,
              lineHeight: '1.5'
            }}>
              A student with the same ID or email already exists in the database. 
              Please double-check your input and try again with unique information.
            </p>
          </div>
        </div>
        
        <div className="modern-modal-footer">
          <button
            onClick={closeModal}
            className="modern-btn modern-btn-primary"
          >
            ✓ Got it, I'll fix this
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateDataModal;
