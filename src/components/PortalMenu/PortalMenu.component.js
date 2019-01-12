import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PortalMenu.component.module.css';

const PortalMenu = props => {
    return (
        <div className={styles.container}>
            <a className={styles.menu}>
                Menu
            </a>
            <Link className={styles.menu} to="/course/index">
                Course
            </Link>		
            <Link className={styles.menu} to="/session/index">
                Session
            </Link>
            <Link className={styles.menu} to="/outline/index">
                Outline
            </Link>		
        </div>
    );
}

export default PortalMenu;