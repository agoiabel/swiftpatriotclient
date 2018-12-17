import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import styles from './SessionDashboard.page.module.css';


class SessionDashboard extends React.Component {

	componentDidMount() {
		// this.props.get_outlines();
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	
	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Facilitator Outline" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/session/index')}> ALL SESSIONS </div>
					</div>
					
					<div className={styles.sessionContainer}>
						<div className={styles.containerHeader}></div>
						<div className={styles.stats}>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-briefcase" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Students</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat} onClick={() => this.navigateTo(`/facilitator-outline/index/${this.props.match.params.sessionSlug}`)}>
								<div className={styles.statIcon}><i className="fa fa-hourglass-half" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Outlines</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-check-square-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Successful Payment</div>
								<div className={styles.statNumber}>45</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-window-close-o" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Pending Payment</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Total Feedbacks</div>
								<div className={styles.statNumber}>45</div>
							</div>


							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Start Date</div>
								<div className={styles.statNumber}>22/02/2019</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>End Date</div>
								<div className={styles.statNumber}>22/12/2019</div>
							</div>

							<div className={styles.stat}>
								<div className={styles.statIcon}><i className="fa fa-users" aria-hidden="true"></i></div>
								<div className={styles.statTitle}>Session Course</div>
								<div className={styles.statNumber}>ENGLISH LANG.</div>
							</div>

						</div>
					</div>

				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {}
}

const mapDispatchToProps = dispatch => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDashboard);