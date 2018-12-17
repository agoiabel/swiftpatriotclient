import React from 'react';
import styles from './Breadcrumb.component.module.css';

const Breadcrumb = ({name}) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.name}>{name}</span>
			</div>
		</div>
	);
}


export default Breadcrumb;