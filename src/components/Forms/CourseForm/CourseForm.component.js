import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import MultipleSelect from '../../MultipleSelect';
import {requiredValidator} from '../../../utils/validation';

class CourseForm extends React.Component {
	
    state = {
		has_prerequisite: this.props.course === undefined ? 0 : this.props.course.has_prerequisite,
        courses: []
    };

    hasPrerequisite = (event, newValue, previousValue, name) => {
        this.setState({
            has_prerequisite: newValue
        });
    }

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
		// console.dir(this.props.course);
    	this.formatCourse();
    }


	render () {

		let showCoursePrerequsiteIfItHas = null;

		if (this.state.has_prerequisite == 1) {
			showCoursePrerequsiteIfItHas = (
	            <Field
	                name="prerequisite_ids"
	                component={MultipleSelect}
	                validate={[requiredValidator]}
					label="Chose Course Prerequisite?"
	                placeholder="Chose Course Prerequisite?"
	                options={this.state.courses}
	            />
			)
		}

		return (
			<form onSubmit={this.props.handleSubmit}>
				<Field
					name="name"
					component={CustomInput}
					type="text"
					placeholder="Course Name"
					label="Course Name"
					validate={[requiredValidator]}
				/>

				<Field
					name="status"
					component={CustomSelect}
					validate={[requiredValidator]}
					placeholder="Status?"
					label="Status?"
					options={[
						{ value: 0, displayValue: 'INACTIVE' },
						{ value: 1, displayValue: 'ACTIVE' },
					]}
				/>

	            <Field
	                name="has_prerequisite"
	                component={CustomSelect}
	                validate={[requiredValidator]}
					placeholder="Does course has prerequisite?"
	                label="Does course has prerequisite?"
	                options={[
	                    { value: 0, displayValue: 'NO' },
	                    { value: 1, displayValue: 'YES' },
	                ]}
	                onChange={this.hasPrerequisite}
	            />


	            { showCoursePrerequsiteIfItHas }

				<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>{this.props.submitText}</CustomButton>
			</form>
		);
	}
}

export default reduxForm({
	form: 'CourseForm'  
})(CourseForm);