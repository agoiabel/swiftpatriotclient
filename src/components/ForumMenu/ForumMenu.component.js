import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ForumMenu.component.module.css';

const ForumMenu = props => {
    return (
        <div className={styles.container}>
            <a className={styles.menu}>
                Menu
            </a>
            <Link className={styles.menu} to="/forum/management">
                FORUM
            </Link>
            <Link className={styles.menu} to="/forum-comment/management">
                COMMENT
            </Link>
		</div>
    );
}

export default ForumMenu;