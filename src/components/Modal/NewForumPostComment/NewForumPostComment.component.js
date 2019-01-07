import React from 'react';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { closeModal } from '../Modal.action';
import styles from './NewForumPostComment.component.module.css';
import NewForumPostCommentForm from '../../Forms/NewForumPostCommentForm';
import { store_forum_post } from './NewForumPostComment.component.action.js';

class NewForumPostComment extends React.Component {

    state = {
        submittingForm: false
    }

    handleSubmit = formData => {
        formData['forum_id'] = this.props.forumId;

        this.setState({
            submittingForm: true
        });

        this.props.store_forum_post(formData);
    }

    showNotification = nextProps => {
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
            text: `Comment was created successfully, admin will verify it before it will be published`,
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

                        <NewForumPostCommentForm onSubmit={this.handleSubmit} submittingForm={this.state.submittingForm} />
                    </div>

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        status: state.newForumPostCommentReducer.status,
        message: state.newForumPostCommentReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        store_forum_post: payload => dispatch( store_forum_post(payload) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForumPostComment);