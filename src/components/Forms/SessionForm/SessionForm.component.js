import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import {requiredValidator} from '../../../utils/validation';

class SessionForm extends React.Component {
	
    state = {
        courses: []
    };

    formatCourse = () => {
    	const newCourseArray = this.props.courses.map(course => {
    		return {
    			value: course.id,
    			displayValue: course.name
    		}
    	}); 

    	this.setState({
    		courses: newCourseArray
    	});
    }

    componentDidMount() {
    	this.formatCourse();
    }


	render () {

		return (
			<form onSubmit={this.props.handleSubmit}>

				<Field
					name="course_id"
					component={CustomSelect}
					validate={[requiredValidator]}
					label="Choose Session Course?"
					placeholder="Choose Session Course?"
					options={this.state.courses}
				/>

				<Field
					name="start_date"
					component={CustomInput}
					type="date"
					label="Start Date"
					validate={[requiredValidator]}
				/>

				<Field
					name="end_date"
					component={CustomInput}
					type="date"
					label="End Date"
					validate={[requiredValidator]}
				/>

				<Field
					name="registration_start_date"
					component={CustomInput}
					type="date"
					label="Registration Start Date"
					validate={[requiredValidator]}
				/>

				<Field
					name="registration_end_date"
					component={CustomInput}
					type="date"
					label="Registration End Date"
					validate={[requiredValidator]}
				/>

				<Field
					name="fee"
					component={CustomInput}
					type="number"
					label="Fee"
					placeholder="Fee"
					validate={[requiredValidator]}
				/>

				<Field
					name="theme"
					component={CustomInput}
					type="text"
					label="Theme"
					placeholder="Theme"
					validate={[requiredValidator]}
				/>


				<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.submitText}</CustomButton>
			</form>
		);
	}
}

export default reduxForm({
	form: 'SessionForm'  
})(SessionForm);