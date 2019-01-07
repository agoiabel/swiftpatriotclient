import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import FeedbackMenu from '../../components/FeedbackMenu';
import styles from './FeedbackGeneralIndex.page.module.css';
import { get_feedbacks } from './FeedbackGeneralIndex.page.action';

class FeedbackGeneralIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_feedbacks();
	}

	render() {
		let feedbacks = <Spinner message="Loading feedback" />
		
		if (this.props.get_feedback_status === 200 && !this.props.feedbacks.length) {
			feedbacks = <EmptyState message="No feedback in database yet" />
		}

		if (this.props.get_feedback_status === 200 && this.props.feedbacks.length) {

			feedbacks = (
				<div className={styles.content}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>S/N</th>
								<th>Comment</th>
								<th>Name</th>
								<th>Matric.No</th>
							</tr>
						</thead>
						<tbody>
							{this.props.feedbacks.map(feedback => (

								<tr key={feedback.id}>
									<td>{feedback.id}</td>
									<td>{feedback.comment}</td>
									<td>{feedback.student.firstname} {feedback.student.lastname}</td>
									<td>#1-{feedback.student.matric_number}</td>
								</tr>

							))}
						</tbody>
					</table>
				</div>
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
							<FeedbackMenu />
						</div>

						{ feedbacks }
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
		get_feedbacks: () => dispatch( get_feedbacks() ),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackGeneralIndex);