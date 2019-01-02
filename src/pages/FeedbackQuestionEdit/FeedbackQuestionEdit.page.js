import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';

import styles from './FeedbackQuestionEdit.page.module.css';
import FeedbackQuestionForm from '../../components/Forms/FeedbackQuestionForm';
import { get_question, get_questions, store_question, reset_store_question_status, update_question } from '../../shared/store/FeedbackQuestion/FeedbackQuestion.action.js';

class FeedbackQuestionEdit extends React.Component {

	state = {
		submittingForm: false,
		question: null,
	};

	handleSubmit = formData => {
		formData['feedback_question_id'] = this.props.question.id;

		this.setState({
			submittingForm: true
		});

		this.props.update_question(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = nextProps => {
		if (nextProps.update_question_status === 200) {
			swal({
				type: 'success',
				title: `Question was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreQuestionStatus();
					this.props.history.push('/feedback-question/index');
				}
			});
		}
	}

	setInitialQuestionFrom = nextProps => {
		this.setState({
			question: {
				question: nextProps.question.question,
				type: nextProps.question.type
			}
		});
	}

	componentDidMount() {
		this.props.get_question(this.props.match.params.feedbackQuestionSlug);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialQuestionFrom(nextProps);
	}

	render() {
		
		let questionFormContainer = <Spinner />

		if (this.state.question !== null) {
			questionFormContainer = (
				<div>
					<FeedbackQuestionForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								 initialValues={this.state.question}
								 question={this.props.question}
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
					<Breadcrumb name="Create New Question" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/feedback-question/index')}> ALL QUESTIONS </div>
					</div>
					{ questionFormContainer }
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		question: state.feedbackQuestionReducer.question,
		store_question_message: state.feedbackQuestionReducer.store_question_message,
		update_question_status: state.feedbackQuestionReducer.update_question_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_question: questionId => dispatch( get_question(questionId) ),
		update_question: payload => dispatch( update_question(payload) ),
		resetStoreQuestionStatus: () => dispatch( reset_store_question_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackQuestionEdit);