import React from 'react';
import moment from 'moment';
import styles from '../SessionIndex.page.module.css';

class SessionData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.session);
	}

	edit = () => {
		this.props.edit(this.props.session);
	}

	delete = () => {
		this.props.delete(this.props.session);
	}

	navigate = () => {
		this.props.navigateTo(`/session/dashboard/${this.props.session.id}`);
	}

	activate = () => {
		this.props.activate(this.props.session);
	}

	formatStatusFor = status => {
		if (status) {
			return 'ACTIVE'
		}
		return "INACTIVE";
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
					<div className={styles.action} onClick={this.navigate}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Info
						</span>
					</div>
					<div className={styles.action} onClick={this.activate}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Activate
						</span>
					</div>
				</div>
			);
		}


		return (

			<tr key={this.props.session.id}>
				<td>{this.props.session.id}</td>

				<td>{this.props.session.name}</td>
				<td>{this.props.session.course.name}</td>
				<td>{this.formatStatusFor(this.props.session.status)}</td>

				<td>{ moment(this.props.session.start_date).format('MMMM Do YYYY') }</td>
				<td>{ moment(this.props.session.end_date).format('MMMM Do YYYY') }</td>

				<td>{ moment(this.props.session.registration_start_date).format('MMMM Do YYYY')}</td>
				<td>{ moment(this.props.session.registration_end_date).format('MMMM Do YYYY') }</td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default SessionData;