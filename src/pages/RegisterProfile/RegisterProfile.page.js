import React from 'react';
import swal from 'sweetalert2';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import styles from './RegisterProfile.page.module.css';
import { start_register_profile } from './RegisterProfile.page.action';
import RegisterProfileForm from '../../components/Forms/RegisterProfileForm';

class RegisterProfile extends React.Component {

	state = {
		submittingForm: false
	};


	handleSubmit = formData => {
		formData['user_id'] = this.props.match.params.userSlug;
		
		this.setState({
			submittingForm: true
		});

		this.props.start_register_profile(formData);
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

	redirectOrNotifyOnStatusChange = nextProps => {
		if (nextProps.status === 200) {
			this.setState({
				submittingForm: false
			});
			return swal({
				type: 'success',
				title: `Profile registration was successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					return this.props.history.push('/');
				}
			});
		}
		return this.showErrorNotificationFor(nextProps);
	}


	componentWillReceiveProps(nextProps) {
		this.redirectOrNotifyOnStatusChange(nextProps);
	}

	componentDidMount() {
		// console.dir(this.props.match.params.accountType);
		// console.dir(this.props.match.params.userSlug);
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
						<div className={styles.title}>Complete your profile</div>
						<div className={styles.description}>All fields are required</div>
					</div>

					<div className={styles.body}>
						<RegisterProfileForm 
								onSubmit={this.handleSubmit} 
								submittingForm={this.state.submittingForm}
								accountType={this.props.match.params.accountType}
								userSlug={this.props.match.params.userSlug} 
						/>
						<Link to={{ pathname: '/forgotPassword' }} className={styles.forgotPassword}>forgot password</Link>					
					</div>
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.registerProfileReducer.status,
		message: state.registerProfileReducer.message,
		role_id: state.registerProfileReducer.role_id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		start_register_profile: credentials => dispatch(start_register_profile(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProfile);