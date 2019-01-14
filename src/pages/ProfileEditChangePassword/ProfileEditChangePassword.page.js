import React from 'react';
import swal from 'sweetalert';
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
        formData['user_id'] = this.props.user.id;

        this.setState({
            submittingForm: true
        }, () => {
            this.props.update_password(formData);
        })
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.status === 200) {
            let alert = await swal({
                type: 'success',
                title: `Password was updated successfully`,
                allowOutsideClick: false
            });

            if (alert) {
                this.props.reset_password_status();
                this.props.history.push('/profile/index');
            }
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
        user: state.authReducer.user,
        status: state.profileEditChangePasswordReducer.status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_password: payload => dispatch( update_password(payload) ),
        reset_password_status: () => dispatch( reset_password_status() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditChangePassword);