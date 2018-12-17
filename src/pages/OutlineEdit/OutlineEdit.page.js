import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './OutlineEdit.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';
import OutlineForm from '../../components/Forms/OutlineForm';
import { get_outline, get_outlines, store_outline, reset_store_outline_status, update_outline } from '../../shared/store/Outline/Outline.action.js';

class OutlineEdit extends React.Component {

	state = {
		submittingForm: false,
		outline: null,
	};

	handleSubmit = formData => {
		formData['outline_id'] = this.props.outline.id;

		this.setState({
			submittingForm: true
		});

		this.props.update_outline(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}

	showNotificationFrom = nextProps => {
		if (nextProps.update_outline_status === 200) {
			swal({
				type: 'success',
				title: `Outline was created successfully`,
				allowOutsideClick: false
			}).then((result) => {
				if (result.value) {
					this.props.resetStoreOutlineStatus();
					this.props.history.push('/outline/index');
				}
			});
		}
	}

	setInitialOutlineFrom = nextProps => {
		this.setState({
			outline: {
				name: nextProps.outline.name,
				code: nextProps.outline.code,
				description: nextProps.outline.description
			}
		});
	}

	componentDidMount() {
		this.props.get_outline(this.props.match.params.outlineSlug);
	}

	componentWillReceiveProps(nextProps) {
		this.showNotificationFrom(nextProps);		
		this.setInitialOutlineFrom(nextProps);
	}

	render() {
		let outlineFormContainer = <Spinner />

		if (this.state.outline !== null) {
			outlineFormContainer = (
				<div>
					<OutlineForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} 
								 initialValues={this.state.outline}
								 outline={this.props.outline}
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
					<Breadcrumb name="Create New Outline" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/outline/index')}> ALL OUTLINES </div>
					</div>
					{ outlineFormContainer }
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		outline: state.outlinesReducer.outline,
		store_outline_message: state.outlinesReducer.store_outline_message,
		update_outline_status: state.outlinesReducer.update_outline_status,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_outline: outlineId => dispatch( get_outline(outlineId) ),
		update_outline: payload => dispatch( update_outline(payload) ),
		resetStoreOutlineStatus: () => dispatch( reset_store_outline_status() )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlineEdit);