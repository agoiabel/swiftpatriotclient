import React from 'react';
import PropTypes from 'prop-types';
import styles from './Spinner.component.module.css';

const Spinner = ({message}) => (
	<div className={styles.container}>
		<div className={styles.content}>
			<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
			<div className={styles.message}>
				{message}
			</div>
		</div>
	</div>
);


Spinner.defaultProps = {
	message: 'Loading'
};

export default Spinner;