import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';
import styles from './NewForumPostCommentForm.component.module.css';

const NewForumPostCommentForm = props => {
	
	const { handleSubmit, pristine, invalid, submittingForm } = props

	return (
		<form onSubmit={handleSubmit}>

			<div className={styles.instruction}>
				Please note that, post will be verified so please don't start a comment that does not make sense
			</div>			

			<Field
				name="post"
				component={CustomInput}
				type="text"
				label="Post"
				placeholder="Post"
				validate={[requiredValidator]}
			/>

            <div className={styles.makeDecision}>
				<CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>SUBMIT</CustomButton>
            </div>
		</form>
	);

}

export default reduxForm({
	form: 'NewForumPostCommentForm'  
})(NewForumPostCommentForm);
