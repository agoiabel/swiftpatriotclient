import React from 'react';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './ResetPassword.page.module.css';
import { start_reset_password } from './ResetPassword.page.action';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';


class ResetPassword extends React.Component {

	state = {
		submittingForm: false,
	};


	handleSubmit = formData => {
		formData['token'] = this.props.match.params.token;
		this.setState({
			submittingForm: true
		});
		this.props.start_reset_password(formData);
	}


	redirectOrNotifyOnStatusChange = nextProps => {
		this.setState({
			submittingForm: false
		});
		if (nextProps.status === 200) {
			swal({
				title: 'Success!',
				text: `${nextProps.message}`,
				type: 'success',
				timer: 2500,
				showConfirmButton: true
			});

			this.props.history.push('/');
		}
		if ((nextProps.status === 422) && !(nextProps.message === this.props.message)) {
			return swal({
				title: 'Error!',
				text: `${nextProps.message}`,
				type: 'error',
				timer: 2500,
				showConfirmButton: true
			});
		}
	}


	componentWillReceiveProps(nextProps) {
		this.redirectOrNotifyOnStatusChange(nextProps);
	}


	render() {
		return (
			<div className={styles.container}>
				<ul className="cbSlideshow">
					<li><span>Image 01</span></li>
					<li><span>Image 02</span></li>
					<li><span>Image 03</span></li>
					<li><span>Image 04</span></li>
					<li><span>Image 05</span></li>
					<li><span>Image 06</span></li>
				</ul>


				<div className={styles.formContainer}>
					<div className={styles.logoContainer}>
						<img src={require('../../assets/images/logo@2x.png')} />
					</div>

					<div className={styles.header}>
						<div className={styles.title}>Reset Password</div>
						<div className={styles.description}>All fields are required</div>
					</div>


					<div className={styles.body}>
						<ResetPasswordForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
						
						<Link to={{ pathname: '/' }} className={styles.forgotPassword}>login</Link>
					</div>
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.resetPasswordReducer.status,
		message: state.resetPasswordReducer.message
	}
}

const mapDispatchToProps = dispatch => {
	return {
		start_reset_password: credentials => dispatch(start_reset_password(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);