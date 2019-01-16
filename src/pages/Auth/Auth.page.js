import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './Auth.page.module.css';
import { start_login } from './Auth.page.action';
import AuthForm from '../../components/Forms/AuthForm';

class Auth extends React.Component {

	state = {
		submittingForm: false
	};


	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		this.props.start_login(formData);
	}


	showErrorNotificationFor = message => {
		this.setState({
			submittingForm: false
		});		
		return swal({
			title: `Error`,
			type: 'warning',
			text: `${message}`,
			showCancelButton: false,
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Okay!'
		}).then((result) => {
			if (result.value) {
				// console.dir('can reset user');
			}
		});
	}

	redirectBaseOn = role_id => {
		if (role_id === 2) {
			return this.props.history.push('/course/index');
		}
		return this.props.history.push('/student-dashboard');
	}

	redirectOrNotifyOnStatusChange = nextProps => {
		if (nextProps.status === 200 && nextProps.message) {
			if (nextProps.account_type == 'ADULT' && nextProps.email_confirmed == 0) {
				return this.showErrorNotificationFor('You need to verify your account first, check your email');
			}
			this.setState({
				submittingForm: false
			});
			return this.redirectBaseOn(nextProps.role_id);
		}
		return this.showErrorNotificationFor('Your Email/Password not correct');
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
						<div className={styles.title}>Login to your account</div>
					</div>

					<div className={styles.body}>
						<AuthForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
						<div className={styles.otherLinks}>
							<Link to={{ pathname: '/forgotPassword' }} className={styles.forgotPassword}>forgot password</Link>
							<Link to={{ pathname: '/register' }} className={styles.forgotPassword}>Register</Link>					
						</div>
					</div>
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.authReducer.status,
		message: state.authReducer.message,
		role_id: state.authReducer.role_id,
		account_type: state.authReducer.account_type,
		email_confirmed: state.authReducer.email_confirmed
	}
}

const mapDispatchToProps = dispatch => {
	return {
		start_login: credentials => dispatch(start_login(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);