import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import FeedbackMenu from '../../components/FeedbackMenu';

import styles from './FeedbackQuestionCreate.page.module.css';
import FeedbackQuestionForm from '../../components/Forms/FeedbackQuestionForm';
import { store_question, reset_store_question_status } from '../../shared/store/FeedbackQuestion/FeedbackQuestion.action.js';

class FeedbackQuestionCreate extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		this.props.store_question(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = nextProps => {
		if (nextProps.store_question_status === 200) {
			swal({
				type: 'success',
				title: `Question was created successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreQuestionStatus();
					this.props.history.push('/feedback-question/index');
				}
			});
		}
	}

	componentDidMount() {}

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
					<Breadcrumb name="Create New Question" />
				</React.Fragment>

				<div className={styles.container}>	

					<div className={styles.contentContainer}>
						<div className={styles.sideMenu}>
							<FeedbackMenu />
						</div>
						<div className={styles.content}>
							<div className={styles.header}>
								<div className={styles.addNew} onClick={() => this.navigateTo('/feedback-question/index')}> ALL FEEDBACK QUESTION </div>
							</div>

							<FeedbackQuestionForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} submitText="CREATE" />
						</div>
					</div>
					
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		store_question_message: state.feedbackQuestionReducer.message,
		store_question_status: state.feedbackQuestionReducer.store_question_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		store_question: payload => dispatch( store_question(payload) ),
		resetStoreQuestionStatus: () => dispatch( reset_store_question_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackQuestionCreate);