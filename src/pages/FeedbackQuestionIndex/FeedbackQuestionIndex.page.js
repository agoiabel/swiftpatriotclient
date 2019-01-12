import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import FeedbackMenu from '../../components/FeedbackMenu';
import FeedbackQuestionData from './FeedbackQuestionData';
import styles from './FeedbackQuestionIndex.page.module.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { get_questions, deleteQuestion, reset_store_question_status } from '../../shared/store/FeedbackQuestion/FeedbackQuestion.action.js';

class FeedbackQuestionIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_questions();
	}

	showActionFor = question => {
		this.setState({ showAction: this.state.showAction === question.id ? null : question.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = question => {
		swal({
			title: `Are you sure you want to delete Question`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		}).then((result) => {
			if (result.value) {
				this.props.delete({
					feedbackQuestionId: question.id
				});
			}
		});
	}


	edit = question => {
		return this.navigateTo(`/feedback-question/edit/${question.id}`);
	} 


	showNotificationFrom = nextProps => {
		if (nextProps.delete_question_status === 200) {
			swal({
				type: 'success',
				title: `Question was deleted successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreQuestionStatus();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let questions = <Spinner message="Loading Questions" />
		
		if (this.props.get_question_status === 200 && !this.props.questions.length) {
			questions = <EmptyState message="No question in database yet" />
		}

		if (this.props.get_question_status === 200 && this.props.questions.length) {

			questions = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Question</th>
							<th>Type</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.questions.map((question, index) => (

							<FeedbackQuestionData key={question.id} question={question}
								showAction={this.state.showAction === question.id}
								showActionFor={this.showActionFor}
								navigateTo={this.navigateTo}
								delete={() => this.delete(question)}
								edit={() => this.edit(question)}
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
					<Breadcrumb name="Feedback Questions" />
				</React.Fragment>

				<div className={styles.container}>	

					<div className={styles.contentContainer}>
						<div className={styles.sideMenu}>
							<FeedbackMenu />
						</div>

						<div className={styles.content}>
							<div className={styles.header}>
								<div className={styles.addNew} onClick={() => this.navigateTo('/feedback-question/create')}> ADD QUESTION </div>
								<ReactHTMLTableToExcel
									id="test-table-xls-button"
									className={styles.addNew}
									table="table-to-xls"
									filename="tablexls"
									sheet="tablexls"
									buttonText="EXPORT"
								/>
							</div>

							{questions}
						</div>
					</div>
					
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		questions: state.feedbackQuestionReducer.questions,
		get_question_status: state.feedbackQuestionReducer.get_question_status,
		delete_question_status: state.feedbackQuestionReducer.delete_question_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_questions: () => dispatch( get_questions() ),
		delete: payload => dispatch( deleteQuestion(payload) ),
		resetStoreQuestionStatus: () => dispatch( reset_store_question_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackQuestionIndex);