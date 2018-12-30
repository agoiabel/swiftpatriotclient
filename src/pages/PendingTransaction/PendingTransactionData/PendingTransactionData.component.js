import React from 'react';
import moment from 'moment';
import styles from '../PendingTransaction.page.module.css';

class OutlineData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.transaction);
	}

	update = status => {
		this.props.update(status, this.props.transaction);
	}

	render () {
		let actions = null;

		if (this.props.showAction) {
			actions = (
				<div className={styles.actions}>

					<div className={styles.action} onClick={() => this.update('1')}>
						<span className={styles.actionIcon}>
							<i className="fa fa-window-close" aria-hidden="true"></i></span><span>Accept	
						</span>
					</div>
					<div className={styles.action} onClick={() => this.update('2')}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Decline
						</span>
					</div>
				</div>
			);
		}


		return (

			<tr key={this.props.transaction.id}>

				<td>{this.props.transaction.id}</td>
				<td>{moment(this.props.transaction.payment_date).format('MMMM Do YYYY')}</td>
				<td>{this.props.transaction.user.firstname} {this.props.transaction.user.firstname}</td>
				<td>{this.props.transaction.amount}</td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default OutlineData;