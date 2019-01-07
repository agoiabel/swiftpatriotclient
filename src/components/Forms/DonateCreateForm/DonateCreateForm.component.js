import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';

class DonateCreateForm extends React.Component {

	state = {
		payment_method: 'online_transfer'
	};

	paymentMethodHandler = (event, newValue, previousValue, name) => {
		this.setState({
			payment_method: newValue
		});
	}


	render () {

		let teller_number_field;

		if (this.state.payment_method === 'bank_transfer') {
			teller_number_field = (
				<React.Fragment>
					<Field
						name="reference_number"
						component={CustomInput}
						type="text"
						label="Reference number"
						placeholder="Reference number"
						validate={[requiredValidator]}
					/>

					<Field
						name="payment_date"
						component={CustomInput}
						type="date"
						label="Payment Date"
						placeholder="Payment Date"
						validate={[requiredValidator]}
					/>	
				</React.Fragment>
			)
		}

		return (
			<form onSubmit={this.props.handleSubmit}>

				<Field
					name="amount"
					component={CustomInput}
					type="number"
					label="Amount"
					placeholder="Amount"
					validate={[requiredValidator]}
				/>

				<Field
					name="type"
					component={CustomSelect}
					validate={[requiredValidator]}
					placeholder="How do you want to pay"
					label="How do you want to pay"
					options={[
						{ value: 'bank_transfer', displayValue: 'bank transfer / teller' },
						{ value: 'online', displayValue: 'Online Payment' },
					]}
					onChange={this.paymentMethodHandler}
				/>

				{ teller_number_field }

				<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.submitText}</CustomButton>
			</form>
		);
	}

}

export default reduxForm({
	form: 'DonateCreateForm'  
})(DonateCreateForm);