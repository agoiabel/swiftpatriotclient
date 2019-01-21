import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator, emailValidator} from '../../../utils/validation';

const StudentEditForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				name="email"
				component={CustomInput}
				type="email"
				label="Email"
				placeholder="Email"
				validate={[requiredValidator, emailValidator]}
			/>

			<Field
				name="matric_number"
				component={CustomInput}
				type="text"
				label="Matric Number"
				placeholder="Matric Number"
			/>

			<Field
				name="email_confirmed"
				component={CustomSelect}
				label="Confirm Email"
				placeholder="Confirm Email"
				validate={[requiredValidator]}
				options={[
					{ value: '0', displayValue: 'NO' },
					{ value: '1', displayValue: 'YES' },
				]}
			/>

			<Field
				name="is_banned"
				component={CustomSelect}
				label="Banned"
				placeholder="Banned"
				validate={[requiredValidator]}
				options={[
					{ value: '0', displayValue: 'No' },
					{ value: '1', displayValue: 'Yes' },
				]}
			/>

			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'StudentEditForm'  
})(StudentEditForm);