import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './UserChangePassword.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import UserManagementMenu from '../../components/UserManagementMenu';

import UserResetPasswordForm from '../../components/Forms/UserResetPasswordForm';
import { update_password, reset_password_status } from '../ProfileEditChangePassword/ProfileEditChangePassword.page.action';

class UserChangePassword extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		formData['user_id'] = this.props.match.params.userId;
		this.setState({
			submittingForm: true
		});

		this.props.update_password(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = async nextProps => {
		if (nextProps.status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Password was reset successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.reset_password_status();
			}
		}
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Reset Password" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>

					<div className={styles.content}>
						<div>
							<UserResetPasswordForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} submitText="RESET PASSWORD" />
						</div>
					</div>
				</div>

			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.profileEditChangePasswordReducer.status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update_password: payload => dispatch( update_password(payload) ),
		reset_password_status: () => dispatch(reset_password_status())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserChangePassword);