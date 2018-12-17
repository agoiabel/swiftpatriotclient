import React from 'react';
import styles from './CustomButton.component.module.css';


const CustomButton = props => {	

	let button = (
		<button className={styles.button}  onClick={props.onClick}>
			{props.children}
		</button>
	);

	if (props.submittingForm) {
		button = (
			<button className={styles.button} disabled={true} onClick={props.onClick}>
				<i className="fa fa-circle-o-notch fa-spin fa-fw"></i> Loading.
			</button>
		);
	}

	return (
		<React.Fragment>
			{button}
		</React.Fragment>
	);

}


export default CustomButton;