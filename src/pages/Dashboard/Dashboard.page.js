import React from 'react';
import Header from '../../components/Header';
import styles from './Dashboard.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';

class Dashboard extends React.Component {

	navigateTo = page => {
		this.props.history.push(page);
	}

	render() {
		return (
			<div>
				<div>
					<Header />
				</div>

				<div>
					<Breadcrumb name="Dashboard" />
				</div>

				<div className={styles.dashboard}>

					<div className={styles.content}>

						<div className={styles.stats}>
						
							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-briefcase" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-hourglass-half" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Pending Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Approved Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-window-close-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Declined Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Enumerators</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Candidate Verified</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-power-off" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Candidate Rejected</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-briefcase" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-briefcase" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Batches</div>
								<div className={styles.statNumber}>45</div>
							</div>


						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;