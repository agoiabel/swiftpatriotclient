import React from 'react';
import Header from '../../components/Header';
import styles from './ProfileSession.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';

class ProfileSession extends React.Component {
    
    render () {
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
                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>


                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>


                                <tr key="1">
                                    <td>1</td>
                                    <td>Session name</td>
                                    <td>Active</td>
                                    <td>22 Jan 2018</td>
                                    <td>22 Jan 2019</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileSession;