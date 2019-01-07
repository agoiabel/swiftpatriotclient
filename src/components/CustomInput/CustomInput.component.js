import React from 'react';
import styles from './CustomInput.component.module.css';

const CustomInput = props => {

	const { input, meta, type, label, placeholder } = props;

	const inputError = (meta.invalid && meta.touched) ? styles.formControlError : '';
	const inputValid = (meta.valid && meta.touched) ? styles.formControlValid : '';
	const noborder = (props.noborder) ? styles.noborder : ''; 

	
	const classes = `${styles.formControl} ${inputError} ${inputValid} ${noborder}`;

	return (
		<div className={styles.formGroup}>
			<label className={styles.formLabel}>{label}</label>
			<input {...input} type={type} placeholder={placeholder} className={classes} />

			{
				(meta.error && meta.touched) && (
					<div className={styles.errorText}>{meta.error}</div>
				)
			}
		</div>
	);

}


export default CustomInput;