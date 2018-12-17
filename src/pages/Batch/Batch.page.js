import React from 'react';
import swal from 'sweetalert2';
import BatchData from './BatchData';
import { connect } from 'react-redux';
import styles from './Batch.page.module.css';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import { ENUMERATOR } from '../../components/Modal/index';
import { openModal, closeModal } from '../../components/Modal/Modal.action';
import { get_batch, reject_candidate, batch_verification, reset_candidate_status, reset_batch_update_status } from './Batch.page.action';


class Batch extends React.Component {

	state = {}
	
	startVerificationFor = () => {
		swal({
			title: `Are you sure you want to pass ${this.props.batch.batch_name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Clean!'
		}).then((result) => {
			if (result.value) {
				this.props.batch_verification({
					batchId: this.props.batch.id,
					status: 'Whitelisted',
					comment: 'Batch is clean, nice job done'
				});

			}
		});
	}


	componentDidMount() {
		this.props.batch === null ? this.props.history.push('/batches') : this.props.get_batch(this.props.match.params.batchId);
	}

	showActionFor = batch => {
		this.setState({ showAction: this.state.showAction === batch.id ? null : batch.id });
	}


	showNotification = nextProps => {
		if (nextProps.candidate_rejected_status === 200) {
			swal({
				type: 'success',
				title: `${nextProps.candidate_rejected_message}`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetCandidateStatus();
					this.props.closeModal();
				}
			});
		}


		if (nextProps.batch_updated_status === 200) {
			swal({
				type: 'success',
				title: `${nextProps.batch_updated_message}`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetBatchUpdateStatus();
					this.props.history.push('/batches');
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotification(nextProps);
	}


	makeDecisionOn = candidate => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});

		this.props.openModal(ENUMERATOR, {
			candidate: candidate
		});
	}


	/**	Handle the process of rejecting candidate */
	handleRejectionCandidate = candidate => {
		this.props.rejectCandidate(candidate);
	}
	

	render() {


		let candidates = <Spinner message="Loading Batch Candidates " />


		if (this.props.candidates.length) {
			candidates = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Tradermoni ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Gender</th>
							<th>Phone No.</th>
							<th>Smile Status</th>
							<th>Trade Type</th>
							<th>State</th>
							<th>LGA</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.candidates.map(candidate => (
							
							<BatchData key={candidate.id} candidate={candidate}
									   showAction={this.state.showAction === candidate.id} 
									   showActionFor={this.showActionFor} 
									   handleRejectionCandidate={this.handleRejectionCandidate} 
									   makeDecisionOn={this.makeDecisionOn}
							/>
							
						))}
					</tbody>
				</table>
			);
		}

		return (
			<div>
				<div>
					<Header />
				</div>

				<div>
					<Breadcrumb name="Batch" />
				</div>


				<div className={styles.container}>
					<div className={styles.agentMembers}>
						<div className={styles.agent}>
							<div className={styles.image}>
								<img src={require('../../assets/images/profile_avatar.png')} />
							</div>
							<div className={styles.details}>


								<div className={styles.detail}>
									<div className={styles.agent_name}>{this.props.candidates.length ? this.props.candidates[0].agent : ''}</div>
								</div>


								<div className={styles.reason}>
									<div className={styles.name}>
										some reasons why this work well and should be given some cash.
										Most Numbers I called went through and was valid.
									</div>
								</div>

								<CustomButton onClick={this.startVerificationFor}> Pass batch </CustomButton>

								<div className={styles.stats}>
									<div className={styles.stat}>
										<div className={styles.stat_title}>Agent State</div>
										<div className={styles.stat_value}>{this.props.candidates.length ? this.props.candidates[0].state : ''}</div>
									</div>

									<div className={styles.stat}>
										<div className={styles.stat_title}>Enumerator</div>
										<div className={styles.stat_value}>Mobile Form</div>
									</div>
								</div>

							</div>
						</div>


						<div className={styles.members}>
							{ candidates }
						</div>
					</div>
				</div>

			</div>
		);

	}
}

const mapStateToProps = state => {
	return {
		batch: state.batchesReducer.batch,
		candidates: state.batchReducer.candidates,

		batch_updated_status: state.batchReducer.batch_updated_status,
		batch_updated_message: state.batchReducer.batch_updated_message,

		candidate_rejected_status: state.batchReducer.candidate_rejected_status,
		candidate_rejected_message: state.batchReducer.candidate_rejected_message,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_batch: (batchId) => dispatch(get_batch(batchId)),
		rejectCandidate: (candidate) => dispatch(reject_candidate(candidate)),

		batch_verification: (payload) => dispatch(batch_verification(payload)),
		openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),

		resetCandidateStatus: () => dispatch(reset_candidate_status()),
		resetBatchUpdateStatus: () => dispatch(reset_batch_update_status()),

		closeModal: () => dispatch(closeModal()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Batch);