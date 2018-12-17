/**
 * Email validation
 * 
 * @param value
 * @return 
 */
export const emailValidator = value => {
	return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
}



/**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
 */
const minLengthValidator = length => {
	return value => {
		return value && value.length > length ? undefined : `Must be ${length} characters or more`;
	}
}
export const minLength5 = minLengthValidator(5);




/**
 * maxLength Val
 * @param  value 
 * @param  minLength
 * @return
 */
const maxLengthValidator = length => {
	return value => {
		return value && value.length > length ? `Must be ${length} characters or less` : undefined;
	}
}
export const maxLength8 = maxLengthValidator(8);


/**
 * Check to confirm that field is required
 * 
 * @param  value 
 * @return       
 */
export const requiredValidator = value => value ? undefined : 'Value is required';


export const matchesPassword = (value, allValues) => value === allValues.password ? undefined : 'Passwords must match';