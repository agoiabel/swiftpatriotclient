import React from 'react';
import Header from '../../components/Header';
import styles from './ProfilePayment.page.module.css';
import ProfileMenu from '../../components/ProfileMenu';
import QuickContact from '../../components/QuickContact';

class ProfilePayment extends React.Component {
    
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
                                    <th>Inv. No</th>
                                    <th>Date</th>
                                    <th>Payment Status</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>

                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>
                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
                                    <td>Number-123456</td>
                                    {/* <td>{moment(this.props.session.end_date).format('MMMM Do YYYY')}</td> */}
                                </tr>
                                <tr key="1">
                                    <td>1</td>
                                    <td>1234567</td>
                                    <td>22 Jan 2018</td>
                                    <td>Active</td>
                                    <td>123456</td>
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

export default ProfilePayment;