import React from 'react';
import Header from '../../components/Header';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import styles from './ProfileEditChangePassword.page.module.css';
import ProfileEditChangeForm from '../../components/Forms/ProfileEditChangeForm';

class ProfileEditChangePassword extends React.Component {
    
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

                        <ProfileEditChangeForm submitText="Update" />

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEditChangePassword;