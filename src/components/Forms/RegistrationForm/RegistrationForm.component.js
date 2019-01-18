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
						{ value: 'Nigeria', displayValue: 'Nigeria' },
						{ value: 'Albania', displayValue: 'Albania' },
						{ value: 'Algeria', displayValue: 'Algeria' },
						{ value: 'Andorra', displayValue: 'Andorra' },
						{ value: 'Angola', displayValue: 'Angola' },
						{ value: 'Antigua and Barbuda', displayValue: 'Antigua and Barbuda' },
						{ value: 'Argentina', displayValue: 'Argentina' },
						{ value: 'Armenia', displayValue: 'Armenia' },
						{ value: 'Australia', displayValue: 'Australia' },
						{ value: 'Austria', displayValue: 'Austria' },
						{ value: 'Azerbaijan', displayValue: 'Azerbaijan' },


						
						{ value: 'The Bahamas', displayValue: 'The Bahamas' },
						{ value: 'Bahrain', displayValue: 'Bahrain' },
						{ value: 'Bangladesh', displayValue: 'Bangladesh' },
						{ value: 'Barbados', displayValue: 'Barbados' },
						{ value: 'Belarus', displayValue: 'Belarus' },
						{ value: 'Belgium', displayValue: 'Belgium' },
						{ value: 'Belize', displayValue: 'Belize' },
						{ value: 'Benin', displayValue: 'Benin' },
						{ value: 'Bhutan', displayValue: 'Bhutan' },
						{ value: 'Bolivia', displayValue: 'Bolivia' },
						{ value: 'Bosnia and Herzegovina', displayValue: 'Bosnia and Herzegovina' },
						{ value: 'Botswana', displayValue: 'Botswana' },
						{ value: 'Burundi', displayValue: 'Burundi' },

						{ value: 'The Bahamas', displayValue: 'The Bahamas' },
						{ value: 'Bahrain', displayValue: 'Bahrain' },
						{ value: 'Bangladesh', displayValue: 'Bangladesh' },
						{ value: 'Barbados', displayValue: 'Barbados' },
						{ value: 'Belarus', displayValue: 'Belarus' },
						{ value: 'Belgium', displayValue: 'Belgium' },
						{ value: 'Belize', displayValue: 'Belize' },
						{ value: 'Benin', displayValue: 'Benin' },
						{ value: 'Bhutan', displayValue: 'Bhutan' },
						{ value: 'Bolivia', displayValue: 'Bolivia' },
						{ value: 'Bosnia and Herzegovina', displayValue: 'Bosnia and Herzegovina' },
						{ value: 'Botswana', displayValue: 'Botswana' },
						{ value: 'Burkina Faso', displayValue: 'Burkina Faso' },
						{ value: 'Burundi', displayValue: 'Burundi' },

						{ value: 'Cabo Verde', displayValue: 'Cabo Verde' },
						{ value: 'Cameroon', displayValue: 'Cameroon' },
						{ value: 'Central African Republic (CAR)', displayValue: 'Central African Republic (CAR)' },
						{ value: 'Chad', displayValue: 'Chad' },
						{ value: 'Comoros', displayValue: 'Comoros' },
						{ value: 'Democratic Republic of the Congo', displayValue: 'Democratic Republic of the Congo' },
						{ value: 'Republic of the Congo', displayValue: 'Republic of the Congo' },
						{ value: 'Cote d\'Ivoire', displayValue: 'Cote d\'Ivoire' },

						{ value: 'Djibouti', displayValue: 'Djibouti' },


						{ value: 'Egypt', displayValue: 'Egypt' },
						{ value: 'Equatorial Guinea', displayValue: 'Equatorial Guinea' },
						{ value: 'Eritrea', displayValue: 'Eritrea' },
						{ value: 'Eswatini (formerly Swaziland)', displayValue: 'Eswatini (formerly Swaziland)' },
						{ value: 'Ethiopia', displayValue: 'Ethiopia' },
						{ value: 'Gabon', displayValue: 'Gabon' },
						{ value: 'Gambia', displayValue: 'Gambia' },
						{ value: 'Ghana', displayValue: 'Ghana' },
						{ value: 'Guinea', displayValue: 'Guinea' },


						{ value: 'Guinea-Bissau', displayValue: 'Guinea-Bissau' },


						{ value: 'Kenya', displayValue: 'Kenya' },


						{ value: 'Lesotho', displayValue: 'Lesotho' },
						{ value: 'Liberia', displayValue: 'Liberia' },
						{ value: 'Libya', displayValue: 'Libya' },


						{ value: 'Madagascar', displayValue: 'Madagascar' },
						{ value: 'Malawi', displayValue: 'Malawi' },
						{ value: 'Mali', displayValue: 'Mali' },
						{ value: 'Mauritania', displayValue: 'Mauritania' },
						{ value: 'Mauritius', displayValue: 'Mauritius' },
						{ value: 'Morocco', displayValue: 'Morocco' },
						{ value: 'Mozambique', displayValue: 'Mozambique' },
					
						{ value: 'Namibia', displayValue: 'Namibia' },
						{ value: 'Niger', displayValue: 'Niger' },

						{ value: 'Rwanda', displayValue: 'Rwanda' },
						
						{ value: 'Sao Tome and Principe', displayValue: 'Sao Tome and Principe' },
						{ value: 'Senegal', displayValue: 'Senegal' },
						{ value: 'Seychelles', displayValue: 'Seychelles' },
						{ value: 'Sierra Leone', displayValue: 'Sierra Leone' },
						{ value: 'Somalia', displayValue: 'Somalia' },
						{ value: 'Senegal', displayValue: 'Senegal' },
						{ value: 'South Africa', displayValue: 'South Africa' },
						{ value: 'South Sudan', displayValue: 'South Sudan' },
						

						{ value: 'Sudan', displayValue: 'Sudan' },
						{ value: 'Swaziland (renamed to Eswatini)', displayValue: 'Swaziland (renamed to Eswatini)' },
						{ value: 'Seychelles', displayValue: 'Seychelles' },
						{ value: 'Tanzania', displayValue: 'Tanzania' },
						{ value: 'Togo', displayValue: 'Togo' },

						{ value: 'Djibouti', displayValue: 'Djibouti' },
						{ value: 'South Africa', displayValue: 'South Africa' },
						{ value: 'South Sudan', displayValue: 'South Sudan' },

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