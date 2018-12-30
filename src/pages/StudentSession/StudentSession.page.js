import React from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './StudentSession.page.module.css';
import QuickContact from '../../components/QuickContact';
import { PayWithTeller } from '../../components/Modal/index';
import { openModal } from '../../components/Modal/Modal.action';

class StudentSession extends React.Component {

	//1 = unpaid
	//2 = paid, not confirmed
	//3 = paid confirmed

	state = {
		session: null,
		studentType: 1
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	setSessionFrom = props => {
		const session = props.sessions.find(session => {
			return session.id == props.match.params.sessionSlug;
		});

		this.setState({
			session: session
		});
		
		const studentPaid = session.sessionStudents.find(sessionStudent => {
			return sessionStudent.student_id === this.props.user.id;
		});

		if (typeof (studentPaid) == 'object') {			
			
			if (studentPaid.status == 1) {
				return this.setState({
					studentType: 3
				});
			}
		
			return this.setState({
				studentType: 2
			});
		}
	}

	componentDidMount() {
		this.setSessionFrom(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.transaction_status === 200) {

			swal({
				type: 'success',
				title: `Payment transaction was created successfully, admin will contact you shortly`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.history.push('/student-dashboard');
				}
			});

			return this.setState({
				studentType: 2
			});
		}
	}

	navigateWith = session => {
		console.dir(session);
	}

	payWithTellerHandler = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

		this.props.openModal(PayWithTeller, {
			sessionId: this.state.session.id
		});
	}

	rateCourseHandler = () => {
		console.dir('rate course facilitator handler');
	}

	render() {

		let sessions = <Spinner message="Loading sessions" />

		let actionButton, showRateHeader, showRateAction;

		if (this.state.studentType == 1) {
			actionButton = (
				<div className={styles.enrollButtons}>
					<a className={styles.enrollButton} onClick={this.payWithTellerHandler}> Pay With Teller </a>
					<a className={[styles.enrollButton, styles.buttonOutline].join(' ')}> Pay Online </a>
				</div>
			)
		}

		if (this.state.studentType == 2) {
			actionButton = (
				<div className={styles.enrollButtons}>
					<a className={styles.enrollButton}> Show Course Number  </a>
				</div>
			)
		}


		if (this.state.studentType === 3) {
			showRateHeader = (
				<th>Rate Course</th>
			);
			showRateAction = (
				<td>
					<div className={styles.enrollButtons}>
						<a className={[styles.enrollButton, styles.buttonOutline].join(' ')} onClick={this.rateCourseHandler}> Rate Facilitator Course </a>
					</div>
				</td>
			)
		}

		if (this.state.session != null) {
			sessions = (
				<div className={styles.dashboard}>					
					<div className={styles.courseDescription}>
						<div className={styles.courseTitle}>{this.state.session.course.name}</div>
						<div className={styles.courseTheme}>
							{this.state.session.theme}
						</div>

						<div className={styles.coursePrice}>
							&#8358; {this.state.session.fee}
						</div>


						{ actionButton }


						<div className={styles.durations}>
							<div className={styles.duration}>
								<div className={styles.durationHeader}>Registration Period</div>
								<div className={styles.date}>
									{moment(this.state.session.registration_start_date).format('MMMM Do')} - {moment(this.state.session.registration_end_date).format('MMMM Do YYYY')}
								</div>
							</div>

							<div className={styles.duration}>
								<div className={styles.durationHeader}>Course Duration</div>
								<div className={styles.date}>
									{moment(this.state.session.start_date).format('MMMM Do')} - {moment(this.state.session.end_date).format('MMMM Do YYYY')}
								</div>
							</div>
						</div>
					</div>

					<div className={styles.courseOutlines}>
						<div className={styles.outlineHeader}>
							Course Outlines
						</div>

						<div className={styles.outlineBody}>

							<table className={styles.table}>
								<thead>
									<tr>
										<th>S/N</th>
										<th>Outline</th>
										<th>Facilitator</th>
										<th>Lecture Date</th>
										{showRateHeader}
									</tr>
								</thead>
								<tbody>
									
									{this.state.session.facilitatorSessionOutlines.map(facilitatorSessionOutline => (
										<tr key={facilitatorSessionOutline.id}>
											<td>1</td>
											<td>{facilitatorSessionOutline.outline.name}</td>
											<td>{facilitatorSessionOutline.facilitator.profile.firstname} {facilitatorSessionOutline.facilitator.profile.lastname}</td>
											<td>{moment(facilitatorSessionOutline.date).format('MMMM Do YYYY')}</td>
											{showRateAction}
										</tr>
									))}


								</tbody>
							</table>

						</div>
					</div>
				</div>
			)
		}

		// if (this.props.get_active_and_future_session_status === 200 && this.props.sessions.length) {

		// 	sessions = this.props.sessions.map(session => (
		// 		<Course session={session} key={session.id} course={session.course} user={this.props.user} navigateWith={this.navigateWith} />
		// 	))

		// }


		return (
			<div>
				<div>
					<Header />
				</div>

				<div>
					<QuickContact />
				</div>



				{ sessions }


			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.authReducer.user,
		sessions: state.studentDashboardReducer.sessions,
		transaction: state.payWithTellerReducer.transaction,
		transaction_status: state.payWithTellerReducer.status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSession);