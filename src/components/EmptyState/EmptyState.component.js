import React from 'react';
import PropTypes from 'prop-types';
import styles from './EmptyState.component.module.css';

const EmptyState = ({message}) => (
	<div className={styles.container}>
		<div className={styles.content}>
			<div className={styles.message}>
				{message}
			</div>
		</div>
	</div>
);


EmptyState.defaultProps = {
	message: 'Data is empty'
};

export default EmptyState;