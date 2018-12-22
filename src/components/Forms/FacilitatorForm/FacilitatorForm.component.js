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
				label="Facilitator Email"
				placeholder="Facilitator Email"
				validate={[requiredValidator, emailValidator]}
			/>

			<Field
				name="firstname"
				component={CustomInput}
				type="text"
				label="Firstname"
				placeholder="Firstname"
				validate={[requiredValidator]}
			/>

			<Field
				name="lastname"
				component={CustomInput}
				type="text"
				label="Lastname"
				placeholder="Lastname"
				validate={[requiredValidator]}
			/>

			<Field
				name="phone_number"
				component={CustomInput}
				type="number"
				label="Phone number"
				placeholder="Phone number"
				validate={[requiredValidator]}
			/>

			<Field
				name="gender"
				component={CustomSelect}
				validate={[requiredValidator]}
				label="What is the facilitator gender?"
				placeholder="What is the facilitator gender?"
				options={[
					{ value: 'MALE', displayValue: 'MALE' },
					{ value: 'FEMALE', displayValue: 'FEMALE' },
				]}
			/>


			<Field
				name="facebook"
				component={CustomInput}
				type="text"
				label="Facebook"
				placeholder="Facebook"
				validate={[requiredValidator]}
			/>


			<Field
				name="instagram"
				component={CustomInput}
				type="text"
				label="Instagram"
				placeholder="Instagram"
				validate={[requiredValidator]}
			/>


			<Field
				name="twitter"
				component={CustomInput}
				type="text"
				label="Twitter"
				placeholder="Twitter"
				validate={[requiredValidator]}
			/>

			<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
		</form>
	);
}

export default reduxForm({
	form: 'OutlineForm'  
})(OutlineForm);