import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import SessionData from './SessionData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './SessionIndex.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import { get_sessions, deleteSession, reset_store_session_status, activate } from '../../shared/store/Session/Session.action.js';

class SessionIndex extends React.Component {

	state = {}
	//make sure session activation shows real time

	componentDidMount() {
		this.props.get_sessions();
	}

	showActionFor = session => {
		this.setState({ showAction: this.state.showAction === session.id ? null : session.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = (session, index) => {
		swal({
			title: `Are you sure you want to delete ${session.name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		}).then((result) => {
			if (result.value) {
				this.props.delete({
					sessionId: session.id,
					arrayKey: index
				});
			}
		});
	}


	edit = session => {
		return this.navigateTo(`/session/edit/${session.id}`);
	} 

	activate = session => {
		swal({
			title: `Are you sure you set ${session.name} as active?`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		}).then(result => {

			if (result.value) {
				this.props.activate({
					sessionId: session.id,
				});
			}
		});
	}

	showNotificationFrom = nextProps => {
		if (nextProps.delete_session_status === 200) {
			swal({
				type: 'success',
				title: `Session was deleted successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreSessionStatus();
				}
			});
		}

		if (nextProps.activate_session_status === 200) {
			swal({
				type: 'success',
				title: `Session was activated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreSessionStatus();
				}
			});
		}
		if (nextProps.activate_session_status === 422) {
			swal({
				type: 'error',
				title: `Error activating session`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreSessionStatus();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let sessions = <Spinner message="Loading Sessions" />
		
		if (this.props.get_session_status === 200 && !this.props.sessions.length) {
			sessions = <EmptyState message="No session in database" />;
		}

		if (this.props.get_session_status === 200 && this.props.sessions.length) {
			sessions = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Session Name</th>
							<th>Session Course</th>
							<th>Session Status</th>
							<th>Session Start Date</th>
							<th>Session End Date</th>
							<th>Registration Start Date</th>
							<th>Registration End Date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.sessions.map((session, index) => (

							<SessionData 
								key={session.id} 
								session={session}
								navigateTo={this.navigateTo}
								edit={() => this.edit(session)}
								showActionFor={this.showActionFor}
								activate={() => this.activate(session)}
								delete={() => this.delete(session, index)}
								showAction={this.state.showAction === session.id}
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
					<Breadcrumb name="Sessions" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/session/create')}> ADD SESSION </div>
					</div>

					<div>
						{ sessions }
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		sessions: state.sessionsReducer.sessions,
		get_session_status: state.sessionsReducer.get_session_status,
		delete_session_status: state.sessionsReducer.delete_session_status,
		activate_session_status: state.sessionsReducer.activate_session_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_sessions: () => dispatch(get_sessions()),
		activate: payload => dispatch(activate(payload)),
		delete: payload => dispatch(deleteSession(payload)),
		resetStoreSessionStatus: () => dispatch(reset_store_session_status()) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionIndex);