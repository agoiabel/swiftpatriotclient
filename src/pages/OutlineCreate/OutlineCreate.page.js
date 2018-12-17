import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from './OutlineCreate.page.module.css';
import Breadcrumb from '../../components/Breadcrumb';

import OutlineForm from '../../components/Forms/OutlineForm';
import { get_outlines, store_outline, reset_store_outline_status } from '../../shared/store/Outline/Outline.action.js';

class OutlineCreate extends React.Component {

	state = {
		submittingForm: false
	};

	handleSubmit = formData => {
		this.setState({
			submittingForm: true
		});

		this.props.store_outline(formData);
	}

	navigateTo = page => {
		this.props.history.push(page);
	}


	showNotificationFrom = nextProps => {
		if (nextProps.store_outline_status === 200) {
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
					<Breadcrumb name="Create New Outline" />
				</React.Fragment>

				<div className={styles.container}>	
					<div className={styles.header}>
						<div className={styles.addNew} onClick={() => this.navigateTo('/outline/index')}> ALL OUTLINE </div>
					</div>
					<div>
						<OutlineForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		store_outline_message: state.outlinesReducer.message,
		store_outline_status: state.outlinesReducer.store_outline_status
	}
}

const mapDispatchToProps = dispatch => {
	return {
		store_outline: payload => dispatch( store_outline(payload) ),
		resetStoreOutlineStatus: () => dispatch( reset_store_outline_status() ) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(OutlineCreate);