import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';

const OutlineForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>

			<Field
				name="question"
				component={CustomInput}
				type="text"
				label="Question"
				placeholder="Question"
				validate={[requiredValidator]}
			/>

			<Field
				name="type"
				component={CustomSelect}
				validate={[requiredValidator]}
				label="Type"
				placeholder="Type"
				options={[
					{ value: '1', displayValue: 'Session Course Outline' },
					{ value: '2', displayValue: 'Session' },
					{ value: '3', displayValue: 'General' }
				]}
			/>

			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'OutlineForm'  
})(OutlineForm);