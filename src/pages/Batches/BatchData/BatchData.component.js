import React from 'react';
import styles from '../Batches.page.module.css';
import DisplayStatus from '../../../components/DisplayStatus';

class BatchData extends React.Component {


	showActionFor = () => {
		this.props.showActionFor(this.props.batch);
	}

	navigateToBatch = () => {
		this.props.navigateTo(this.props.batch);
	}

	startVerificationFor = () => {
		this.props.startVerificationFor(this.props.batch);	  
	}
	

	render () {
		let action = null;

		if (this.props.showAction) {
			action = (
				<div className={styles.actions}>
					<div className={styles.action} onClick={this.navigateToBatch}>
						<span className={styles.actionIcon}><i className="fa fa-file" aria-hidden="true"></i></span><span>View Batch</span>
					</div>
					<div className={styles.action} onClick={this.startVerificationFor}>
						<span className={styles.actionIcon}><i className="fa fa-check" aria-hidden="true"></i></span> <span>Pass Batch</span>
					</div>
				</div>
			);
		}


		return (
			<tr key={this.props.batch.id}>
				<td>{this.props.batch.id}</td>
				<td>{this.props.batch.batch_name}</td>
				<td>{this.props.batch.created_on}</td>
				<td>{this.props.batch.date_processed}</td>
				<td>{this.props.batch.batch_size}</td>
				<td><DisplayStatus status={this.props.batch.verify_isapproved} /></td>
				<td><DisplayStatus status={this.props.batch.admin_isapproved} /></td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{action}
				</td>
			</tr>
		);
	}

}


export default BatchData;