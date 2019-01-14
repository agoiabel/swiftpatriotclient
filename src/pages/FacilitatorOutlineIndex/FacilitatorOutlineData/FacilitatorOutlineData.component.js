import React from 'react';
import moment from 'moment';
import { tConv24 } from '../../../utils/convert_time';
import styles from '../FacilitatorOutlineIndex.page.module.css';

class FacilitatorOutlineData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.facilitator_outline);
	}

	feeback = () => {
		// this.props.edit(this.props.facilitator_outline);
	}

	delete = () => {
		this.props.delete(this.props.facilitator_outline);
	}

	render () {
		let actions = null;

		if (this.props.showAction) {
			actions = (
				<div className={styles.actions}>

					{/* <div className={styles.action} onClick={this.feeback}>
						<span className={styles.actionIcon}>
							<i className="fa fa-window-close" aria-hidden="true"></i></span><span>Feedback	
						</span>
					</div>
					<div className={styles.action}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Attendance
						</span>
					</div> */}

					<div className={styles.action} onClick={this.delete}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Delete
						</span>
					</div>

				
				</div>
			);
		}


		return (

			<tr key={this.props.facilitator_outline.id}>
				<td>{this.props.facilitator_outline.id}</td>
				<td>{this.props.facilitator_outline.outline.name}</td>
				<td>
					{this.props.facilitator_outline.facilitator.profile.firstname} {this.props.facilitator_outline.facilitator.profile.lastname} {this.props.facilitator_outline.facilitator.profile.othername}
				</td>
				<td>{moment(this.props.facilitator_outline.date).format('MMMM Do YYYY')}</td>
				<td>{tConv24(this.props.facilitator_outline.time)}</td>
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default FacilitatorOutlineData;