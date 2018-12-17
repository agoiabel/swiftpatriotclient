import React from 'react';
import styles from './isLoadingModal.component.module.css';

const IsLoadingModal = props => {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_body}>
                Loading
            </div>
        </div>
    );
}

export default IsLoadingModal;