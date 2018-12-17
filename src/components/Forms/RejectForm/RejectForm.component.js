import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import styles from './RejectForm.component.module.css';
import {requiredValidator} from '../../../utils/validation';

const RejectForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>
			<Field
				name="message"
				component={CustomInput}
				type="text"
				placeholder="Rejection message"
				validate={[requiredValidator]}
			/>

            <div className={styles.makeDecision}>
				<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>SUBMIT REJECTION</CustomButton>
            </div>
		</form>
	);

}

export default reduxForm({
	form: 'RejectForm'  
})(RejectForm);
