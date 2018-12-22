import React from 'react';
import moment from 'moment';
import styles from './CourseCard.component.module.css';

class CourseCard extends React.Component {

	state = {
		action: null
		//1 = can_register
		//2 = view
		//3 = show nothing
	}

	componentDidMount() {
		this.setActionButtonStatusFor(this.props.session, this.props.user);
	}


	setActionButtonStatusFor = (session, student) => {

		const today = new Date();
		const studentId = student.id;
		const sessionStudents = session.sessionStudents;
		const RegistrationEndDate = new Date(session.registration_end_date);
		const RegistrationStartDate = new Date(session.registration_start_date);

		const studentPaid = sessionStudents.find(sessionStudent => {
			return sessionStudent.student_id == studentId;
		});

		if (studentPaid != undefined) {
			return this.setState({
				action: 2
			});
		}

		if ((today > RegistrationStartDate) && (today < RegistrationEndDate)) {
			return this.setState({
				action: 1
			});
		}

	}

	
	navigateWith = () => {
		this.props.navigateWith(this.props.session);
	}


	render() {

		let actionButton;

		if (this.state.action == 1) {
			actionButton = (
				<div className={styles.joinButton} onClick={this.navigateWith}>
					JOIN
                </div>
			)
		}
		if (this.state.action == 2) {
			actionButton = (
				<div className={styles.joinButton} onClick={this.navigateWith}>
					VIEW
                </div>
			)
		}


		return (
			<div className={styles.course}>
				<div className={styles.header}>
					<div className={styles.duration}>
						<div className={styles.headerTitle}>Duration</div>
						<div className={styles.headerContent}>
							{moment(this.props.session.start_date).format('MMMM Do')} - {moment(this.props.session.end_date).format('MMMM Do YYYY')}
						</div>
					</div>
					<div className={styles.fees}>
						<div className={styles.headerTitle}>Fees</div>
						<div className={styles.headerContent}>&#8358;{this.props.session.fee}</div>
					</div>
				</div>

				<div className={styles.body}>

					<div className={styles.name}>
						<div className={styles.bodyTitle}>Name</div>
						<div className={styles.courseName}>{this.props.session.course.name}</div>
					</div>

					<div className={styles.theme}>
						<div className={styles.themeTitle}>Theme</div>
						<div className={styles.themeName}>
							{this.props.session.theme}
						</div>
					</div>

					<div className={styles.body_footer}>
						<div className={styles.registrationDuration}>
							<div className={styles.bodyTitle}>Registration</div>
							<div className={styles.courseDuration}>
								{moment(this.props.session.registration_start_date).format('MMMM Do')} - {moment(this.props.session.registration_end_date).format('MMMM Do YYYY')}
							</div>
						</div>

						{actionButton}
					</div>
				</div>

			</div>
		);
	}

}

export default CourseCard;