import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './StudentEdit.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import UserManagementMenu from '../../components/UserManagementMenu';
import StudentEditForm from '../../components/Forms/StudentEditForm';
import { get_user, update_student, reset } from './StudentEdit.page.action.js';

class StudentEdit extends React.Component {

	state = {
		student: null,
		submittingForm: false,
	};

	handleSubmit = formData => {
		formData['student_id'] = this.props.student.id;

		this.setState({
			submittingForm: true
		});

		this.props.update_student(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = async nextProps => {
		if (nextProps.update_student_status === 200) {
			let alert = swal({
				type: 'success',
				title: `Student was updated successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.reset();
				this.props.history.push('/student/index');
			}
		}
	}


	setInitialStudentFrom = nextProps => {
		this.setState({
			student: {
				email: nextProps.student.email,
				is_banned: nextProps.student.is_banned,
				matric_number: nextProps.student.matric_number,
				email_confirmed: nextProps.student.email_confirmed
			}
		});
	}

	componentDidMount() {
		this.props.get_user(this.props.match.params.studentId);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialStudentFrom(nextProps);
	}

	render() {
		let studentFormContainer = <Spinner />

		if (this.state.student !== null) {
			studentFormContainer = (
				<div>
					<StudentEditForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								initialValues={this.state.student}
								student={this.props.student}
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
					<Breadcrumb name="Edit Student" />
				</React.Fragment>

				<div className={styles.container}>	

					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/student/index')}> ALL STUDENTS </div>
						</div>
						{studentFormContainer}
					</div>
					
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		student: state.studentEditReducer.student,
		get_user_status: state.studentEditReducer.get_user_status,
		update_student_status: state.studentEditReducer.update_student_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		reset: () => dispatch(reset()),
		get_user: payload => dispatch( get_user(payload) ),
		update_student: payload => dispatch( update_student(payload) ),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);