import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import PortalMenu from '../../components/PortalMenu';
import styles from './SessionFeedback.page.module.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { get_feedbacks } from '../FeedbackGeneralIndex/FeedbackGeneralIndex.page.action';

class SessionFeedback extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_feedbacks({
			feedback_type: 1,
			session_id: this.props.match.params.sessionSlug
		});
	}

	render() {
		let feedbacks = <Spinner message="Loading feedback" />
		
		if (this.props.get_feedback_status === 200 && !this.props.feedbacks.length) {
			feedbacks = <EmptyState message="No feedback in database yet" />
		}

		if (this.props.get_feedback_status === 200 && this.props.feedbacks.length) {

			feedbacks = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Question</th>
							<th>Rate</th>
							<th>Comment</th>
							<th>Outline</th>
							<th>Name</th>
							<th>Matric.No</th>
						</tr>
					</thead>
					<tbody>
						{this.props.feedbacks.map(feedback => (

							<tr key={feedback.id}>
								<td>{feedback.id}</td>
								<td>{feedback.feedback_question.question}</td>
								<td>{feedback.rate}</td>
								<td>{feedback.comment}</td>
								<td>{feedback.facilitatorSessionOutline.outline.name}</td>
								<td>{feedback.student.firstname} {feedback.student.lastname}</td>
								<td>{feedback.student.matric_number}</td>
							</tr>

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
					<Breadcrumb name="General Feedbacks" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.contentContainer}>
						<div className={styles.sideMenu}>
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

							{feedbacks}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		feedbacks: state.feedbackGeneralIndexReducer.feedbacks,
		get_feedback_status: state.feedbackGeneralIndexReducer.get_feedback_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_feedbacks: payload => dispatch( get_feedbacks(payload) ),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionFeedback);