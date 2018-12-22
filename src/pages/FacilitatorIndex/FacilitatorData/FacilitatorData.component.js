import React from 'react';
import styles from '../FacilitatorIndex.page.module.css';

class FacilitatorData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.facilitator);
	}

	edit = () => {
		this.props.edit(this.props.facilitator);
	}

	delete = () => {
		this.props.delete(this.props.facilitator);
	}

	render () {
		let actions = null;

		if (this.props.showAction) {
			actions = (
				<div className={styles.actions}>

					<div className={styles.action} onClick={this.edit}>
						<span className={styles.actionIcon}>
							<i className="fa fa-window-close" aria-hidden="true"></i></span><span>Edit	
						</span>
					</div>
					<div className={styles.action} onClick={this.delete}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Delete
						</span>
					</div>
					<div className={styles.action}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Info
						</span>
					</div>
				
				</div>
			);
		}


		return (

			<tr key={this.props.facilitator.id}>
				<td>{this.props.facilitator.id}</td>
				<td>{this.props.facilitator.firstname}</td>
				<td>{this.props.facilitator.lastname}</td>
				<td>{this.props.facilitator.phone_number}</td>
				<td>{this.props.facilitator.gender}</td>
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default FacilitatorData;