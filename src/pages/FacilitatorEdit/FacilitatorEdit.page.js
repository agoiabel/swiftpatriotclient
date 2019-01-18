import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import Breadcrumb from '../../components/Breadcrumb';
import styles from './FacilitatorEdit.page.module.css';
import UserManagementMenu from '../../components/UserManagementMenu';
import FacilitatorForm from '../../components/Forms/FacilitatorForm';
import { get_facilitator, reset_store_facilitator_status, update_facilitator } from '../../shared/store/Facilitator/Facilitator.action.js';

class FacilitatorEdit extends React.Component {

	state = {
		submittingForm: false,
		facilitator: null,
	};

	handleSubmit = formData => {
		formData['facilitator_id'] = this.props.facilitator.id;
		formData['role_id'] = 4;

		this.setState({
			submittingForm: true
		});

		this.props.update_facilitator(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = async nextProps => {
		if (nextProps.update_facilitator_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Facilitator was updated successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreFacilitatorStatus();
				this.props.history.push('/facilitator/index');
			}
		}
	}

	setInitialFacilitatorFrom = nextProps => {
		this.setState({
			facilitator: {
				email: nextProps.facilitator.email,
				gender: nextProps.facilitator.gender,
				lastname: nextProps.facilitator.lastname,
				firstname: nextProps.facilitator.firstname,
				status: nextProps.facilitator.status,
				twitter: nextProps.facilitator.twitter,
				facebook: nextProps.facilitator.facebook,
				instagram: nextProps.facilitator.instagram,
				phone_number: parseInt(nextProps.facilitator.phone_number),
			}
		});
	}

	componentDidMount() {
		this.props.get_facilitator(this.props.match.params.facilitatorSlug);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialFacilitatorFrom(nextProps);
	}

	render() {
		let facilitatorFormContainer = <Spinner />

		if (this.state.facilitator !== null) {
			facilitatorFormContainer = (
				<div>
					<FacilitatorForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								 	 initialValues={this.state.facilitator}
									 facilitator={this.props.facilitator}
									 submitText="UPDATE"
					/>
				</div>
			);
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Edit Facilitator" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<UserManagementMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/facilitator/index')}> ALL FACILITATORS </div>
						</div>
						{facilitatorFormContainer}
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		facilitator: state.facilitatorsReducer.facilitator,
		store_facilitator_message: state.facilitatorsReducer.store_facilitator_message,
		update_facilitator_status: state.facilitatorsReducer.update_facilitator_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_facilitator: facilitatorId => dispatch( get_facilitator(facilitatorId) ),
		update_facilitator: payload => dispatch( update_facilitator(payload) ),
		resetStoreFacilitatorStatus: () => dispatch( reset_store_facilitator_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorEdit);