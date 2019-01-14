import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import QuickContact from '../../components/QuickContact';
import styles from './FeedbackGeneralCreate.page.module.css';
import { get_general_questions } from './FeedbackGeneralCreate.page.action';
import FacilitatorOutlineAddFeedbackForm from '../../components/Forms/FacilitatorOutlineAddFeedbackForm';
import { store_feedback, reset_store_feedback } from '../FacilitatorOutlineAddFeedback/FacilitatorOutlineAddFeedback.page.action';

class FeedbackGeneralCreate extends React.Component {
    
    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        let questionsAndAnswers = [];
        Object.keys(formData).filter(function (k, i) {
            return k.includes('question_')
        }).forEach(function (k) {
            questionsAndAnswers.push({
                question: k,
                rate: formData[k]
            });
        });

        let newFromData = {};
        newFromData['questionsAndAnswers'] = questionsAndAnswers;
        newFromData['comment'] = formData.comment;
        newFromData['session_id'] = '';
        newFromData['facilitator_session_outline_id'] = ''; 
        newFromData['type'] = 3;

        this.setState({
            submittingForm: true
        });

        this.props.store_feedback(newFromData);
    }

    componentDidMount() {
        this.props.get_general_questions({
            question_type: 3
        });
    }

    showNotificationFrom = async nextProps => {
        if (nextProps.store_facilitator_outline_status === 200) {
            this.setState({
                submittingForm: false
            });

            let alert = await swal({
                type: 'success',
                title: `Feedback was added successfully`,
                allowOutsideClick: false
            });

            if (alert) {
                this.props.reset_store_feedback();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotificationFrom(nextProps);
    }

    render() {

        let container = <Spinner />

        if (this.props.get_questions_status === 200 && !this.props.generalQuestions.length) {
            container = <EmptyState message="No Questions in database yet" />;
        }

        if (this.props.get_questions_status === 200 && this.props.generalQuestions.length) {
            container = (
                <div className={styles.container}>

                    <div className={styles.outlineContainer}>
                        <div className={styles.header}>
                            General Rating
                        </div>
                        <div>
                            <FacilitatorOutlineAddFeedbackForm onSubmit={this.handleSubmit} questions={this.props.generalQuestions} submittingForm={this.state.submittingForm} />
                        </div>
                    </div>

                </div>
            )
        }

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <QuickContact />
                </div>

                { container }
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        generalQuestions: state.generalFeedbackReducer.generalQuestions,
        get_questions_status: state.generalFeedbackReducer.get_questions_status,

        store_facilitator_outline_status: state.facilitatorOutlineAddFeedbackReducer.store_facilitator_outline_status
    }
}


const mapDispatchToProps = dispatch => {
    return {
        get_general_questions: payload => dispatch( get_general_questions(payload) ),
        store_feedback: payload => dispatch( store_feedback(payload) ),
        reset_store_feedback: () => dispatch( reset_store_feedback() )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedbackGeneralCreate);