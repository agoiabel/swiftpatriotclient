import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import SessionData from './SessionData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import styles from './SessionIndex.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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

	delete = async session => {
		let alert = await swal({
			title: `Are you sure you want to delete [${session.course.name}]`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		});

		if (alert) {
			this.props.delete({
				sessionId: session.id
			});
		}
	}

	edit = session => {
		return this.navigateTo(`/session/edit/${session.id}`);
	} 

	activate = async session => {
		let alert = await swal({
			title: `Are you sure you set ${session.name} as active?`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		});

		if (alert) {
			this.props.activate({
				sessionId: session.id,
			});
		}
	}

	showNotificationFrom = async nextProps => {
		if (nextProps.delete_session_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Session was deleted successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreSessionStatus();
			}
		}
		if (nextProps.activate_session_status === 200) {
			let alert = swal({
				type: 'success',
				title: `Session was activated successfully`,
				allowOutsideClick: false
			});
			if (alert) {
				this.props.resetStoreSessionStatus();
			}
		}
		if (nextProps.activate_session_status === 422) {
			let alert = await swal({
				type: 'error',
				title: `Error activating session`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreSessionStatus();
			}
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
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
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
						{this.props.sessions.map(session => (

							<SessionData 
								key={session.id} 
								session={session}
								navigateTo={this.navigateTo}
								edit={() => this.edit(session)}
								showActionFor={this.showActionFor}
								delete={() => this.delete(session)}
								activate={() => this.activate(session)}
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
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/session/create')}> ADD SESSION </div>
							<ReactHTMLTableToExcel
								id="test-table-xls-button"
								className={styles.addNew}
								table="table-to-xls"
								filename="tablexls"
								sheet="tablexls"
								buttonText="EXPORT"
							/>
						</div>

						<div>
							{sessions}
						</div>
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