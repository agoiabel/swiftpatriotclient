import React from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './NewForumPost.component.module.css';
import NewForumPostForm from '../../Forms/NewForumPostForm';
import { store_forum_post, reset_forum_post_status } from './NewForumPost.component.action.js';

class PayWithTeller extends React.Component {

    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        this.setState({
            submittingForm: true
        });

        this.props.store_forum_post(formData);
    }

    showNotification = async nextProps => {
        this.setState({
            submittingForm: false
        });

        if (nextProps.status !== 200) {
            return swal({
                title: 'Error!',
                text: `${nextProps.message}`,
                type: 'error',
                timer: 2500,
                showConfirmButton: true
            });
        }
        this.props.closeModal();
        return swal({
            title: 'success!',
            text: `Forum was created successfully, admin will verify it before it will be published`,
            type: 'success',
            timer: 2500,
            showConfirmButton: true
        });
    }

    componentWillReceiveProps(nextProps) {
        this.showNotification(nextProps);
    }

    render() {

        return (
            <div className={styles.modal}>
                <div className={styles.body}>

                    <div>
                        <div className={styles.action}>
                            <div className={styles.goBack} onClick={this.props.closeModal}>
                                <i className="fa fa-close" aria-hidden="true"></i>  Close
                            </div>
                        </div>

                        <NewForumPostForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
                    </div>

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        status: state.newForumPostReducer.status,
        message: state.newForumPostReducer.message,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        store_forum_post: payload => dispatch( store_forum_post(payload) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayWithTeller);