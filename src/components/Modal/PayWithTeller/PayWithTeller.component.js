import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './PayWithTeller.component.module.css';
import PayWithTellerForm from '../../Forms/PayWithTellerForm';
import { initial_transaction } from './PayWithTeller.component.action.js';

class PayWithTeller extends React.Component {

    state = {
        submittingForm: false
    }

    rejectHandler = event => {
        event.preventDefault();

        this.updateState();
    }

    handleSubmit = formData => {
        formData['session_id'] = this.props.sessionId;
        formData['type'] = 'bank_transfer';
        
        this.setState({
            submittingForm: true
        });

        this.props.initial_transaction(formData);
    }

    showNotification = nextProps => {
        this.setState({
            submittingForm: false
        });

        if (nextProps.status !== 200) {
            return swal({
                title: 'Error!',
                text: `${nextProps.message}`,
                type: 'error',
                timer: 2500,
                showConfirmButton: true
            });
        }
        return this.props.closeModal();
        // return swal({
        //     title: 'success!',
        //     text: `${nextProps.message}`,
        //     type: 'success',
        //     timer: 2500,
        //     showConfirmButton: true
        // });
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    componentDidMount() {}

    render() {

        return (
            <div className={styles.modal}>
                <div className={styles.body}>

                    <div>
                        <div className={styles.action}>
                            <div className={styles.goBack} onClick={this.props.closeModal}>
                                <i className="fa fa-close" aria-hidden="true"></i>  Close
                            </div>
                        </div>

                        <PayWithTellerForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
                    </div>

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        status: state.payWithTellerReducer.status,
        message: state.payWithTellerReducer.message,
        transaction: state.payWithTellerReducer.transaction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        initial_transaction: payload => dispatch(initial_transaction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWithTeller);