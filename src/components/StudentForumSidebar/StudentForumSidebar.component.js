import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudentForumSidebar.component.module.css';

const StudentForumSidebar = props => {
    return (

        <div className={styles.container}>
            <a className={styles.menu}>
                Menu
            </a>
            <Link className={styles.menu} to="/forum/me">
                My Posts
            </Link>
            <Link className={styles.menu} to="/forum/me-awaiting">
                Awaiting Approval
            </Link>
            <Link className={styles.menu} to="/forum/me-declined">
                Declined Posts
            </Link>
        </div>

    )
}

export default StudentForumSidebar;