import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';
import styles from './PayWithTellerForm.component.module.css';

const PayWithTellerForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>

			<div className={styles.instruction}>
				You have already paid to the bank (Teller/Bank Transfer)?
				Please provide us with the teller number and payment date	
			</div>			

			<Field
				name="reference_number"
				component={CustomInput}
				type="text"
				label="Teller number / Reference number"
				placeholder="Teller number"
				validate={[requiredValidator]}
			/>

			<Field
				name="payment_date"
				component={CustomInput}
				type="date"
				label="Payment Date"
				placeholder="Payment Date"
				validate={[requiredValidator]}
			/>

            <div className={styles.makeDecision}>
				<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>SUBMIT</CustomButton>
            </div>
		</form>
	);

}

export default reduxForm({
	form: 'PayWithTellerForm'  
})(PayWithTellerForm);
