import React from 'react';
import moment from 'moment';
import styles from '../ForumCommentManagement.page.module.css';

class ForumCommentManagementData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.forumComment);
	}

	update = status => {
		this.props.update(status, this.props.forumComment);
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

			<tr key={this.props.forumComment.id}>

				<td>{this.props.forumComment.id}</td>
				<td>{this.props.forumComment.owner.firstname} {this.props.forumComment.owner.firstname}</td>
				<td>{this.props.forumComment.forum.title}</td>
				<td>{this.props.forumComment.post}</td>				
				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>

			</tr>

		);
	}

}


export default ForumCommentManagementData;