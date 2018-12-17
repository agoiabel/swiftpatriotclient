import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import CustomButton from '../../CustomButton';
import RejectionForm from '../../Forms/RejectForm';
import styles from './Enumerator.component.module.css';
import { reset_candidate_status, reject_candidate } from '../../../pages/Batch/Batch.page.action';


class Enumerator extends React.Component {

    state = {
        reject: false,
        submittingForm: false
    }


    rejectHandler = event => {
        event.preventDefault();

        this.updateState();
    }

    handleSubmit = formData => {
        // formData['candidate_id'] = this.props.candidate.id;
        this.props.rejectCandidate(this.props.candidate);
    }

    updateState = () => {
        this.setState(prevState => ({
            reject: !prevState.reject
        }));
    }


    showNotification = nextProps => {
        console.dir(nextProps);
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }



    render() {

        let content = (
            <div>
                <div className={styles.goBack} onClick={this.props.closeModal}>
                    <i className="fa fa-close" aria-hidden="true"></i>  Close
                </div>

                <div className={styles.enumerator}>

                    <div className={styles.enumeratorData}>
                        <img src={require('../../../assets/images/profile_avatar.png')} />
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Name</div>
                        <div className={styles.value}>Agoi Abel</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Date of Birth</div>
                        <div className={styles.value}>26-06-1980</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>State</div>
                        <div className={styles.value}>Lagos State</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>LGA</div>
                        <div className={styles.value}>Alimosho </div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Bank Name</div>
                        <div className={styles.value}>Zenith Bank</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Account number</div>
                        <div className={styles.value}>3030317615</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Phone Number</div>
                        <div className={styles.value}>Address</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Address</div>
                        <div className={styles.value}>No 6. Adeyeye street, Ayobo</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Enumerated on:</div>
                        <div className={styles.value}>26-06-1980</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Trader Type</div>
                        <div className={styles.value}>Food Stuff Vendor</div>
                    </div>
                    <div className={styles.enumeratorData}>
                        <div className={styles.title}>Cluster Location</div>
                        <div className={styles.value}>ONITSHA MARKET</div>
                    </div>

                </div>

                <div className={styles.makeDecision}>
                    <CustomButton onClick={this.rejectHandler}> REJECT </CustomButton>
                </div>
            </div>
        );


        if (this.state.reject === true) {
            content = (
                <div>
                    <div className={styles.action}>
                        <div className={styles.goBack} onClick={this.rejectHandler}>
                            <div><i className="fa fa-arrow-left" aria-hidden="true"></i>  Go Back </div>
                        </div>
                        <div className={styles.goBack} onClick={this.props.closeModal}>
                            <i className="fa fa-close" aria-hidden="true"></i>  Close
                        </div>
                    </div>

                    <RejectionForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
                </div>
            );
        }


        return (
            <div className={styles.modal}>
                <div className={styles.body}>

                    {content}

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        candidate_rejected_status: state.batchReducer.candidate_rejected_status,
        candidate_rejected_message: state.batchReducer.candidate_rejected_message,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        resetCandidateStatus: () => dispatch(reset_candidate_status()),
        rejectCandidate: (candidate) => dispatch(reject_candidate(candidate)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Enumerator);