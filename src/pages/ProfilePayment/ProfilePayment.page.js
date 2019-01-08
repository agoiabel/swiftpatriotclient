import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import styles from './ProfilePayment.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import { get_payment_for_user } from './ProfilePayment.page.action.js';

class ProfilePayment extends React.Component {
    
    componentDidMount() {
        this.props.get_payment_for_user();
    }

    render () {
        let transactions = <Spinner />;

        if (this.props.status === 200 && !this.props.transactions.length) {
            transactions = <EmptyState message="No transaction yet" />;
        }

        if (this.props.status === 200 && this.props.transactions.length) {
            transactions = this.props.transactions.map(transaction => (
                <tr key={transaction.id}>
                    <td>{ transaction.id }</td>
                    <td>{ transaction.reference_number }</td>
                    <td>{moment(transaction.payment_date).format('MMMM Do YYYY')}</td>
                    <td>{ transaction.status }</td>
                    <td>{ transaction.amount }</td>
                    <td>{transaction.type}</td>
                    <td>{ transaction.description }</td>
                </tr>
            ));
        }

        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <QuickContact />
                </div>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <ProfileMenu /> 
                    </div>
                    <div className={styles.content}>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Inv. No</th>
                                    <th>Date</th>
                                    <th>Payment Status</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>                    
                                { transactions }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        status: state.profilePaymentReducer.status,
        transactions: state.profilePaymentReducer.transactions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_payment_for_user: () => dispatch( get_payment_for_user() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePayment);