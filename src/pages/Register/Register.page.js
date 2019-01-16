import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './Register.page.module.css';
import { start_registration } from './Register.page.action';
import RegistrationForm from '../../components/Forms/RegistrationForm';

class Register extends React.Component {

	state = {
		submittingForm: false
	};


	handleSubmit = formData => {
		formData['role_id'] = 5;

		this.setState({
			submittingForm: true
		});

		this.props.start_registration(formData);
	}


	showErrorNotificationFor = nextProps => {
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

	redirectBaseOn = role_id => {
		if (role_id === 2) {
			return this.props.history.push('/course/index');
		}
	}

	redirectOrNotifyOnStatusChange = nextProps => {
		if (nextProps.status === 200) {
			this.setState({
				submittingForm: false
			});

			return this.props.history.push(`/register-profile/${nextProps.account_type}/${nextProps.user.id}`);
		}
		return this.showErrorNotificationFor(nextProps);
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
						<div className={styles.title}>Register your account</div>
					</div>

					<div className={styles.body}>
						<RegistrationForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
						<Link to={{ pathname: '/' }} className={styles.forgotPassword}>Login</Link>					
					</div>
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.registrationReducer.user,
		status: state.registrationReducer.status,
		message: state.registrationReducer.message,
		role_id: state.registrationReducer.role_id,
		account_type: state.registrationReducer.account_type,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		start_registration: credentials => dispatch(start_registration(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);