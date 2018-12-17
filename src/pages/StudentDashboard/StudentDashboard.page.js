import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Course from '../../components/CourseCard';
import EmptyState from '../../components/EmptyState';
import styles from './StudentDashboard.page.module.css';
import QuickContact from '../../components/QuickContact';

import { get_active_and_future_session } from './StudentDashboard.page.action';

class StudentDashboard extends React.Component {

	navigateTo = page => {
		this.props.history.push(page);
	}

	componentDidMount() {
		this.props.get_active_and_future_session();
	}



	render() {

		let sessions = <Spinner message="Loading sessions" />

		if (this.props.get_active_and_future_session_status === 200 && !this.props.sessions.length) {
			sessions = <EmptyState message="No Course in database" />
		}

		if (this.props.get_active_and_future_session_status === 200 && this.props.sessions.length) {

			sessions = this.props.sessions.map(session => (
				<Course session={session} key={session.id} course={session.course} user={this.props.user} />
			))

		}


		return (
			<div>
				<div>
					<Header />
				</div>

				<div>
					<QuickContact />
				</div>

				<div className={styles.dashboard}>
					<div className={styles.content}>
						<div className={styles.courses}>
							
							{ sessions }

						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.authReducer.user,
		sessions: state.studentDashboardReducer.sessions,
		get_active_and_future_session_status: state.studentDashboardReducer.get_active_and_future_session_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_active_and_future_session: () => dispatch( get_active_and_future_session() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);