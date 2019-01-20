import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import SessionOutline from './SessionOutline';
import Spinner from '../../components/Spinner';
import styles from './StudentSession.page.module.css';
import QuickContact from '../../components/QuickContact';
import { PayWithTeller } from '../../components/Modal/index';
import { openModal } from '../../components/Modal/Modal.action';
import { reset_transaction_status } from '../../components/Modal/PayWithTeller/PayWithTeller.component.action';
import { get_session_with, get_session_number, confirm_payment_for, reset_online_payment_transaction, initial_payment_for } from './StudentSession.page.action';

class StudentSession extends React.Component {

	//1 = unpaid
	//2 = paid, not confirmed
	//3 = paid confirmed
	//4 = differed

	state = {
		session: null,
		studentType: 1,
		// transaction: null,
		showLoading: false
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	setSessionFrom = props => {
		if (props.get_session_status === 200) {

			const session = props.session;
			// const transaction = props.userTransaction;

			this.setState({
				session: session,
				// transaction: transaction
			});

			const studentPaid = session.sessionStudents.find(sessionStudent => {
				return sessionStudent.student_id === this.props.user.id;
			});

			if (typeof (studentPaid) == 'object') {

				if (studentPaid.status == 2) {
					return this.setState({
						studentType: 3
					});
				}

				if (studentPaid.status == 3) {
					return this.setState({
						studentType: 4
					});
				}

				return this.setState({
					studentType: 2
				});
			}
		}
	}

	setPaymentNotification = async () => {
		let alert = await swal({
			type: 'success',
			title: `Payment transaction was created successfully, admin will contact you shortly`,
			allowOutsideClick: false
		});

		if (alert) {
			this.props.reset_transaction_status();
			this.props.history.push('/student-dashboard');
		}

		return this.setState({
			studentType: 2
		});
	}

	componentDidMount() {
		this.props.get_session_with(this.props.match.params.sessionSlug);
	}

	showOnlinePaymentTransaction = async nextProps => {

		//transaction was successful
		if (nextProps.userTransaction.status == 1) {
			let alert = await swal({
				type: 'success',
				title: `Payment transaction was successfully`,
				allowOutsideClick: false
			});

			this.setState({
				studentType: 3
			});

			if (alert) {
				this.props.reset_online_payment_transaction();
			}
		}

		//transaction was unsuccessful
		if (nextProps.userTransaction.status == 2) {
			let alert = await swal({
				type: 'error',
				title: `Payment transaction was unsuccessfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.reset_online_payment_transaction();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.get_session_status === 200) {
			this.setSessionFrom(nextProps);
		}

		if (nextProps.transaction_status === 200) {
			this.setPaymentNotification();
		}

		if (nextProps.get_session_number_status === 200) {
			this.setState({
				showLoading: false
			})
		}

		if (nextProps.online_payment_transaction_status === 200) {
			this.showOnlinePaymentTransaction(nextProps);
		}
	}

	navigateWith = session => {
		// console.dir(session);
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

	showSessionNumber = () => {
		this.setState({
			showLoading: true
		});
		this.props.get_session_number({
			session_id: this.state.session.id
		});
	}

	handlePaymentCallback = response => {
		console.dir('before handle');
		this.props.confirm_payment_for({
			reference_number: response.reference
		});
		console.dir('after handle');
	}

	payOnline = async () => {
		this.props.initial_payment_for({
			session_id: this.props.match.params.sessionSlug
		});
	}

	render() {

		let sessionNumber = (
			<a className={styles.enrollButton} onClick={this.showSessionNumber}> Show Tag Number </a>
		);

		let sessions = <Spinner message="Loading sessions" />
		let actionButton;

		if (this.state.showLoading) {
			sessionNumber = <Spinner />
		}
		if (this.props.get_session_number_status === 200) {
			sessionNumber = (
				<div className={styles.enrollButtons}>
					<a className={styles.enrollButton}> Tag No {this.props.session_student.session_number} </a>
				</div>
			);
		}

		if (this.state.studentType == 1 && this.props.done_all_prerequisite) {
			actionButton = (
				<div className={styles.enrollButtons}>
					<a className={styles.enrollButton} onClick={this.payWithTellerHandler}> Already Paid To Bank </a>
					<button className={[styles.enrollButton, styles.buttonOutline].join(' ')} onClick={this.payOnline}> Pay Online </button>
				</div>
			)
		}

		if (this.state.studentType == 2) {
			actionButton = (
				<div className={styles.enrollButtons}>
					<div>{ sessionNumber }</div>  
				</div>
			)
		}

		if (this.state.studentType == 3) {
			actionButton = (
				<div>
					<div className={styles.enrollButtons}>
						<a className={styles.enrollButton}>Matric No - {this.props.user.matric_number}</a>
					</div>

					<div>
						{sessionNumber}
					</div>
				</div>
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
								<div className={styles.durationHeader}>Training Period</div>
								<div className={styles.date}>
									{moment(this.state.session.start_date).format('MMMM Do')} - {moment(this.state.session.end_date).format('MMMM Do YYYY')}
								</div>
							</div>
						</div>
					</div>

					<SessionOutline studentType={this.state.studentType} session={this.state.session} navigateTo={this.navigateTo} />
				</div>
			)
		}


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

		session: state.studentSessionReducer.session,
		userTransaction: state.studentSessionReducer.transaction,

		get_session_status: state.studentSessionReducer.get_session_status,
		done_all_prerequisite: state.studentSessionReducer.done_all_prerequisite,

		transaction: state.payWithTellerReducer.transaction,
		transaction_status: state.payWithTellerReducer.status,

		session_student: state.studentSessionReducer.session_student,
		get_session_number_status: state.studentSessionReducer.get_session_number_status,

		online_payment_transaction_status: state.studentSessionReducer.online_payment_transaction_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_session_with: payload => dispatch( get_session_with(payload) ),
		reset_transaction_status: () => dispatch( reset_transaction_status() ),
		get_session_number: payload => dispatch( get_session_number(payload) ),
		openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),

		confirm_payment_for: payload => dispatch( confirm_payment_for(payload) ),
		reset_online_payment_transaction: () => dispatch( reset_online_payment_transaction() ),

		initial_payment_for: payload => dispatch( initial_payment_for(payload) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSession);