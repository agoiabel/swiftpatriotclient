import React from 'react';
import styles from '../FeedbackQuestionIndex.page.module.css';

class FeedbackQuestionData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.question);
	}

	edit = () => {
		this.props.edit(this.props.question);
	}

	delete = () => {
		this.props.delete(this.props.question);
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

				</div>
			);
		}


		return (

			<tr key={this.props.question.id}>
				<td>{this.props.question.id}</td>
				<td>{this.props.question.question}</td>
				<td>{this.props.question.type}</td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default FeedbackQuestionData;