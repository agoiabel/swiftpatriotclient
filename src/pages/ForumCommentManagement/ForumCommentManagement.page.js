import React from 'react';
import swal from 'sweetalert2';

import { connect } from 'react-redux';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import ForumMenu from '../../components/ForumMenu';

import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './ForumCommentManagement.page.module.css';

import ForumCommentManagementData from './ForumCommentManagementData';
import { get_forum_comment_for, update_forum_comment, reset_update_forum_comment_status } from './ForumCommentManagement.page.action.js';

class ForumCommentManagement extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_forum_comment_for({
			status: 0
		});
	}

	showActionFor = forumComment => {
		this.setState({ showAction: this.state.showAction === forumComment.id ? null : forumComment.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	update = (status, forumComment) => {

		const message = status == 1 ? "Accept": "Decline";

		swal({
			title: `Are you sure you want to ${message} ${forumComment.owner.firstname} ${forumComment.owner.lastname} update forumComment`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Update!'
		}).then((result) => {
			
			if (result.value) {
				this.props.update_forum_comment({
					forum_comment_id: forumComment.id,
					status: status
				});
			}

		});
	}


	showNotificationFrom = nextProps => {
		if (nextProps.update_forum_comment_status === 200) {
			swal({
				type: 'success',
				title: `Comment was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.reset_forum_comment_status();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let forumComments = <Spinner message="Loading Comments" />
		
		if (this.props.get_forum_comment_status === 200 && !this.props.forumComments.length) {
			forumComments = <EmptyState message="No pending comment in database yet" />
		}

		if (this.props.get_forum_comment_status === 200 && this.props.forumComments.length) {

			forumComments = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Student Name</th>
							<th>Title</th>
							<th>Post</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.forumComments.map(forumComment => (

							<ForumCommentManagementData key={forumComment.id} forumComment={forumComment}
														showAction={this.state.showAction === forumComment.id}
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
					<Breadcrumb name="Loading Forum Comments" />
				</React.Fragment>


				<div className={styles.container}>
					<div className={styles.contentContainer}>
						<div className={styles.sideMenu}>
							<ForumMenu />
						</div>

						<div className={styles.content}>
							{forumComments}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		forumComments: state.forumCommentManagementReducer.forumComments,
		get_forum_comment_status: state.forumCommentManagementReducer.get_forum_comment_status,
		update_forum_component_status: state.forumCommentManagementReducer.update_forum_comment_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update_forum_comment: payload => dispatch( update_forum_comment(payload) ),
		get_forum_comment_for: payload => dispatch( get_forum_comment_for(payload) ),
		reset_update_forum_comment_status: () => dispatch( reset_update_forum_comment_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumCommentManagement);