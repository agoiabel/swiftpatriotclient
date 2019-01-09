import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import CustomSelect from '../../CustomSelect';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';

class FacilitatorOutlineForm extends React.Component {

	state = {
		outlines: [],
		facilitators: []
	}

	formatOutlines = () => {
		this.setState({
			outlines: this.props.outlines.map(outline => {
				return {
					value: outline.id,
					displayValue: outline.name
				}
			})
		});
	}

	formatFacilitators = () => {
		this.setState({
			facilitators: this.props.facilitators.map(facilitator => {
				return {
					value: facilitator.id,
					displayValue: `${facilitator.firstname} ${facilitator.lastname} ${facilitator.othername}`
				}
			})
		});
	}

	componentDidMount() {
		this.formatOutlines();
		this.formatFacilitators();
	}
	
	render() {

		let button = (
			<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>ADD</CustomButton>
		);

		if (this.props.submittingForm) {
			button = null;
		}

		return (

			<form onSubmit={this.props.handleSubmit}>
			
				<Field
					name="outline_id"
					component={CustomSelect}
					type="name"
					label="Outline"
					placeholder="Outline"
					validate={[requiredValidator]}
					options={this.state.outlines}
				/>

				<Field
					name="facilitator_id"
					component={CustomSelect}
					type="text"
					label="Facilitator"
					placeholder="Facilitator"
					validate={[requiredValidator]}
					options={this.state.facilitators}
				/>

				<Field
					name="date"
					component={CustomInput}
					type="date"
					label="Course Date"
					validate={[requiredValidator]}
				/>

				<Field
					name="time"
					component={CustomInput}
					type="time"
					label="Time"
					placeholder="Time"
					validate={[requiredValidator]}
				/>

				{ button }

			</form>

		);
	}

}

export default reduxForm({
	form: 'FacilitatorOutlineForm'  
})(FacilitatorOutlineForm);