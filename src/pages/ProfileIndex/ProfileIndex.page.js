import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './ProfileIndex.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';

import { get_profile } from './ProfileIndex.page.action';

class ProfileIndex extends React.Component {
    

    componentDidMount() {
        this.props.get_profile();
    }

    render () {

        let profileContainer = <Spinner />;
        let other_details;

        if (this.props.status === 200 && this.props.user.type === "ADULT") {
            other_details = (
                <React.Fragment>
                    <div className={styles.list}>
                        <span className={styles.parent}>Marital Status</span>
                        <span className={styles.child}>{this.props.user.marital_status}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Employment Status</span>
                        <span className={styles.child}>{this.props.user.employment_status}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Company Name</span>
                        <span className={styles.child}>{this.props.user.company_name}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Company Phone number</span>
                        <span className={styles.child}>{this.props.user.company_phone_number}</span>
                    </div>


                    <div className={styles.list}>
                        <span className={styles.parent}>Position</span>
                        <span className={styles.child}>{this.props.user.position_in_company}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Religion</span>
                        <span className={styles.child}>{this.props.user.religion}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Ministry</span>
                        <span className={styles.child}>{this.props.user.name_of_ministry}</span>
                    </div>
                </React.Fragment>
            )
        }

        if (this.props.status === 200) {
            profileContainer = (
                <div className={styles.lists}>
                    <div className={styles.list}>
                        <div className={styles.parent}>First Name</div>
                        <div className={styles.child}>{this.props.user.firstname}</div>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Last Name</span>
                        <span className={styles.child}>{this.props.user.lastname}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Other Name</span>
                        <span className={styles.child}>{this.props.user.othername}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Email Address</span>
                        <span className={styles.child}>{this.props.user.email}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Matric Number</span>
                        <span className={styles.child}>{this.props.user.matric_number}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Profile Type</span>
                        <span className={styles.child}>{this.props.user.type}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Gender</span>
                        <span className={styles.child}>{this.props.user.gender}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Phone number</span>
                        <span className={styles.child}>{this.props.user.phone_number}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Date of birth</span>
                        <span className={styles.child}>{this.props.user.date_of_birth}</span>
                    </div>

                    <div className={styles.list}>
                        <span className={styles.parent}>Residence Address</span>
                        <span className={styles.child}>{this.props.user.residence_address}</span>
                    </div>

                    { other_details }
                    
                </div>
            )
        }

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

                        { profileContainer }

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

const mapStateToProps = state => {
    return {
        user: state.profileIndexReducer.user,
        status: state.profileIndexReducer.status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_profile: () => dispatch( get_profile() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex);