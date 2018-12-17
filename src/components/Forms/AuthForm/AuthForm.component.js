import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {emailValidator, requiredValidator} from '../../../utils/validation';

const AuthForm = props => {
	
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

			<Field
				name="password"
				component={CustomInput}
				type="password"
				placeholder="Password"
				validate={[requiredValidator]}
			/>

			<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>LOGIN</CustomButton>
		</form>
	);

}

export default reduxForm({
	form: 'AuthForm'  
})(AuthForm);