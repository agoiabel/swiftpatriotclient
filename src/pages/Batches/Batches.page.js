import React from 'react';
import swal from 'sweetalert2';
import BatchData from './BatchData';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './Batches.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import { get_batches, store_batch } from './Batches.page.action';
import { batch_verification, reset_batch_update_status } from '../Batch/Batch.page.action';


class Batches extends React.Component {

	state = {}

	navigateTo = batch => {
		// this.props.store_batch(batch);
		// this.props.history.push(`/batch/${batch.id}`);
	}

	componentDidMount() {
		this.props.get_batches();
	}

	showNotification = nextProps => {
		if (nextProps.batch_updated_status === 200) {
			swal({
				type: 'success',
				title: `${nextProps.batch_updated_message}`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetBatchUpdateStatus();
					// this.props.history.push('/batches');
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotification(nextProps);
	}


	showActionFor = batch => {
		this.setState({ showAction: this.state.showAction === batch.id ? null : batch.id });
	}


	startVerificationFor = batch => {
		swal({
			title: `Are you sure you want to pass ${batch.batch_name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Clean!'
		}).then((result) => {
			if (result.value) {
				this.props.batch_verification({
					batchId: batch.id,
					status: 'Whitelisted',
					comment: 'Batch is clean, nice job done'
				});
				// this.props.history.push('/batches');
			}
		});
	}

	render() {

		//I have to deal with error while loading a batch, meaning status is null
		//I have to deal with batch status = 200
		//I have to deal with empty batches
		//I have to deal with non empty batches

		let batches = <Spinner message="Loading Batches" />


		if (this.props.batches.length) {

			batches = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>BAtch ID</th>
							<th>Created</th>
							<th>Processed</th>
							<th>Batch Size</th>
							<th>Verified Status</th>
							<th>Admin Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.batches.map(batch => (

							<BatchData key={batch.id} batch={batch} 
									   showAction={this.state.showAction === batch.id} 
									   showActionFor={this.showActionFor} 
									   navigateTo={this.navigateTo} 
									   startVerificationFor={this.startVerificationFor}
							/>

						))};
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
					<Breadcrumb name="Batches" />
				</div>

				<div className={styles.container}>
					{batches}
				</div>
			</div>
		);

	}
}


const mapStateToProps = state => {
	return {
		status: state.batchesReducer.status,
		batches: state.batchesReducer.batches,

		batch_updated_status: state.batchReducer.batch_updated_status,
		batch_updated_message: state.batchReducer.batch_updated_message,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_batches: () => dispatch(get_batches()),
		store_batch: batch => dispatch(store_batch(batch)),
		batch_verification: (payload) => dispatch(batch_verification(payload)),
		resetBatchUpdateStatus: () => dispatch(reset_batch_update_status()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Batches);