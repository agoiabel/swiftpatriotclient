import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import QuickContact from '../../components/QuickContact';
import styles from './FacilitatorOutlineAddFeedback.page.module.css';
import FacilitatorOutlineAddFeedbackForm from '../../components/Forms/FacilitatorOutlineAddFeedbackForm';
import { get_data, store_feedback, reset_store_feedback } from './FacilitatorOutlineAddFeedback.page.action';

class FacilitatorOutlineAddFeedback extends React.Component {
    
    state = {
        submittingForm: false
    }

    handleChange = event => {
        this.setState({
            value: event.target.value
        });
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
        newFromData['session_id'] = this.props.facilitator_outline.session.id;
        newFromData['facilitator_session_outline_id'] = this.props.match.params.facilitatorOutlineId 
        newFromData['type'] = 1;

        this.setState({
            submittingForm: true
        });

        this.props.store_feedback(newFromData);
    }

    componentDidMount() {
        this.props.get_data({
            question_type: 1,
            facilitator_outline_id: this.props.match.params.facilitatorOutlineId
        })
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
                this.props.history.push(`/student-session/${this.props.facilitator_outline.session.id}`);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotificationFrom(nextProps);
    }

    render() {

        let container = <Spinner />

        if (this.props.get_facilitator_outline_status === 200) {
            container = (
                <div className={styles.container}>

                    <div className={styles.sessionContainer}>
                        <div className={styles.item}>
                            <div className={styles.title}>Name</div>
                            <div className={styles.body}>{this.props.facilitator_outline.outline.name}</div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.title}>Facilitator</div>
                            <div className={styles.body}>{this.props.facilitator_outline.facilitator.profile.firstname} {this.props.facilitator_outline.facilitator.profile.lastname}</div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.title}>Lecture Date</div>
                            <div className={styles.body}>{moment(this.props.facilitator_outline.date).format('MMMM Do YYYY')}</div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.title}>Time</div>
                            <div className={styles.body}>2:30PM</div>
                        </div>
                    </div>

                    <div className={styles.outlineContainer}>
                        <div className={styles.header}>
                            Rate Course Below
                        </div>
                        <div>
                            <FacilitatorOutlineAddFeedbackForm onSubmit={this.handleSubmit} questions={this.props.questions} submittingForm={this.state.submittingForm} />
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
        questions: state.facilitatorOutlineAddFeedbackReducer.questions,
        facilitator_outline: state.facilitatorOutlineAddFeedbackReducer.facilitator_outline,
        get_facilitator_outline_status: state.facilitatorOutlineAddFeedbackReducer.get_facilitator_outline_status,
        store_facilitator_outline_status: state.facilitatorOutlineAddFeedbackReducer.store_facilitator_outline_status
    }
}


const mapDispatchToProps = dispatch => {
    return {
        get_data: payload => dispatch( get_data(payload) ),
        store_feedback: payload => dispatch( store_feedback(payload) ),
        reset_store_feedback: () => dispatch( reset_store_feedback() )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorOutlineAddFeedback);