import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FeedbackMenu.component.module.css';

const FeedbacMenu = props => {
    return (
        <div className={styles.container}>
            <Link className={styles.menu} to="/feedback-question/index">
                QUESTION
            </Link>
            <Link className={styles.menu} to="/feedback-general/index">
                FEEDBACK
            </Link>
		</div>
    );
}

export default FeedbacMenu;