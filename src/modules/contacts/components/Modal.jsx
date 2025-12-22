import styles from './Modal.module.css';

function Modal({children, onClose}) {
    return (
        <div className={styles.popup} onClick={onClose}>
            <div className={styles.content} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;