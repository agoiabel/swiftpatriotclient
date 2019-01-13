import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import OutlineData from './OutlineData';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import PortalMenu from '../../components/PortalMenu';
import styles from './OutlineIndex.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import EmptyState from '../../components/EmptyState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { get_outlines, deleteOutline, reset_store_outline_status } from '../../shared/store/Outline/Outline.action.js';

class OutlineIndex extends React.Component {

	state = {}

	componentDidMount() {
		this.props.get_outlines();
	}

	showActionFor = outline => {
		this.setState({ showAction: this.state.showAction === outline.id ? null : outline.id });
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	delete = async outline => {
		let alert = await swal({
			title: `Are you sure you want to delete ${outline.name}`,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Delete!'
		});

		if (alert) {
			this.props.delete({
				outlineId: outline.id			
			});
		}
	}

	edit = outline => {
		return this.navigateTo(`/outline/edit/${outline.id}`);
	} 

	showNotificationFrom = async nextProps => {
		if (nextProps.delete_outline_status === 200) {
			let alert = await swal({
				type: 'success',
				title: `Outline was deleted successfully`,
				allowOutsideClick: false
			});
		
			if (alert) {
				this.props.resetStoreOutlineStatus();
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);
	}

	render() {
		let outlines = <Spinner message="Loading Outlines" />
		
		if (this.props.get_outline_status === 200 && !this.props.outlines.length) {
			outlines = <EmptyState message="No outline in database yet" />
		}

		if (this.props.get_outline_status === 200 && this.props.outlines.length) {

			outlines = (
				<table className={styles.table} id="table-to-xls">
					<thead>
						<tr>
							<th>S/N</th>
							<th>Outline Name</th>
							<th>Outline Description</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.outlines.map(outline => (

							<OutlineData key={outline.id} outline={outline}
									    showAction={this.state.showAction === outline.id}
									    showActionFor={this.showActionFor}
										navigateTo={this.navigateTo}
										delete={() => this.delete(outline)}
										edit={() => this.edit(outline) }
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
					<Breadcrumb name="Course Outline" />
				</React.Fragment>

				<div className={styles.container}>	

					<div className={styles.sidebar}>
						<PortalMenu />
					</div>

					<div className={styles.content}>
						<div className={styles.header}>
							<div className={styles.addNew} onClick={() => this.navigateTo('/outline/create')}> ADD OUTLINE </div>
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
							{outlines}
						</div>
					</div>

				</div>

			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		outlines: state.outlinesReducer.outlines,
		get_outline_status: state.outlinesReducer.get_outline_status,
		delete_outline_status: state.outlinesReducer.delete_outline_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_outlines: () => dispatch( get_outlines() ),
		delete: payload => dispatch( deleteOutline(payload) ),
		resetStoreOutlineStatus: () => dispatch(reset_store_outline_status()) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlineIndex);