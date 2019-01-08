import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import EmptyState from '../../components/EmptyState';
import styles from './ProfileSession.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';
import { get_session_for_user } from './ProfileSession.page.action';

class ProfileSession extends React.Component {
    
    componentDidMount() {
        this.props.get_session_for_user();
    }

    render () {

        let sessionStudents = <Spinner />;

        if (this.props.status === 200 && !this.props.sessionStudents.length) {
            sessionStudents = <EmptyState message="No transaction yet" />;
        }

        if (this.props.status === 200 && this.props.sessionStudents.length) {
            sessionStudents = this.props.sessionStudents.map(sessionStudent => (
                <tr key={sessionStudent.id}>
                    <td>{sessionStudent.id}</td>
                    <td>{ sessionStudent.session.course.name }</td>
                    <td>{ sessionStudent.session.status }</td>
                    <td>{moment(sessionStudent.session.start_date).format('MMMM Do YYYY')}</td>
                    <td>{moment(sessionStudent.session.end_date).format('MMMM Do YYYY')}</td>
                    <td>{ sessionStudent.session_number }</td>
                </tr>
            ));
        }


        return (
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <QuickContact />
                </div>
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <ProfileMenu /> 
                    </div>
                    <div className={styles.content}>

                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Session Course</th>
                                    <th>Session Status</th>
                                    <th>Session Start Date</th>
                                    <th>Session End Date</th>
                                    <th>Session Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                { sessionStudents }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        status: state.profileSessionReducer.status,
        sessionStudents: state.profileSessionReducer.sessionStudents
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_session_for_user: () => dispatch(get_session_for_user())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSession);