import React from 'react';
import styles from './CustomFileInput.component.module.css';

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const CustomFileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps,
  },
  meta: omitMeta,
  ...props,
}) => (
	<div className={styles.formGroup}>  
		<input
		onChange={adaptFileEventToValue(onChange)}
		onBlur={adaptFileEventToValue(onBlur)}
		type="file"
		className={styles.formControl}
		{...inputProps}
		{...props}
		/>
	</div>
)

export default CustomFileInput;