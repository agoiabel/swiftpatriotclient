import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './ProfileEditChangePassword.component.module.css';
import { requiredValidator, matchesPassword } from '../../../utils/validation';

class ProfileEditChangePassword extends React.Component {



	render () {
		return (
			<form onSubmit={this.props.handleSubmit}>

				<div className={styles.lists}>

					<div className={styles.list}>
						<div className={styles.parent}>Password</div>
						<div className={styles.child}>
							<Field
								name="password"
								component={CustomInput}
								type="password"
								placeholder="password"
								validate={[requiredValidator]}
							/>
						</div>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Confirm Password</span>
						<span className={styles.child}>
							<Field
								name="password_confirmation"
								component={CustomInput}
								type="password"
								placeholder="password"
								validate={[requiredValidator, matchesPassword]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}></span>
						<span className={styles.child}>
							<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.submitText}</CustomButton>
						</span>
					</div>

				</div>

			</form>
		);
	}
}

export default reduxForm({
	form: 'ProfileEditChangePassword'  
})(ProfileEditChangePassword);