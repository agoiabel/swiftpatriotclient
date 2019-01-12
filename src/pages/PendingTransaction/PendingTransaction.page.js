import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './PendingTransaction.page.module.css';
import PendingTransactionData from './PendingTransactionData';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { get_transaction_for, update_transaction, reset_update_transaction_status } from '../../shared/store/Transaction/Transaction.action.js';

class PendingTransactionPage extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_transaction_for({
			session_id: this.props.match.params.sessionSlug,
			status: 0
		});
	}

	showActionFor = transaction => {
		this.setState({ showAction: this.state.showAction === transaction.id ? null : transaction.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	update = (status, transaction) => {

		const message = status == 1 ? "Accept": "Decline";

		swal({
			title: `Are you sure you want to ${message} ${transaction.user.firstname} ${transaction.user.lastname} payment transaction`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Update!'
		}).then((result) => {
			if (result.value) {
				this.props.update_transaction({
					transaction_id: transaction.id,
					status: status
				});
			}
		});
	}


	showNotificationFrom = nextProps => {
		if (nextProps.update_transaction_status === 200) {
			swal({
				type: 'success',
				title: `Transaction was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.reset_update_transaction_status();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let transactions = <Spinner message="Loading Transactions" />
		
		if (this.props.get_transaction_status === 200 && !this.props.transactions.length) {
			transactions = <EmptyState message="No pending transaction in database yet" />
		}

		if (this.props.get_transaction_status === 200 && this.props.transactions.length) {

			transactions = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Transaction Date</th>
							<th>Student</th>
							<th>Amount</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.transactions.map(transaction => (

							<PendingTransactionData key={transaction.id} transaction={transaction}
									    showAction={this.state.showAction === transaction.id}
									    showActionFor={this.showActionFor}
										update={this.update}
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
					<Breadcrumb name="Pending Transactions" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>
					<div className={styles.content}>
						<div className={styles.header}>
							<ReactHTMLTableToExcel
								id="test-table-xls-button"
								className={styles.addNew}
								table="table-to-xls"
								filename="tablexls"
								sheet="tablexls"
								buttonText="EXPORT"
							/>
						</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PendingTransactionPage);