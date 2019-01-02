import React from 'react';
import styles from '../StudentSession.page.module.css';

class RateAction extends React.Component {
    rateCourseHandler = () => {
        this.props.rateCourseHandler(this.props.facilitatorSessionOutline);
    }

    render() {
        let action;

        if (this.props.studentType === 3) {
            action = (
                <div className={styles.enrollButtons}>
                    <a className={[styles.enrollButton, styles.buttonOutline].join(' ')} onClick={this.rateCourseHandler}> Rate Facilitator Course </a>
                </div>
            )
        }

        return (
            <td>
                {action}
            </td>
        )
    }
}

export default RateAction;