import React from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './SessionEdit.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import SessionForm from '../../components/Forms/SessionForm';
import { get_courses } from '../../shared/store/Course/Course.action.js';
import { get_session, store_session, reset_store_session_status, update_session } from '../../shared/store/Session/Session.action.js';

class SessionEdit extends React.Component {

	state = {
		submittingForm: false,
		session: null,
	};

	handleSubmit = formData => {
		formData['session_id'] = this.props.session.id;

		this.setState({
			submittingForm: true
		});

		this.props.update_session(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = nextProps => {
		if (nextProps.update_session_status === 200) {
			swal({
				type: 'success',
				title: `Session was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreSessionStatus();
					this.props.history.push('/session/index');
				}
			});
		}
	}

	redirectIfNotCourses = () => {
		this.props.get_courses();
		if (!this.props.courses.length) {
			this.navigateTo('/session/index');
		}
	}

	setInitialSessionFrom = nextProps => {
		this.setState({
			session: {
				theme: nextProps.session.theme,

				fee: parseInt(nextProps.session.fee),
				course_id: nextProps.session.course.id,

				end_date: moment(nextProps.session.end_date).format('YYYY-MM-DD'),
				start_date: moment(nextProps.session.start_date).format('YYYY-MM-DD'),

				registration_end_date: moment(nextProps.session.registration_end_date).format('YYYY-MM-DD'),
				registration_start_date: moment(nextProps.session.registration_start_date).format('YYYY-MM-DD')
			}
		});
	}

	componentDidMount() {
		this.redirectIfNotCourses();
		this.props.get_session(this.props.match.params.sessionSlug);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialSessionFrom(nextProps);
	}

	render() {
		let sessionFormContainer = <Spinner />

		if (this.state.session !== null) {
			sessionFormContainer = (
				<div>
					<SessionForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								courses={this.props.courses} 
								initialValues={this.state.session}
								session={this.props.session}
								submitText="UPDATE"
					/>
				</div>
			);
		}

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
						<div className={styles.addNew} onClick={() => this.navigateTo('/session/index')}> ALL SESSIONS </div>
					</div>
					{ sessionFormContainer }
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		session: state.sessionsReducer.session,
		courses: state.coursesReducer.courses,
		store_session_message: state.sessionsReducer.store_session_message,
		update_session_status: state.sessionsReducer.update_session_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_courses: () => dispatch( get_courses() ),
		get_session: sessionId => dispatch( get_session(sessionId) ),
		update_session: payload => dispatch( update_session(payload) ),
		resetStoreSessionStatus: () => dispatch( reset_store_session_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionEdit);