import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import PortalMenu from '../../components/PortalMenu';
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


	showNotificationFrom = async nextProps => {
		if (nextProps.store_course_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Course was created successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreCourseStatus();
				this.props.history.push('/course/index');
			}
		}
	}

	componentDidMount() {
		this.props.get_courses();
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
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNewCourse} onClick={() => this.navigateTo('/course/index')}> ALL COURSES </div>
						</div>
						<div>
							<CourseForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} courses={this.props.courses} submitText="CREATE" />
						</div>
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