import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './SessionDashboard.page.module.css';
import { get_session } from './SessionDashboard.page.action';

class SessionDashboard extends React.Component {

	componentDidMount() {
		this.props.get_session(this.props.match.params.sessionSlug);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	componentWillReceiveProps(nextProps) {}


	navigateToTransaction = status => {
		this.navigateTo(`/transaction/${status}/${this.props.match.params.sessionSlug}`);
	}


	render() {

		let session = <Spinner />

		if (this.props.status === 200) {

			const unverifiedTransaction = this.props.session.transactions.filter(transaction => transaction.status === 0).length;
			const successfulTransaction = this.props.session.transactions.filter(transaction => transaction.status === 1).length;
			const unSuccessfulTransaction = this.props.session.transactions.filter(transaction => transaction.status === 2).length;

			session = (
				<div className={styles.content}>
					<div className={styles.header}>
						<div className={styles.sessionInfo}>
							<span className={styles.courseName}>{this.props.session.course.name}</span>
							<span>{moment(this.props.session.start_date).format('MMMM Do YYYY')} - {moment(this.props.session.end_date).format('MMMM Do YYYY')}</span>
						</div>
						<div className={styles.addNew} onClick={() => this.navigateTo('/session/index')}>
							ALL SESSIONS
						</div>
					</div>

					<div className={styles.sessionContainer}>
						<div className={styles.containerHeader}></div>
						<div className={styles.stats}>
							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-briefcase" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Students</div>
								<div className={styles.statNumber}>{this.props.session.sessionStudents.length}</div>
							</div>

							<div className={styles.stat} onClick={() => this.navigateTo(`/facilitator-outline/index/${this.props.match.params.sessionSlug}`)}>
								<div className={styles.statIcon}><i className="fa fa-hourglass-half" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Outline Assigned</div>
								<div className={styles.statNumber}>{this.props.session.facilitatorSessionOutlines.length}</div>
							</div>

							<div className={styles.stat} onClick={() => this.navigateToTransaction('successful')}>
								<div className={styles.statIcon}><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Successful Payment</div>
								<div className={styles.statNumber}>{successfulTransaction}</div>
							</div>

							<div className={styles.stat} onClick={() => this.navigateToTransaction('pending')}>
								<div className={styles.statIcon}><i className="fa fa-window-close-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Pending Payment</div>
								<div className={styles.statNumber}>{unverifiedTransaction}</div>
							</div>

							<div className={styles.stat} onClick={() => this.navigateToTransaction('failed')}>
								<div className={styles.statIcon}><i className="fa fa-window-close-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Failed Payment</div>
								<div className={styles.statNumber}>{unSuccessfulTransaction}</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Feedbacks</div>
								<div className={styles.statNumber}>45</div>
							</div>
						</div>
					</div>
					</div>
			)
		}


		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Session Adminstration" />
				</React.Fragment>


				<div className={styles.container}>	
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>
					{session}
				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		status: state.sessionDashboardReducer.status,
		session: state.sessionDashboardReducer.session,
		message: state.sessionDashboardReducer.message,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_session: payload => dispatch( get_session(payload) )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDashboard);