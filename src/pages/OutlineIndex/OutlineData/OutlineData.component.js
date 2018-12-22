import React from 'react';
import styles from '../OutlineIndex.page.module.css';

class OutlineData extends React.Component {

	showActionFor = () => {
		this.props.showActionFor(this.props.outline);
	}

	edit = () => {
		this.props.edit(this.props.outline);
	}

	delete = () => {
		this.props.delete(this.props.outline);
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
					{/* <div className={styles.action}>
						<span className={styles.actionIcon}>
							<i className="fa fa-file-o" aria-hidden="true"></i></span> <span>Info
						</span>
					</div> */}
				
				</div>
			);
		}


		return (

			<tr key={this.props.outline.id}>
				<td>{this.props.outline.id}</td>
				<td>{this.props.outline.name}</td>
				<td>{this.props.outline.code}</td>
				<td>{this.props.outline.description}</td>

				<td className={styles.actionContainer} onClick={this.showActionFor}>
					<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
					{actions}
				</td>
			</tr>

		);
	}

}


export default OutlineData;