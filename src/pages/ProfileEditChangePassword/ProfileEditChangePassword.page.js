import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import styles from './ProfileEditChangePassword.page.module.css';
import { update_password, reset_password_status } from './ProfileEditChangePassword.page.action.js';
import ProfileEditChangeForm from '../../components/Forms/ProfileEditChangeForm';

class ProfileEditChangePassword extends React.Component {
    
    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        }, () => {
            this.props.update_password(formData);
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200) {
            swal({
                type: 'success',
                title: `Password was updated successfully`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.value) {
                    this.props.reset_password_status();
                    this.props.history.push('/profile/index');
                }
            });
        }
    }

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

                        <ProfileEditChangeForm submitText="Update" onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.profileEditChangePasswordReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_password: payload => dispatch( update_password(payload) ),
        reset_password_status: () => dispatch( reset_password_status() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditChangePassword);