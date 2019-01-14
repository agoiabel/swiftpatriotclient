import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import CustomButton from '../../components/CustomButton';
import styles from './FacilitatorOutlineCreate.page.module.css';
import { get_outlines } from '../../shared/store/Outline/Outline.action';
import FacilitatorOutlineForm from '../../components/Forms/FacilitatorOutlineForm';
import { get_facilitators } from '../../shared/store/Facilitator/Facilitator.action';
import { store_facilitator_outline, reset_store_facilitator_outline_status } from '../../shared/store/FacilitatorOutline/FacilitatorOutline.action.js';

class FacilitatorOutlineCreate extends React.Component {

	state = {
		submittingForm: false,
		facilitatorOutlines: []
	};

	handleSubmit = formData => {
		this.setState({
			facilitatorOutlines: [...this.state.facilitatorOutlines, formData]
		});
	}

	createFacilitatorOutline = () => {
		this.setState({
			submittingForm: true
		});

		let formData = {};

		formData['session_id'] = this.props.match.params.sessionSlug;
		formData['facilitatorOutlines'] = this.state.facilitatorOutlines;

		this.props.store_facilitator_outline(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = async nextProps => {
		if (nextProps.store_facilitator_outline_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Facilitator Outline was created successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreFacilitatorOutlineStatus();
				this.props.history.push(`/facilitator-outline/index/${this.props.match.params.sessionSlug}`);
			}
		}
	}

	componentDidMount() {
		this.props.get_outlines();
		this.props.get_facilitators(4);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	getOutlineDetails = outline_id => {
		return this.props.outlines.find(outline => {
			return outline.id == outline_id;
		});
	}

	getFacilitatorDetails = facilitator_id => {
		const facilitator = this.props.facilitators.find(facilitator => {
			return facilitator.id == facilitator_id;
		});

		return `${facilitator.firstname} ${facilitator.lastname} ${facilitator.othername}`;
	}

	removeFacilitatorOutline = facilitatorOutline => {
		let newFacilitatorOutline = [...this.state.facilitatorOutlines].filter(singleFacilitatorOutline => {
			return singleFacilitatorOutline.facilitator_id != facilitatorOutline.facilitator_id && singleFacilitatorOutline.outline_id != facilitatorOutline.outline_id;
		});

		this.setState({
			facilitatorOutlines: newFacilitatorOutline
		});
	}

	//notifier the user if they have already added the same data to the store 
	render() {

		let newFacilitatorOutline;

		if (this.state.facilitatorOutlines.length) {
			newFacilitatorOutline = (
				<div className={styles.pickedFacilitatorOutlines}>
				
					<div>
						<table className={styles.table}>
							<tbody>
								{this.state.facilitatorOutlines.map((facilitatorOutline, index) => (

									<tr key={index}>
										<td>{index}</td>
										<td>{this.getOutlineDetails(facilitatorOutline.outline_id).name}</td>
										<td>{this.getFacilitatorDetails(facilitatorOutline.facilitator_id)}</td>
										<td>{ moment(facilitatorOutline.date).format('MMMM Do YYYY') }</td>
										<td>{facilitatorOutline.time}</td>
										<td onClick={() => this.removeFacilitatorOutline(facilitatorOutline)}>
											<i className="fa fa-trash-o" aria-hidden="true"></i>
										</td>
									</tr>

								))}
							</tbody>
						</table>

						<div className={styles.submitButton}>
							<CustomButton 
								disabled={this.props.submittingForm} 
								onClick={this.createFacilitatorOutline}
								submittingForm={this.state.submittingForm}>
									CREATE
							</CustomButton>
						</div>

					</div>
				</div>
			);
		}

		return (
			<React.Fragment>
				<React.Fragment>
					<Header />
				</React.Fragment>
				
				<React.Fragment>
					<Breadcrumb name="Create New Facilitator Outline" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.allContent}>
						<div className={styles.content}>
							<div className={styles.header}>
								<div className={styles.addNew} onClick={() => this.navigateTo(`/facilitator-outline/index/${this.props.match.params.sessionSlug}`)}> ALL FACILITATORS </div>
							</div>
							<div>
								<FacilitatorOutlineForm
									onSubmit={this.handleSubmit}
									outlines={this.props.outlines}
									facilitators={this.props.facilitators}
									submittingForm={this.state.submittingForm}
								/>
							</div>
						</div>

						{ newFacilitatorOutline }

					</div>

				</div>



			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		outlines: state.outlinesReducer.outlines,
		facilitators: state.facilitatorsReducer.facilitators,
		store_facilitator_outline_message: state.facilitatorOutlinesReducer.get_facilitator_outline_message,
		store_facilitator_outline_status: state.facilitatorOutlinesReducer.store_facilitator_outline_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_outlines: () => dispatch( get_outlines() ),
		get_facilitators: payload => dispatch( get_facilitators(payload) ),
		store_facilitator_outline: payload => dispatch( store_facilitator_outline(payload) ),
		resetStoreFacilitatorOutlineStatus: () => dispatch( reset_store_facilitator_outline_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorOutlineCreate);