import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './SessionCreate.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';

import SessionForm from '../../components/Forms/SessionForm';
import { get_courses } from '../../shared/store/Course/Course.action.js';
import { store_session, reset_store_session_status } from '../../shared/store/Session/Session.action.js';

class SessionCreate extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		// console.dir(formData);

		this.props.store_session(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = nextProps => {
		if (nextProps.store_session_status === 200) {
			swal({
				type: 'success',
				title: `session was created successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreSessionStatus();
					this.props.history.push('/session/index');
				}
			});
		}
	}

	componentDidMount() {
		this.props.get_courses();

		if (! this.props.courses.length) {
			swal({
				type: 'warning',
				title: `you need to create course first`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					return this.props.history.push('/course/index');
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Create New Session" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/session/index')}> ALL SESSION </div>
					</div>
					<div>
						<SessionForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} courses={this.props.courses} submitText='CREATE' />
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		courses: state.coursesReducer.courses,
		store_session_status: state.sessionsReducer.store_session_status,
		store_session_message: state.sessionsReducer.store_session_message,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_courses: () => dispatch( get_courses() ),
		store_session: payload => dispatch( store_session(payload) ),
		resetStoreSessionStatus: () => dispatch( reset_store_session_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionCreate);