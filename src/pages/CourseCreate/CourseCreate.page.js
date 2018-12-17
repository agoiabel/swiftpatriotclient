import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './CourseCreate.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';

import CourseForm from '../../components/Forms/CourseForm';
import { get_courses, store_course, reset_store_course_status } from '../../shared/store/Course/Course.action.js';

class CourseCreate extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		this.props.store_course(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = nextProps => {
		if (nextProps.store_course_status === 200) {
			swal({
				type: 'success',
				title: `Course was created successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreCourseStatus();
					this.props.history.push('/course/index');
				}
			});
		}
	}

	componentDidMount() {
		this.props.get_courses();
		// if (! this.props.courses.length) {
		// 	this.navigateTo('/course/index');
		// }
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Create New Course" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNewCourse} onClick={() => this.navigateTo('/course/index')}> ALL COURSES </div>
					</div>
					<div>
						<CourseForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} courses={this.props.courses} />
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		courses: state.coursesReducer.courses,
		store_course_message: state.coursesReducer.message,
		store_course_status: state.coursesReducer.store_course_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_courses: () => dispatch( get_courses() ),
		store_course: payload => dispatch( store_course(payload) ),
		resetStoreCourseStatus: () => dispatch( reset_store_course_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseCreate);