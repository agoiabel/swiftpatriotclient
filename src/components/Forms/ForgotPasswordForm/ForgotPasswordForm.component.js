import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {emailValidator, requiredValidator} from '../../../utils/validation';

const ForgotPasswordForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="email"
				component={CustomInput}
				type="email"
				placeholder="Email"
				validate={[requiredValidator, emailValidator]}
			/>

			<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>SEND</CustomButton>
		</form>
	);

}

export default reduxForm({
	form: 'ForgotPasswordForm'  
})(ForgotPasswordForm);
