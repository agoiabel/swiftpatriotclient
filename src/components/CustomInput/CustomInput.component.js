import React from 'react';
import styles from './CustomInput.component.module.css';

const CustomInput = props => {

	const { input, meta, type, label, placeholder } = props;

	const inputError = (meta.invalid && meta.touched) ? styles.formControlError : '';
	const inputValid = (meta.valid && meta.touched) ? styles.formControlValid : '';

	const classes = `${styles.formControl} ${inputError} ${inputValid}`;

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