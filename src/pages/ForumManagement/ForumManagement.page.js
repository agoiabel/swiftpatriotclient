import React from 'react';
import swal from 'sweetalert2';

import { connect } from 'react-redux';

import Header from '../../components/Header';
import Spinner from '../../components/Spinner';

import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './ForumManagement.page.module.css';
import ForumManagementData from './ForumManagementData';
import { get_forum_for, update_forum, reset_update_forum_status } from './ForumManagement.page.action.js';
import ForumMenu from '../../components/ForumMenu/ForumMenu.component';

class ForumManagement extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_forum_for({
			status: 0
		});
	}

	showActionFor = forum => {
		this.setState({ showAction: this.state.showAction === forum.id ? null : forum.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	update = (status, forum) => {

		const message = status == 1 ? "Accept": "Decline";

		swal({
			title: `Are you sure you want to ${message} ${forum.owner.firstname} ${forum.owner.lastname} payment forum`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Update!'
		}).then((result) => {
			
			if (result.value) {
				this.props.update_forum({
					forum_id: forum.id,
					status: status
				});
			}

			console.dir('can update ');
		});
	}


	showNotificationFrom = nextProps => {
		if (nextProps.update_forum_status === 200) {
			swal({
				type: 'success',
				title: `Forum was updated successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.reset_update_forum_status();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let forums = <Spinner message="Loading Forums" />
		
		if (this.props.get_forum_status === 200 && !this.props.forums.length) {
			forums = <EmptyState message="No pending forum in database yet" />
		}

		if (this.props.get_forum_status === 200 && this.props.forums.length) {

			forums = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Student Name</th>
							<th>Title</th>
							<th>Post</th>
							<th>Date Posted</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.forums.map(forum => (

							<ForumManagementData key={forum.id} forum={forum}
									    showAction={this.state.showAction === forum.id}
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
					<Breadcrumb name="Loading Forum" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.contentContainer}>
						<div className={styles.sideMenu}>
							<ForumMenu />
						</div>

						<div className={styles.content}>
							{ forums }
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		forums: state.forumManagementReducer.forums,
		get_forum_status: state.forumManagementReducer.get_forum_status,
		update_forum_status: state.forumManagementReducer.update_forum_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		update_forum: payload => dispatch( update_forum(payload) ),
		get_forum_for: payload => dispatch( get_forum_for(payload) ),
		reset_update_forum_status: () => dispatch( reset_update_forum_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumManagement);