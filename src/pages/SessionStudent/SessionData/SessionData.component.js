import React from 'react';
import moment from 'moment';
import styles from '../SessionStudent.page.module.css';

class SessionData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.sessionStudent);
	}

	differAdmission = () => {
		this.props.deferAdmission(this.props.sessionStudent);
	}

	formatStatusFor = status => {
		if (status == 1) {
			return 'PAST';
		}
		if (status == 2) {
			return 'ACTIVE';
		}
		return "UP COMING";
	}

	render () {
		let actions = null;

		if (this.props.showAction) {
			actions = (
				<div className={styles.actions}>
					<div className={styles.action} onClick={this.differAdmission}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Defer
						</span>
					</div>
				</div>
			);
		}


		return (

			<tr key={this.props.sessionStudent.id}>
				<td>{this.props.sessionStudent.id}</td>
				<td>{this.props.sessionStudent.student.firstname} {this.props.sessionStudent.student.lastname}</td>
				<td>{this.props.sessionStudent.student.matric_number}</td>
				<td>{this.props.sessionStudent.status}</td>
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default SessionData;