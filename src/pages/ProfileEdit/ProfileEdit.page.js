import React from 'react';
import Header from '../../components/Header';
import styles from './ProfileEdit.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import ProfileEditForm from '../../components/Forms/ProfileEditForm';

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

                        <ProfileEditForm submitText="Update" />

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileIndex;