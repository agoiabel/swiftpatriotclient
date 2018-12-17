import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import CourseData from './CourseData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './CourseIndex.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import { get_courses, deleteCourse, reset_store_course_status } from '../../shared/store/Course/Course.action.js';
import EmptyState from '../../components/EmptyState';

class CourseIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_courses();
	}

	showActionFor = course => {
		this.setState({ showAction: this.state.showAction === course.id ? null : course.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = (course, index) => {
		swal({
			title: `Are you sure you want to delete ${course.name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		}).then((result) => {
			if (result.value) {
				this.props.delete({
					courseId: course.id,
					arrayKey: index
				});
			}
		});
	}


	edit = course => {
		return this.navigateTo(`/course/edit/${course.id}`);
	} 


	showNotificationFrom = nextProps => {
		if (nextProps.delete_course_status === 200) {
			swal({
				type: 'success',
				title: `Course was deleted successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreCourseStatus();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let courses = <Spinner message="Loading Courses" />

		if (this.props.get_course_status === 200 && !this.props.courses.length) {
			courses = <EmptyState message="No Course in database" />
		}

		if (this.props.get_course_status === 200 && this.props.courses.length) {

			courses = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Course Name</th>
							<th>Course Duration</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.courses.map((course, index) => (

							<CourseData key={course.id} course={course}
									    showAction={this.state.showAction === course.id}
									    showActionFor={this.showActionFor}
										navigateTo={this.navigateTo}
										delete={() => this.delete(course, index)}
										edit={() => this.edit(course) }
							/>

						))}
					</tbody>
				</table>
			);

		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Courses" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNewCourse} onClick={() => this.navigateTo('/course/create')}> ADD COURSE </div>
					</div>

					<div>
						{ courses }
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		courses: state.coursesReducer.courses,
		get_course_status: state.coursesReducer.get_course_status,
		delete_course_status: state.coursesReducer.delete_course_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_courses: () => dispatch( get_courses() ),
		delete: payload => dispatch( deleteCourse(payload) ),
		resetStoreCourseStatus: () => dispatch(reset_store_course_status()) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseIndex);