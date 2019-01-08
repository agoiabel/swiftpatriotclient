import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import styles from './ProfileEdit.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import ProfileEditForm from '../../components/Forms/ProfileEditForm';
import { get_profile, update_user, reset_profile_update } from '../ProfileIndex/ProfileIndex.page.action';


class ProfileIndex extends React.Component {
    
    componentDidMount() {
        if (!this.props.status === 200) {
            this.props.history.push('/profile/index');
        }
    }

    handleSubmit = formData => {
        formData['user_id'] = this.props.user.id;
        this.props.update_user(formData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.update_profile_status === 200) {
            swal({
                type: 'success',
                title: `Profile was updated successfully`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.value) {
                    this.props.reset_profile_update();
                    this.props.history.push('/profile/index');
                }
            });
        }
    }

    render () {

        let container = <Spinner />

        if (this.props.status == 200) {
            container = (
                <ProfileEditForm submitText="Update" user={this.props.user} initialValues={this.props.user} onSubmit={this.handleSubmit} />
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

                        { container }

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
        update_profile_status: state.profileIndexReducer.update_profile_status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_profile: () => dispatch( get_profile() ),
        update_user: payload => dispatch ( update_user(payload) ),
        reset_profile_update: () => dispatch(reset_profile_update() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex);