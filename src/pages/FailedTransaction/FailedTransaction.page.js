import React from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './FailedTransaction.page.module.css';

import { get_transaction_for, update_transaction, reset_update_transaction_status } from '../../shared/store/Transaction/Transaction.action.js';

class FailedTransactionPage extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_transaction_for({
			session_id: this.props.match.params.sessionSlug,
			status: 2
		});
	}

	showActionFor = transaction => {
		this.setState({ showAction: this.state.showAction === transaction.id ? null : transaction.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	render() {
		let transactions = <Spinner message="Loading Transactions" />
		
		if (this.props.get_transaction_status === 200 && !this.props.transactions.length) {
			transactions = <EmptyState message="No failed transaction in database yet" />
		}

		if (this.props.get_transaction_status === 200 && this.props.transactions.length) {

			transactions = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Transaction Date</th>
							<th>Student</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{this.props.transactions.map(transaction => (

							<tr key={transaction.id}>
								<td>{transaction.id}</td>
								<td>{moment(transaction.payment_date).format('MMMM Do YYYY')}</td>
								<td>{transaction.user.firstname} {transaction.user.firstname}</td>
								<td>{transaction.amount}</td>
							</tr>

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
					<Breadcrumb name="Failed Transactions" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>
					<div className={styles.content}>
						<div>
							{transactions}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		transactions: state.transactionReducer.transactions,
		get_transaction_status: state.transactionReducer.get_transaction_status,
		update_transaction_status: state.transactionReducer.update_transaction_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update_transaction: payload => dispatch(update_transaction(payload) ),
		get_transaction_for: payload => dispatch(get_transaction_for(payload)),
		reset_update_transaction_status: () => dispatch(reset_update_transaction_status())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FailedTransactionPage);