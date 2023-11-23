import React, { useState, useEffect } from 'react';

type ModalProps = {
  message: string;
  type: 'success' | 'error';
};

const Modal: React.FC<ModalProps> = ({ message, type }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div className={`modal ${type}`}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsOpen(false)}>
              &times;
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
