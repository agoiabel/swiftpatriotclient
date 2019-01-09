import React from 'react';
import moment from 'moment';
import RateAction from './RateAction.component.js';
import { tConv24 } from '../../../utils/convert_time';
import styles from '../StudentSession.page.module.css';


class SessionOutline extends React.Component {

    rateCourseHandler = facilitatorSessionOutline => {
        this.props.navigateTo(`/facilitator-outline/add-feedback/${facilitatorSessionOutline.id}`);
    }

    render () {
        let showRateHeader;

        if (this.props.studentType === 3) {
            showRateHeader = (
                <th>Rate Course</th>
            );
        }

        return (
            <div className={styles.courseOutlines}>
                <div className={styles.outlineHeader}>
                    Course Outlines
			    </div>

                <div className={styles.outlineBody}>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Outline</th>
                                <th>Facilitator</th>
                                <th>Lecture Date</th>
                                <th>Lecture Time</th>
                                {showRateHeader}
                            </tr>
                        </thead>
                        <tbody>

                            {this.props.session.facilitatorSessionOutlines.map(facilitatorSessionOutline => (
                                <tr key={facilitatorSessionOutline.id}>
                                    <td>{facilitatorSessionOutline.id}</td>
                                    <td>{facilitatorSessionOutline.outline.name}</td>
                                    <td>{facilitatorSessionOutline.facilitator.profile.firstname} {facilitatorSessionOutline.facilitator.profile.lastname}</td>
                                    <td>{moment(facilitatorSessionOutline.date).format('MMMM Do YYYY')}</td>
                                    <td>{tConv24(facilitatorSessionOutline.time)}</td>
                                    <RateAction rateCourseHandler={this.rateCourseHandler} studentType={this.props.studentType} facilitatorSessionOutline={facilitatorSessionOutline} />
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}

export default SessionOutline;