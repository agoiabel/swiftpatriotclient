import React from 'react';
import CustomInput from '../../CustomInput';
import CustomSelect from '../../CustomSelect';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
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
	                name="prerequisite_id"
	                component={CustomSelect}
	                validate={[requiredValidator]}
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
					validate={[requiredValidator]}
				/>

				<Field
					name="description"
					component={CustomInput}
					type="text"
					placeholder="Course Description"
					validate={[requiredValidator]}
				/>

				<Field
					name="duration"
					component={CustomInput}
					type="number"
					placeholder="Number of days (duration)"
					validate={[requiredValidator]}
				/>

	            <Field
	                name="has_prerequisite"
	                component={CustomSelect}
	                validate={[requiredValidator]}
	                placeholder="Does course has prerequisite?"
	                options={[
	                    { value: 0, displayValue: 'NO' },
	                    { value: 1, displayValue: 'YES' },
	                ]}
	                onChange={this.hasPrerequisite}
	            />


	            { showCoursePrerequsiteIfItHas }

				<CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>CREATE</CustomButton>
			</form>
		);
	}
}

export default reduxForm({
	form: 'CourseForm'  
})(CourseForm);