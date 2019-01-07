import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudentForumSidebar.component.module.css';

const StudentForumSidebar = props => {
    return (
        <div>
            <ul className={styles.container}>
                <li className={styles.forumMenu}>
                    <div className={styles.icon}><i className="fa fa-bullhorn" aria-hidden="true"></i></div>
                    <Link to="/forum/me">My Posts</Link>
                </li>

                <li className={styles.forumMenu}>
                    <div className={styles.icon}><i className="fa fa-circle-o-notch" aria-hidden="true"></i></div>
                    <Link to="/forum/me-awaiting">Awaiting Approval</Link>
                </li>

                <li className={styles.forumMenu}>
                    <div className={styles.icon}><i className="fa fa-thumbs-down" aria-hidden="true"></i></div>
                    <Link to="/forum/me-declined">Declined Posts</Link>
                </li>

                {/* <li className={styles.forumMenu}>
                    <div className={styles.icon}><i className="fa fa-thumbs-down" aria-hidden="true"></i></div> <a>Declined Comments</a>
                </li> */}
            </ul>
        </div>
    )
}

export default StudentForumSidebar;