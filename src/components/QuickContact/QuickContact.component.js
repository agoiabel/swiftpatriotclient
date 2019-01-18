import React from 'react';
import styles from './QuickContact.component.module.css';

class QuickContact extends React.Component {

    state = {
        showContainer: true
    }

    closeContainer = () => {
        this.setState(prevState => ({
            showContainer: !prevState.showContainer            
        }));
    }

    render() {

        let container;

        if (this.state.showContainer) {
            container = (
                <div className={styles.container}>

                    <div className={styles.close} onClick={this.closeContainer}><i className="fa fa-close fa-2x"></i></div>

                    <div className={styles.contactUs}>
                        <div className={styles.informations}>
                            <div className={styles.header}>Welcome to Daystar Leadership Academy</div>
                            <div>
                                <div>
                                    Do you have any question we want to ask us? You can always reach us on these numbers: +2348068423092, +2348026249615.
                                </div>         
                                <div>
                                    Our office address is 71 Kudirat Abiola Way, Oregun, Ikeja, Lagos.
                                </div>
                            </div>
                        </div>        

                        {/* <div className={styles.imageContainer}>
                            <img src={require('../../assets/images/contact_us.png')} />
                        </div>        
 */}

                        <div className={styles.accountDetailContainer}>
                            <div>
                                <div className={styles.accountDetailsHeader}>Account Details</div>
                                <div>
                                    <p>Daystar Leadership Academy</p>
                                    <p>0011920185</p>
                                    <p>Guaranty Trust Bank(GTBank) PLC</p>
                                </div>
                            </div>
                        </div>
                                                        
                    </div>
                </div>
            );
        }


        return (
            <React.Fragment>
                { container }
            </React.Fragment>
        )
    }


}

export default QuickContact;