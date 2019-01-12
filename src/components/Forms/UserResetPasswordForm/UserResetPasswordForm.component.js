import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator, matchesPassword} from '../../../utils/validation';

const OutlineForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				name="password"
				component={CustomInput}
				type="password"
				label="Password"
				placeholder="Password"
				validate={[requiredValidator]}
			/>

			<Field
				name="password_confirmation"
				component={CustomInput}
				type="password"
				label="Confirm Password"
				placeholder="Confirm Password"
				validate={[requiredValidator, matchesPassword]}
			/>

			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'OutlineForm'  
})(OutlineForm);