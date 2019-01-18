import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'; 
import Spinner from '../../components/Spinner';
import styles from './ConfirmEmail.page.module.css';
import { email_confirmation_start } from './ConfirmEmail.page.action';

class ConfirmEmail extends React.Component {

	componentDidMount() {
		this.props.email_confirmation_start(this.props.match.params.token);
	}

	render() {

		let body = <Spinner />

		let loginLink = null;

		if (this.props.status !== null) {

			if (this.props.status === 200) {
				loginLink = (
					<Link to={{ pathname: '/' }} className={styles.dontHaveAnAccountLink}>Login</Link>
				)
			}

			body = (
				<div>
					<p className={styles.message}>{this.props.message}</p>

					<div className={styles.login}>
						{loginLink}
					</div>
				</div>
			);
		}

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

					{ body }
				</div>	
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		status: state.confirmEmailReducer.status,
		message: state.confirmEmailReducer.message
	}
}

const mapDispatchToProps = dispatch => {
	return {
		email_confirmation_start: credentials => dispatch(email_confirmation_start(credentials)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);