import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import FacilitatorData from './FacilitatorData';
import EmptyState from '../../components/EmptyState';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './FacilitatorIndex.page.module.css';
import UserManagementMenu from '../../components/UserManagementMenu';
import { get_facilitators, deleteFacilitator, reset_store_facilitator_status } from '../../shared/store/Facilitator/Facilitator.action.js';

class FacilitatorIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_facilitators(4);
	}

	showActionFor = facilitator => {
		this.setState({ showAction: this.state.showAction === facilitator.id ? null : facilitator.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = (facilitator, index) => {
		swal({
			title: `Are you sure you want to delete ${facilitator.firstname}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		}).then((result) => {
			if (result.value) {
				this.props.delete({
					facilitatorId: facilitator.id,
					arrayKey: index
				});
			}
		});
	}


	edit = facilitator => {
		return this.navigateTo(`/facilitator/edit/${facilitator.id}`);
	} 


	showNotificationFrom = nextProps => {
		if (nextProps.delete_facilitator_status === 200) {
			swal({
				type: 'success',
				title: `Facilitator was deleted successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreFacilitatorStatus();
				}
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	resetPassword = facilitator => {
		this.props.history.push(`/user-password/change/${facilitator.id}`);
	}

	render() {
		let facilitators = <Spinner message="Loading Facilitators" />

		if (this.props.get_facilitator_status === 200 && !this.props.facilitators.length) {
			facilitators = <EmptyState message="No facilitator in database yet" />
		}

		if (this.props.get_facilitator_status === 200 && this.props.facilitators.length) {

			facilitators = (
				<table className={styles.table}>
					<thead>
						<tr>
							<th>S/N</th>
							<th>Firstname</th>
							<th>Lastname</th>
							<th>Phone number</th>
							<th>gender</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.facilitators.map((facilitator, index) => (

							<FacilitatorData key={facilitator.id} facilitator={facilitator}
									    showAction={this.state.showAction === facilitator.id}
									    showActionFor={this.showActionFor}
										navigateTo={this.navigateTo}
										delete={() => this.delete(facilitator, index)}
										edit={() => this.edit(facilitator) }
										resetPassword={this.resetPassword}
							/>

						))}
					</tbody>
				</table>
			);

		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Facilitator" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>
					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/facilitator/create')}> ADD FACILITATOR </div>
						</div>

						<div>
							{facilitators}
						</div>
					</div>
				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		facilitators: state.facilitatorsReducer.facilitators,
		get_facilitator_status: state.facilitatorsReducer.get_facilitator_status,
		delete_facilitator_status: state.facilitatorsReducer.delete_facilitator_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		delete: payload => dispatch( deleteFacilitator(payload) ),
		get_facilitators: payload => dispatch(get_facilitators(payload)),
		resetStoreFacilitatorStatus: () => dispatch(reset_store_facilitator_status()) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorIndex);