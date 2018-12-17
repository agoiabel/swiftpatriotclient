import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './RegisterProfileForm.component.module.css';
import { emailValidator, requiredValidator, matchesPassword } from '../../../utils/validation';

class RegisterProfileForm extends React.Component {

	componentDidMount() {}

	render() {

		let form = (
			<React.Fragment>
				<Field
					name="firstname"
					component={CustomInput}
					type="text"
					placeholder="First Name"
					validate={[requiredValidator]}
				/>

				<Field
					name="lastname"
					component={CustomInput}
					type="text"
					placeholder="Last Name"
					validate={[requiredValidator]}
				/>

				<Field
					name="othername"
					component={CustomInput}
					type="text"
					placeholder="Other Name"
				/>

				<Field
					name="gender"
					component={CustomSelect}
					validate={[requiredValidator]}
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
					placeholder="Phone number"
				/>

				<Field
					name="date_of_birth"
					component={CustomInput}
					type="date"
					label="Date Of Birth"
				/>


			</React.Fragment>
		);

		if (this.props.accountType === 'ADULT') {
			form = (
				<React.Fragment>

					<Field
						name="employment_status"
						component={CustomSelect}
						validate={[requiredValidator]}
						placeholder="Employment Status"
						options={[
							{ value: 'MALE', displayValue: 'MALE' },
							{ value: 'FEMALE', displayValue: 'FEMALE' }
						]}
					/>

					<Field
						name="company_name"
						component={CustomInput}
						type="text"
						placeholder="Business/Company Name"
						validate={[requiredValidator]}
					/>

					<Field
						name="office_position"
						component={CustomInput}
						type="text"
						placeholder="Office Designation/Position"
						validate={[requiredValidator]}
					/>


					<Field
						name="office_address"
						component={CustomInput}
						type="text"
						placeholder="Business/Company Address"
					/>


					<Field
						name="office_phone_number"
						component={CustomInput}
						type="number"
						placeholder="Business/Company Phone number"
					/>

					<Field
						name="religion"
						component={CustomSelect}
						validate={[requiredValidator]}
						placeholder="Religion"
						options={[
							{ value: 'Christain', displayValue: 'Christain' },
							{ value: 'Muslim', displayValue: 'Muslim' },
							{ value: 'Others', displayValue: 'Others' }
						]}
					/>

					<Field
						name="name_of_ministry"
						component={CustomSelect}
						validate={[requiredValidator]}
						placeholder="Religion"
						options={[
							{ value: 'DayStar', displayValue: 'DayStar' },
							{ value: 'Others', displayValue: 'Others' },
						]}
					/>
				</React.Fragment>
			)
		}

		return (
			<React.Fragment>
				<form onSubmit={this.props.handleSubmit}>

					{ form }

					<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>SUBMIT PROFILE</CustomButton>
				</form>
			</React.Fragment>
		);
	}
}

export default reduxForm({
	form: 'RegisterProfileForm'
})(RegisterProfileForm);