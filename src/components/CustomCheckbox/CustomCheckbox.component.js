import React from 'react';
import styles from './CustomCheckbox.component.module.css';

const CustomInput = props => {

	const { input, meta, type, label, placeholder } = props;

	const inputError = (meta.invalid && meta.touched) ? styles.formControlError : '';
	const inputValid = (meta.valid && meta.touched) ? styles.formControlValid : '';
	const noborder = (props.noborder) ? styles.noborder : ''; 

	
	const classes = `${styles.formControl} ${inputError} ${inputValid} ${noborder} radio-custom`;

	return (
		<div className={styles.formGroup}>

			<div>
				<input {...input} type={type} placeholder={placeholder} className={classes} />
				<label for="radio-1" class="radio-custom-label">First Choice</label>
        	</div>

			{/* <div className={styles.formContainer}>
				<label className={styles.formLabel}>{label}</label>
			</div>
			 */}
			{
				(meta.error && meta.touched) && (
					<div className={styles.errorText}>{meta.error}</div>
				)
			}
		</div>
	);

}


export default CustomInput;