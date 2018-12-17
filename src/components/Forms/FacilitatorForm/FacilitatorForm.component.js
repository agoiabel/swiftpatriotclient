import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator, emailValidator } from '../../../utils/validation';

const OutlineForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
		
			<Field
				name="email"
				component={CustomInput}
				type="email"
				placeholder="Facilitator Email"
				validate={[requiredValidator, emailValidator]}
			/>

			<Field
				name="firstname"
				component={CustomInput}
				type="text"
				placeholder="Firstname"
				validate={[requiredValidator]}
			/>

			<Field
				name="lastname"
				component={CustomInput}
				type="text"
				placeholder="Lastname"
				validate={[requiredValidator]}
			/>

			<Field
				name="othername"
				component={CustomInput}
				type="text"
				placeholder="Othername"
				validate={[requiredValidator]}
			/>

			<Field
				name="phone_number"
				component={CustomInput}
				type="number"
				placeholder="Phone number"
				validate={[requiredValidator]}
			/>

			<Field
				name="gender"
				component={CustomSelect}
				validate={[requiredValidator]}
				placeholder="What is the facilitator gender?"
				options={[
					{ value: 'MALE', displayValue: 'MALE' },
					{ value: 'FEMALE', displayValue: 'FEMALE' },
				]}
			/>


			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>CREATE</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'OutlineForm'  
})(OutlineForm);