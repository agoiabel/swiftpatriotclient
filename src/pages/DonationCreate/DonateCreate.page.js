import React from 'react';
import swal from 'sweetalert2';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './DonateCreate.page.module.css';
import QuickContact from '../../components/QuickContact';

import DonateCreateForm from '../../components/Forms/DonateCreateForm';
import { store_donation, reset_donation_status } from './DonateCreate.action';

class DonateCreate extends React.Component {

    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        });

        this.props.store_donation(formData);
    }

    resetFormSubmit = () => {
        this.setState({
            submittingForm: false
        }, () => {
            this.props.reset_form();
        });
    }

    showNotification = nextProps => {
        if (nextProps.status === 200 && nextProps.transaction !== this.props.transaction) {

            if (nextProps.transaction.type == "bank_transfer") {
                return swal({
                    type: 'success',
                    title: `${nextProps.message}`,
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.value) {
                        this.resetFormSubmit();
                        this.props.reset_donation_status();
                    }
                });
            }


            //payment was successful
            if (nextProps.transaction.status == '1') {
                return swal({
                    type: 'success',
                    title: `Payment was successful, thanks for donating`,
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.value) {
                        this.resetFormSubmit();
                        this.props.reset_donation_status();
                    }
                });
            }


            //payment was unsuccessful
            return swal({
                type: 'error',
                title: `The payment failed, please try again`,
                allowOutsideClick: false
            }).then((result) => {
                if (result.value) {
                    this.resetFormSubmit();
                    this.props.reset_donation_status();
                }
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);    
    }

    render () {
        return (
            <div>
                <div>
                    <Header />
                </div>

                <div>
                    <QuickContact />
                </div>

                <div className={styles.container}>
                    <div className={styles.header}>Donation Form</div>

                    <DonateCreateForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} submitText="Donate" />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        status: state.donationCreateReducer.status,
        message: state.donationCreateReducer.message,
        transaction: state.donationCreateReducer.transaction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset_form: () => dispatch( reset('DonateCreateForm') ),
        store_donation: payload => dispatch( store_donation(payload) ),
        reset_donation_status: () => dispatch( reset_donation_status() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonateCreate);