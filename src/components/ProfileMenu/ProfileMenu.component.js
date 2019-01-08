import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileMenu.component.module.css';

const FeedbacMenu = props => {
    return (
        <div className={styles.container}>
            <a className={styles.menu}>
                Menu
            </a>
            <Link className={styles.menu} to="/profile/index">
                Profile
            </Link>
            <Link className={styles.menu} to="/profile/session">
                Sessions
            </Link>
            {/* <Link className={styles.menu} to="/profile/feedback">
                Feedbacks
            </Link> */}
            <Link className={styles.menu} to="/profile/payment">
                Payment history
            </Link>
		</div>
    );
}

export default FeedbacMenu;