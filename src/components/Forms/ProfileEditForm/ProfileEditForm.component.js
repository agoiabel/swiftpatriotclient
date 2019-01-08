import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';
import styles from './ProfileEditForm.component.module.css';

class ProfileEditForm extends React.Component {


	render () {

		let other_forms;

		if (this.props.user.type === "ADULT") {
			other_forms = (
				<React.Fragment>
					<div className={styles.list}>
						<span className={styles.parent}>Marital Status</span>
						<span className={styles.child}>
							<Field
								name="marital_status"
								component={CustomInput}
								type="text"
								placeholder="marital_status"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Employment Status</span>
						<span className={styles.child}>
							<Field
								name="employment_status"
								component={CustomSelect}
								placeholder="employment_status"
								validate={[requiredValidator]}
								options={[
									{ value: 'EMPLOYED', displayValue: 'EMPLOYED' },
									{ value: 'UNEMPLOYED', displayValue: 'UNEMPLOYED' },
									{ value: 'SELF EMPLOYED', displayValue: 'SELF EMPLOYED' }
								]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Company Name</span>
						<span className={styles.child}>
							<Field
								name="company_name"
								component={CustomInput}
								type="text"
								placeholder="company_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Company Phone number</span>
						<span className={styles.child}>
							<Field
								name="company_phone_number"
								component={CustomInput}
								type="number"
								placeholder="company_phone_number"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Position</span>
						<span className={styles.child}>
							<Field
								name="position_in_company"
								component={CustomInput}
								type="text"
								placeholder="position_in_company"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Religion</span>
						<span className={styles.child}>
							<Field
								name="religion"
								component={CustomSelect}
								validate={[requiredValidator]}
								label="Religion"
								placeholder="Religion"
								options={[
									{ value: 'Christain', displayValue: 'Christain' },
									{ value: 'Muslim', displayValue: 'Muslim' },
									{ value: 'Others', displayValue: 'Others' }
								]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Ministry</span>
						<span className={styles.child}>
							<Field
								name="name_of_ministry"
								component={CustomSelect}
								validate={[requiredValidator]}
								label="name_of_ministry"
								placeholder="name_of_ministry"
								options={[
									{ value: 'DayStar', displayValue: 'DayStar' },
									{ value: 'Others', displayValue: 'Others' },
								]}
							/>
						</span>
					</div>
				</React.Fragment>
			)
		}


		return (
			<form onSubmit={this.props.handleSubmit}>

				<div className={styles.lists}>

					<div className={styles.list}>
						<div className={styles.parent}>First Name</div>
						<div className={styles.child}>
							<Field
								name="firstname"
								component={CustomInput}
								type="text"
								placeholder="firstname"
								validate={[requiredValidator]}
							/>
						</div>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Last Name</span>
						<span className={styles.child}>
							<Field
								name="lastname"
								component={CustomInput}
								type="text"
								placeholder="lastname"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Other Name</span>
						<span className={styles.child}>
							<Field
								name="othername"
								component={CustomInput}
								type="text"
								placeholder="othername"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Email Address</span>
						<span className={styles.child}>
							<Field
								name="email"
								component={CustomInput}
								type="email"
								placeholder="email"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Gender</span>
						<span className={styles.child}>
							<Field
								name="gender"
								component={CustomSelect}
								placeholder="gender"
								validate={[requiredValidator]}
								options={[
									{ value: 'MALE', displayValue: 'MALE' },
									{ value: 'FEMALE', displayValue: 'FEMALE' }
								]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Phone number</span>
						<span className={styles.child}>
							<Field
								name="phone_number"
								component={CustomInput}
								type="number"
								placeholder="phone_number"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Residence Address</span>
						<span className={styles.child}>
							<Field
								name="residence_address"
								component={CustomInput}
								type="text"
								placeholder="residence_address"
								validate={[requiredValidator]}
							/>
						</span>
					</div>


					{ other_forms }


					<div className={styles.list}>
						<span className={styles.parent}></span>
						<span className={styles.child}>
							<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.submitText}</CustomButton>
						</span>
					</div>

				</div>

			</form>
		);
	}
}

export default reduxForm({
	form: 'ProfileEditForm'  
})(ProfileEditForm);