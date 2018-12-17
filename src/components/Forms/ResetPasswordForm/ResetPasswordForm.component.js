import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator, matchesPassword} from '../../../utils/validation';

const ResetPasswordForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="password"
				component={CustomInput}
				type="password"
				placeholder="Enter Password"
				validate={[requiredValidator]}
			/>

			<Field
				name="password_confirmation"
				component={CustomInput}
				type="password"
				placeholder="Type Password Again"
				validate={[requiredValidator, matchesPassword]}
			/>
			<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>SEND</CustomButton>
		</form>
	);

}

export default reduxForm({
	form: 'ResetPasswordForm'  
})(ResetPasswordForm);
