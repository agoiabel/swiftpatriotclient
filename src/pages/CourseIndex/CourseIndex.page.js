import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import CourseData from './CourseData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './CourseIndex.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import PortalMenu from '../../components/PortalMenu';
import { get_courses, deleteCourse, reset_store_course_status } from '../../shared/store/Course/Course.action.js';
import EmptyState from '../../components/EmptyState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

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

	delete = async course => {
		let alert = await swal({
			title: `Are you sure you want to delete [${course.name}]`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		});
		
		if (alert) {
			this.props.delete({
				courseId: course.id,
			});		
		}
	}

	edit = course => {
		return this.navigateTo(`/course/edit/${course.id}`);
	} 


	showNotificationFrom = async nextProps => {
		if (nextProps.delete_course_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Course was deleted successfully`,
				allowOutsideClick: false
			});
			
			if (alert) {
				this.props.resetStoreCourseStatus();
			}		
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
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Course Name</th>
							<th>Course Duration</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>

						{this.props.courses.map(course => (

							<CourseData key={course.id} course={course}
									    showAction={this.state.showAction === course.id}
									    showActionFor={this.showActionFor}
										navigateTo={this.navigateTo}
										delete={() => this.delete(course)}
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
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNewCourse} onClick={() => this.navigateTo('/course/create')}> ADD COURSE </div>
							<ReactHTMLTableToExcel
								id="test-table-xls-button"
								className={styles.addNewCourse}
								table="table-to-xls"
								filename="tablexls"
								sheet="tablexls"
								buttonText="EXPORT"
							/>
						</div>

						<div>
							{courses}
						</div>
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