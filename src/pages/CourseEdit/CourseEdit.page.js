import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './CourseEdit.page.module.css';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import CourseForm from '../../components/Forms/CourseForm';
import { get_course, get_courses, store_course, reset_store_course_status, update_course } from '../../shared/store/Course/Course.action.js';

class CourseEdit extends React.Component {

	state = {
		submittingForm: false,
		course: null,
	};

	handleSubmit = formData => {
		formData['course_id'] = this.props.course.id;

		this.setState({
			submittingForm: true
		});

		this.props.update_course(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = nextProps => {
		if (nextProps.update_course_status === 200) {
			swal({
				type: 'success',
				title: `Course was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreCourseStatus();
					this.props.history.push('/course/index');
				}
			});
		}
	}

	redirectIfNotCourses = () => {
		this.props.get_courses();
		if (!this.props.courses.length) {
			this.navigateTo('/course/index');
		}
	}

	setInitialCourseFrom = nextProps => {
		this.setState({
			course: {
				name: nextProps.course.name,
				status: nextProps.course.status,
				has_prerequisite: nextProps.course.has_prerequisite,
				// prerequisite_id: nextProps.course.prerequisite_id
			}
		});
	}

	componentDidMount() {
		this.redirectIfNotCourses();
		this.props.get_course(this.props.match.params.courseSlug);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialCourseFrom(nextProps);
	}

	render() {
		let courseFormContainer = <Spinner />

		if (this.state.course !== null) {
			courseFormContainer = (
				<div>
					<CourseForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								courses={this.props.courses} 
								initialValues={this.state.course}
								course={this.props.course}
								submitText="UPDATE"
					/>
				</div>
			);
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Create New Course" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNewCourse} onClick={() => this.navigateTo('/course/index')}> ALL COURSES </div>
						</div>
						{ courseFormContainer }
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		course: state.coursesReducer.course,
		courses: state.coursesReducer.courses,
		store_course_message: state.coursesReducer.store_course_message,
		update_course_status: state.coursesReducer.update_course_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_courses: () => dispatch( get_courses() ),
		get_course: courseId => dispatch( get_course(courseId) ),
		update_course: payload => dispatch( update_course(payload) ),
		resetStoreCourseStatus: () => dispatch( reset_store_course_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEdit);