import React from 'react';
import styles from '../CourseIndex.page.module.css';

class CourseData extends React.Component {


	showActionFor = () => {
		this.props.showActionFor(this.props.course);
	}

	handleRejectionCandidate = () => {
		// swal({
		// 	title: `Are you sure you want to reject ${this.props.candidate.firstname}`,
		// 	type: 'warning',
		// 	showCancelButton: true,
		// 	confirmButtonColor: '#3085d6',
		// 	cancelButtonColor: '#d33',
		// 	confirmButtonText: 'Yes, Reject!'
		// }).then((result) => {
		// 	if (result.value) {
		// 		this.props.handleRejectionCandidate(this.props.candidate);
		// 	}
		// });
	}

	edit = () => {
		this.props.edit(this.props.course);
	}

	delete = () => {
		this.props.delete(this.props.course);
	}

	makeDecisionOn = () => {
		// this.props.makeDecisionOn(this.props.candidate);
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

			<tr key={this.props.course.id}>
				<td>{this.props.course.id}</td>
				<td>{this.props.course.name}</td>
				<td>{this.props.course.duration} days</td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default CourseData;