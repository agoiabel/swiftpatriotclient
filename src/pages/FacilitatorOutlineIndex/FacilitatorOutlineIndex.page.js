import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import FacilitatorOutlineData from './FacilitatorOutlineData';
import styles from './FacilitatorOutlineIndex.page.module.css';
import { 
	get_facilitator_outlines, delete_facilitator_outline, reset_store_facilitator_outline_status 
} from '../../shared/store/FacilitatorOutline/FacilitatorOutline.action.js';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class FacilitatorOutlineIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_facilitator_outlines(this.props.match.params.sessionSlug);
	}

	showActionFor = facilitator_outline => {
		this.setState({ showAction: this.state.showAction === facilitator_outline.id ? null : facilitator_outline.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = async facilitator_outline => {
		let alert = await swal({
			title: `Are you sure you want to delete ${facilitator_outline.outline.name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		});

		if (alert) {
			this.props.delete({
				facilitator_outline_id: facilitator_outline.id,
			});
		}
	}

	showNotificationFrom = async nextProps => {
		if (nextProps.delete_facilitator_outline_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `FacilitatorOutline was deleted successfully`,
				allowOutsideClick: false
			});

			if (alert) {
				this.props.resetStoreFacilitatorOutlineStatus();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let facilitator_outlines = <Spinner message="Loading Outlines" />
		
		if (this.props.get_facilitator_outline_status === 200 && !this.props.facilitator_outlines.length) {
			facilitator_outlines = <EmptyState message="No facilitator outline in database yet" />
		}

		if (this.props.get_facilitator_outline_status === 200 && this.props.facilitator_outlines.length) {

			facilitator_outlines = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Outline</th>
							<th>Facilitator</th>
							<th>Date</th>
							<th>Start Time</th>
							<th>End Time</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.facilitator_outlines.map(facilitator_outline => (

							<FacilitatorOutlineData key={facilitator_outline.id} facilitator_outline={facilitator_outline}
													showAction={this.state.showAction === facilitator_outline.id}
									    			showActionFor={this.showActionFor}
													navigateTo={this.navigateTo}
													delete={() => this.delete(facilitator_outline)}
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
					<Breadcrumb name="Session Facilitator Outline" />
				</React.Fragment>

				<div className={styles.container}>
					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo(`/facilitator-outline/create/${this.props.match.params.sessionSlug}`)}> ADD FACILITATOR OUTLINE </div>
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
							{facilitator_outlines}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		facilitator_outlines: state.facilitatorOutlinesReducer.facilitator_outlines,
		get_facilitator_outline_status: state.facilitatorOutlinesReducer.get_facilitator_outline_status,
		delete_facilitator_outline_status: state.facilitatorOutlinesReducer.delete_facilitator_outline_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		delete: payload => dispatch( delete_facilitator_outline(payload) ),
		get_facilitator_outlines: payload => dispatch( get_facilitator_outlines(payload) ),
		resetStoreFacilitatorOutlineStatus: () => dispatch( reset_store_facilitator_outline_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FacilitatorOutlineIndex);