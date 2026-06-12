
const Modal = ({ isOpen, onClose, children,onSave }) => {
  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {children}
        
       < div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button 
          onClick={onClose} 
          style={{ 
            marginTop: '15px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          
          Cancel
        </button>
         <button 
          onClick={onSave} 
          style={{ 
            marginTop: '15px', 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          
            Save
        </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;