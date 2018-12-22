import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';

const OutlineForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				name="name"
				component={CustomInput}
				type="name"
				label="Outline Name"
				placeholder="Outline Name"
				validate={[requiredValidator]}
			/>

			{/* <Field
				name="code"
				component={CustomInput}
				type="text"
				placeholder="Outline Code"
				validate={[requiredValidator]}
			/> */}

			<Field
				name="description"
				component={CustomInput}
				type="text"
				label="Outline Description"
				placeholder="Outline Description"
				validate={[requiredValidator]}
			/>

			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'OutlineForm'  
})(OutlineForm);