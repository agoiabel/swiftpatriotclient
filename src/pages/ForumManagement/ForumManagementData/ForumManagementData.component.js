import React from 'react';
import moment from 'moment';
import styles from '../ForumManagement.page.module.css';

class ForumManagementData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.forum);
	}

	update = status => {
		this.props.update(status, this.props.forum);
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

			<tr key={this.props.forum.id}>

				<td>{this.props.forum.id}</td>
				<td>{this.props.forum.owner.firstname} {this.props.forum.owner.firstname}</td>
				<td>{this.props.forum.title}</td>
				<td>{this.props.forum.post}</td>
				<td>{moment(this.props.forum.posted_date).format('MMMM Do YYYY')}</td>
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>

			</tr>

		);
	}

}


export default ForumManagementData;