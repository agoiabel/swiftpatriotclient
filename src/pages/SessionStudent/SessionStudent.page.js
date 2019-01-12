import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import SessionData from './SessionData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './SessionStudent.page.module.css';
import { get_session_students, reset } from './SessionStudent.page.action.js';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class SessionStudent extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_session_students(this.props.match.params.sessionSlug);
	}

	showActionFor = sessionStudent => {
		this.setState({ showAction: this.state.showAction === sessionStudent.id ? null : sessionStudent.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	deferAdmission = sessionStudent => {
		console.dir(sessionStudent);
		//show modal
		// swal({
		// 	title: `Are you sure you set ${session.name} as active?`,
		// 	type: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonColor: '#3085d6',
		// 	cancelButtonColor: '#d33',
		// 	confirmButtonText: 'Yes, Delete!'
		// }).then(result => {

		// 	if (result.value) {
		// 		this.props.activate({
		// 			sessionId: session.id,
		// 		});
		// 	}
		// });
	}

	showNotificationFrom = nextProps => {
		if (nextProps.delete_session_status === 200) {
			swal({
				type: 'success',
				title: `Session was deleted successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.reset();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let sessions = <Spinner message="Loading Students" />
		
		if (this.props.get_sessionStudent_status === 200 && !this.props.sessionStudents.length) {
			sessions = <EmptyState message="No student in session" />;
		}

		if (this.props.get_sessionStudent_status === 200 && this.props.sessionStudents.length) {
			sessions = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Name</th>
							<th>Matric Number</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.sessionStudents.map(sessionStudent => (

							<SessionData 
								key={sessionStudent.id} 
								navigateTo={this.navigateTo}
								sessionStudent={sessionStudent}
								showActionFor={this.showActionFor}
								deferAdmission={this.deferAdmission}
								showAction={this.state.showAction === sessionStudent.id}
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
					<Breadcrumb name="Session Students" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
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
		sessionStudents: state.sessionStudentReducer.sessionStudents,
		get_sessionStudent_status: state.sessionStudentReducer.get_sessionStudent_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_session_students: payload => dispatch(get_session_students(payload) ),
		reset: () => dispatch( reset() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionStudent);