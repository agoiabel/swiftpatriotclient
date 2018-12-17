import React from 'react';
import moment from 'moment';
import styles from './CourseCard.component.module.css';

class CourseCard extends React.Component {



	componentDidMount() {
		// this.setActionButtonStatusFor(this.props.session, this.props.user);
	}


	setActionButtonStatusFor = (session, student) => {

		const today = new Date();
		const studentId = student.id;
		const sessionStatus = session.status;
		const sessionStudents = session.sessionStudents;
		const endDate = new Date(session.registration_end_date);
		const startDate = new Date(session.registration_start_date);

		//active
		if (sessionStatus == 2) {
			if (sessionStudents.length) {
				const studentPaid = sessionStudents.find(sessionStudent => {
					return sessionStudent.student_id == studentId;
				});

				if (studentPaid) {
					return console.dir('Can show View Course');
				}
				if (today > startDate && today < endDate) {
					return console.dir('Can show register');
				}
				if (today > endDate) {
					return console.dir('Do not show anything');
				}
			}

			if ((today > startDate) && (today < endDate)) {
				return console.dir('Can show register');
			}
			if (today > endDate) {
				return console.dir('Do not show anything');
			}
		}

		// console.dir(session);
	}

	render() {

		let actionButton = (
			<div>
				VIEW
			</div>
		)



		return (
			<div className={styles.course}>
				<div className={styles.header}>
					<div className={styles.duration}>
						<div className={styles.headerTitle}>Duration</div>
						<div className={styles.headerContent}>{this.props.course.duration} days</div>
					</div>
					<div className={styles.fees}>
						<div className={styles.headerTitle}>Fees</div>
						<div className={styles.headerContent}>&#8358;{this.props.session.fee}</div>
					</div>
				</div>
				<div className={styles.body}>

					<div className={styles.name}>
						<div className={styles.bodyTitle}>Name</div>
						<div className={styles.courseName}>{this.props.session.name}</div>
					</div>

					<div className={styles.theme}>
						<div className={styles.themeTitle}>Theme</div>
						<div className={styles.themeName}>
							{ this.props.session.theme }
						</div>
					</div>

					<div className={styles.body_footer}>
						<div className={styles.registrationDuration}>
							<div className={styles.bodyTitle}>Registration</div>
							<div className={styles.courseDuration}>
								{moment(this.props.session.start_date).format('MMMM Do')} - {moment(this.props.session.end_date).format('MMMM Do')}
							</div>
						</div>

						<div className={styles.joinButton}>
							{ actionButton }
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default CourseCard;