import React, { useEffect } from 'react';
import styles from 'styles/Admin/Modal.module.scss';
type ModalProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={`${styles.modalContent} ${type == 'success' ? styles.success : styles.error}`}>
        <span className={styles.close} onClick={() => onClose()}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
