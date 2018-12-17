import React from 'react';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './ResetPassword.page.module.css';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';


class ResetPassword extends React.Component {

	state = {
		submittingForm: false,
	};



	handleSubmit = value => {
		console.dir(value);
		this.setState({
			submitIsLoading: true
		});
	}


	redirectOrNotifyOnStatusChange = nextProps => {
		if (nextProps.status === 200) {
			this.setState({
				showLoading: false
			});

			console.dir('can relocate to dashboard');
		}
		if ((nextProps.status === 422) && !(nextProps.message === this.props.message)) {
			this.setState({
				showLoading: false
			});
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
		status: state.authReducer.status,
		message: state.authReducer.message
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// start_login: credentials => dispatch(start_login(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);