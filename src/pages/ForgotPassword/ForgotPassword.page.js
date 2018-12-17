import React from 'react';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './ForgotPassword.page.module.css';
import { start_forgot_password } from './ForgotPassword.page.action';
import ForgotPasswordForm from '../../components/Forms/ForgotPasswordForm';

class ForgotPassword extends React.Component {

	state = {
		submittingForm: false,
	};


	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		this.props.start_forgot_password(formData);
	}


	redirectOrNotifyOnStatusChange = nextProps => {
		if (nextProps.status === 200) {
			this.setState({
				submittingForm: false
			});

			return swal({
				title: 'Success!',
				text: `${nextProps.message}`,
				type: 'success',
				timer: 2500,
				showConfirmButton: true
			});			
		}
		this.setState({
			submittingForm: false
		});
		return swal({
			title: 'Error!',
			text: `${nextProps.message}`,
			type: 'error',
			timer: 2500,
			showConfirmButton: true
		});
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
					<div className={styles.header}>
						<div className={styles.title}>Forgot Password</div>
						<div className={styles.description}>All fields are required</div>
					</div>

					<div className={styles.body}>
						<ForgotPasswordForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm}/>
						<Link to={{ pathname: '/' }} className={styles.forgotPassword}>login</Link>
					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.forgotPasswordReducer.status,
		message: state.forgotPasswordReducer.message
	}
}

const mapDispatchToProps = dispatch => {
	return {
		start_forgot_password: credentials => dispatch(start_forgot_password(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);