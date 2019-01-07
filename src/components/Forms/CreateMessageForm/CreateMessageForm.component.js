import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';
import styles from './CreateMessageForm.component.module.css';

const CreateMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={styles.container}>
				<div className={styles.formGroup}>
					<Field
						name="body"
						component={CustomInput}
						type="name"
						placeholder="You can type your message here"
						noborder
						validate={[requiredValidator]}
					/>
				</div>
				<div className={styles.button}>
					<CustomButton disabled={props.invalid || props.pristine} submittingForm={props.submittingForm}>{props.submitText}</CustomButton>
				</div>
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'CreateMessageForm'  
})(CreateMessageForm);