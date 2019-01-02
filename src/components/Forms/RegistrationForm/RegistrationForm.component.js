import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './RegistrationForm.component.module.css';
import { emailValidator, requiredValidator, matchesPassword } from '../../../utils/validation';

class RegistrationForm extends React.Component {

	state = {
		accountType: 'ADULT'
	};

	accountChanged = (event, newValue, previousValue, name) => {
		this.setState({
			accountType: newValue
		});
	}

	render() {

		let form = (
			<React.Fragment>
				<Field
					name="firstname"
					component={CustomInput}
					type="text"
					label="First Name"
					placeholder="First Name"
					validate={[requiredValidator]}
				/>

				<Field
					name="lastname"
					component={CustomInput}
					type="text"
					label="Last Name"
					placeholder="Last Name"
					validate={[requiredValidator]}
				/>

				<Field
					name="othername"
					component={CustomInput}
					type="text"
					label="Other Name"
					placeholder="Other Name"
				/>

				<div className={styles.inlineGroup}>
					<div className={styles.formGroup}>

						<Field
							name="gender"
							component={CustomSelect}
							validate={[requiredValidator]}
							label="Gender"
							placeholder="Gender"
							options={[
								{ value: 'MALE', displayValue: 'MALE' },
								{ value: 'FEMALE', displayValue: 'FEMALE' }
							]}
						/>

					</div>
					<div className={styles.formGroup}>

						<Field
							name="marital_status"
							component={CustomSelect}
							validate={[requiredValidator]}
							label="Marital Status"
							placeholder="Marital Status"
							options={[
								{ value: 'MARRIED', displayValue: 'MARRIED' },
								{ value: 'SINGLE', displayValue: 'SINGLE' },
							]}
						/>

					</div>
				</div>

				<Field
					name="phone_number"
					component={CustomInput}
					type="number"
					label="Phone number"
					placeholder="Phone number"
				/>

				<Field
					name="date_of_birth"
					component={CustomInput}
					type="date"
					label="Date Of Birth"
				/>

				<Field
					name="residence_address"
					component={CustomInput}
					type="text"
					label="Residence Address"
					placeholder="Residence Address"
				/>


				<Field
					name="country"
					component={CustomSelect}
					validate={[requiredValidator]}
					label="Country"
					placeholder="Country"
					options={[
						{ value: 'NIG', displayValue: 'Nigeria' },
						{ value: 'GHANA', displayValue: 'GHANA' }
					]}
				/>

				<Field
					name="email"
					component={CustomInput}
					type="email"
					label="Email"
					placeholder="Email"
					validate={[requiredValidator, emailValidator]}
				/>



				<div className={styles.inlineGroup}>
					<div className={styles.formGroup}>

						<Field
							name="password"
							component={CustomInput}
							type="password"
							label="Password"
							placeholder="Password"
							validate={[requiredValidator]}
						/>

					</div>
					<div className={styles.formGroup}>

						<Field
							name="password_confirmation"
							component={CustomInput}
							type="password"
							label="Confirm Password"
							placeholder="Confirm Password"
							validate={[requiredValidator, matchesPassword]}
						/>

					</div>
				</div>



			</React.Fragment>
		);

		if (this.state.accountType === 'TEENAGER') {
			form = (
				<React.Fragment>
					<Field
						name="firstname"
						component={CustomInput}
						type="text"
						label="Guardian First Name"
						placeholder="Guardian First Name"
						validate={[requiredValidator]}
					/>

					<Field
						name="lastname"
						component={CustomInput}
						type="text"
						label="Guardian Last Name"
						placeholder="Guardian Last Name"
						validate={[requiredValidator]}
					/>

					<Field
						name="gender"
						component={CustomSelect}
						validate={[requiredValidator]}
						label="Gender"
						placeholder="Gender"
						options={[
							{ value: 'MALE', displayValue: 'MALE' },
							{ value: 'FEMALE', displayValue: 'FEMALE' }
						]}
					/>

					<Field
						name="phone_number"
						component={CustomInput}
						type="number"
						label="Phone number"
						placeholder="Phone number"
					/>

					<Field
						name="country"
						component={CustomSelect}
						validate={[requiredValidator]}
						label="Country"
						placeholder="Country"
						options={[
							{ value: 'NIG', displayValue: 'Nigeria' },
							{ value: 'GHANA', displayValue: 'GHANA' }
						]}
					/>

					<Field
						name="residence_address"
						component={CustomInput}
						type="text"
						label="Residence Address"
						placeholder="Residence Address"
					/>

					<Field
						name="email"
						component={CustomInput}
						type="email"
						label="Email"
						placeholder="Email"
						validate={[requiredValidator, emailValidator]}
					/>

					<div className={styles.inlineGroup}>
						<div className={styles.formGroup}>

							<Field
								name="password"
								component={CustomInput}
								type="password"
								label="Password"
								placeholder="Password"
								validate={[requiredValidator]}
							/>

						</div>
						<div className={styles.formGroup}>

							<Field
								name="password_confirmation"
								component={CustomInput}
								type="password"
								label="Confirm Password"
								placeholder="Confirm Password"
								validate={[requiredValidator, matchesPassword]}
							/>

						</div>
					</div>
				</React.Fragment>
			)
		}

		return (
			<React.Fragment>
				<form onSubmit={this.props.handleSubmit}>

					<Field
						name="account_type"
						component={CustomSelect}
						validate={[requiredValidator]}
						label="Chose Account Type"
						placeholder="Chose Account Type"
						options={[
							{ value: 'ADULT', displayValue: 'Adult' },
							{ value: 'TEENAGER', displayValue: 'Teenager' }
						]}
						onChange={this.accountChanged}
					/>

					{form}


					<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>REGISTER</CustomButton>

				</form>
			</React.Fragment>
		);
	}
}

export default reduxForm({
	form: 'RegistrationForm'
})(RegistrationForm);