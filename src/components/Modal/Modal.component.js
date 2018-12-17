import React from 'react';
import styles from './Modal.component.module.css';

const Modal = props => {
    return (
        <div className={styles.modal}>
            <div className={styles.body}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;