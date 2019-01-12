import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserManagementMenu.component.module.css';

const UserManagementMenu = props => {
    return (
        <div className={styles.container}>
            <a className={styles.menu}>
                Menu
            </a>		
            <Link className={styles.menu} to="/admin/index">
                Admin
            </Link>
            <Link className={styles.menu} to="/facilitator/index">
                Facilitator
            </Link>
            <Link className={styles.menu} to="/student/index">
                Student
            </Link>		
        </div>
    );
}

export default UserManagementMenu;