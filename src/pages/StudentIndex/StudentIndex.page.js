import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import FacilitatorData from './FacilitatorData';
import EmptyState from '../../components/EmptyState';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './StudentIndex.page.module.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import UserManagementMenu from '../../components/UserManagementMenu';
import { get_facilitators, deleteFacilitator, reset_store_facilitator_status } from '../../shared/store/Facilitator/Facilitator.action.js';

class FacilitatorIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_facilitators(5);
	}

	showActionFor = facilitator => {
		this.setState({ showAction: this.state.showAction === facilitator.id ? null : facilitator.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	edit = facilitator => {
		return this.navigateTo(`/student/edit/${facilitator.id}`);
	} 

	showNotificationFrom = async nextProps => {
		if (nextProps.delete_facilitator_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Student was deleted successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreFacilitatorStatus();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	resetPassword = facilitator => {
		this.props.history.push(`/user-password/change/${facilitator.id}`);
	}

	render() {
		let facilitators = <Spinner message="Loading Students" />

		if (this.props.get_facilitator_status === 200 && !this.props.facilitators.length) {
			facilitators = <EmptyState message="No student in database yet" />
		}

		if (this.props.get_facilitator_status === 200 && this.props.facilitators.length) {

			facilitators = (
				<table className={styles.table} id="table-to-xls">
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
					<Breadcrumb name="Student" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>
					<div className={styles.content}>
						<div className={styles.header}>
							<ReactHTMLTableToExcel
								id="test-table-xls-button"
								className={styles.addNew}
								table="table-to-xls"
								filename="tablexls"
								sheet="tablexls"
								buttonText="EXPORT"
							/>
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