import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';
import styles from './ProfileEditForm.component.module.css';

class ProfileEditForm extends React.Component {



	render () {
		return (
			<form onSubmit={this.props.handleSubmit}>

				<div className={styles.lists}>

					<div className={styles.list}>
						<div className={styles.parent}>First Name</div>
						<div className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</div>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Last Name</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Other Name</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Email Address</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Matric Number</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Profile Type</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Gender</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Marital Status</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Phone number</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Date of birth</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Residence Address</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Employment Status</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Company Name</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Company Phone number</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Company Email Address</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Position</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Religion</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

					<div className={styles.list}>
						<span className={styles.parent}>Ministry</span>
						<span className={styles.child}>
							<Field
								name="first_name"
								component={CustomInput}
								type="name"
								placeholder="first_name"
								validate={[requiredValidator]}
							/>
						</span>
					</div>

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