import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './ProfileIndex.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';

class ProfileIndex extends React.Component {
    
    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <QuickContact />
                </div>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <ProfileMenu /> 
                    </div>
                    <div className={styles.content}>

                        <div className={styles.lists}>
                            <div className={styles.list}>
                                <div className={styles.parent}>First Name</div>
                                <div className={styles.child}>Agoi</div>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Last Name</span>
                                <span className={styles.child}>Abel</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Other Name</span>
                                <span className={styles.child}>Adeyemi</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Email Address</span>
                                <span className={styles.child}>agoiabeladeyemi@gmail.com</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Matric Number</span>
                                <span className={styles.child}>123456</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Profile Type</span>
                                <span className={styles.child}>Student</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Gender</span>
                                <span className={styles.child}>Male</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Marital Status</span>
                                <span className={styles.child}>Married</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Phone number</span>
                                <span className={styles.child}>08114247689</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Date of birth</span>
                                <span className={styles.child}>26-June 2019</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Residence Address</span>
                                <span className={styles.child}>6 Adeyeye Street, Megida</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Employment Status</span>
                                <span className={styles.child}>Employed</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Company Name</span>
                                <span className={styles.child}>Akin and co.</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Company Phone number</span>
                                <span className={styles.child}>08084542839</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Company Email Address</span>
                                <span className={styles.child}>agoiabeladeyemi@gmail.com</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Position</span>
                                <span className={styles.child}>Manager</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Religion</span>
                                <span className={styles.child}>Muslim</span>
                            </div>

                            <div className={styles.list}>
                                <span className={styles.parent}>Ministry</span>
                                <span className={styles.child}>DayStart</span>
                            </div>
                        </div>

                        <div className={styles.footer}>
                            <Link className={styles.cta} to={{ pathname: '/profile/edit'}}>
                                <div className={styles.button}> Edit Profile </div>
                            </Link>
                            <Link className={styles.cta} to={{ pathname: '/password/change' }}>
                                <div className={[styles.button, styles.clearBtn].join(" ")}> Change Password </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileIndex;