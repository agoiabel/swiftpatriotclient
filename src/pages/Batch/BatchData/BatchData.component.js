import React from 'react';
import swal from 'sweetalert2';
import styles from '../Batch.page.module.css';
import DisplayStatus from '../../../components/DisplayStatus';

class BatchData extends React.Component {


	showActionFor = () => {
		this.props.showActionFor(this.props.candidate);
	}

	handleRejectionCandidate = () => {
		swal({
			title: `Are you sure you want to reject ${this.props.candidate.firstname}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Reject!'
		}).then((result) => {
			if (result.value) {
				this.props.handleRejectionCandidate(this.props.candidate);
			}
		});
	}

	makeDecisionOn = () => {
		this.props.makeDecisionOn(this.props.candidate);
	}

	render () {
		let action = null;

		if (this.props.showAction) {
			action = (
				<div className={styles.actions}>
					<div className={styles.action} onClick={this.handleRejectionCandidate}>
						<span className={styles.actionIcon}>
							<i className="fa fa-window-close" aria-hidden="true"></i></span><span>Reject	
						</span>
					</div>
					<div className={styles.action} onClick={this.makeDecisionOn}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>View Info
						</span>
					</div>
				</div>
			);
		}


		return (

			<tr key={this.props.candidate.id}>
				<td>{this.props.candidate.id}</td>
				<td>{this.props.candidate.trademoni_id}</td>
				<td>{this.props.candidate.firstname}</td>
				<td>{this.props.candidate.lastname}</td>
				<td>{this.props.candidate.gender}</td>
				<td>{this.props.candidate.phone}</td>
				<td>{this.props.candidate.smile_reference}</td>
				<td>{this.props.candidate.tradetype}</td>
				<td>{this.props.candidate.state}</td>
				<td>{this.props.candidate.lga}</td>
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{action}
				</td>
			</tr>

		);
	}

}


export default BatchData;