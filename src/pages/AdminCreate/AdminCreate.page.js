import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';

import styles from './AdminCreate.page.module.css';
import FacilitatorForm from '../../components/Forms/FacilitatorForm';
import UserManagementMenu from '../../components/UserManagementMenu';
import { store_facilitator, reset_store_facilitator_status } from '../../shared/store/Facilitator/Facilitator.action.js';

class FacilitatorCreate extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});
		formData['role_id'] = 2;

		this.props.store_facilitator(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = nextProps => {
		if (nextProps.store_facilitator_status === 200) {
			swal({
				type: 'success',
				title: `Facilitator was created successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreFacilitatorStatus();
					this.props.history.push('/admin/index');
				}
			});
		}
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Create New Admin" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/admin/index')}> ALL ADMIN </div>
						</div>
						<div>
							<FacilitatorForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} submitText="CREATE" />
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		store_facilitator_message: state.facilitatorsReducer.message,
		store_facilitator_status: state.facilitatorsReducer.store_facilitator_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		store_facilitator: payload => dispatch( store_facilitator(payload) ),
		resetStoreFacilitatorStatus: () => dispatch( reset_store_facilitator_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorCreate);