import React from 'react';
import styles from './DisplayStatus.component.module.css';

const DisplayStatus = ({status}) => {

	let statusContainer;

	if (status == "-1") {
		statusContainer = (
			<div className={styles.rejected}>REJECTED</div>
		);
	}
	if (status == "0") {
		statusContainer = (
			<div className={styles.pending}>PENDING</div>
		);
	}
	if (status == "1") {
		statusContainer = (
			<div className={styles.approved}>APPROVED</div>
		);
	}

	return (
		<div>{statusContainer}</div>
	);
}

export default DisplayStatus;