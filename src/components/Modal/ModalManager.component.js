import React from 'react';
import {connect} from 'react-redux';
import NewForumPostModal from './NewForumPost';
import PayWithTellerModal from './PayWithTeller';
import NewForumPostCommentModal from './NewForumPostComment';
import { PayWithTeller, NewForumPost, NewForumPostComment } from './index';

const MODAL_COMPONENTS = {
    PayWithTeller: PayWithTellerModal,
    NewForumPost: NewForumPostModal,
    NewForumPostComment: NewForumPostCommentModal
}

const mapStateToProps = state => {
    return {
        currentModal: state.modalReducer
    }
}

const ModalManager = ({currentModal}) => {
    let renderedModal = null;

    if (currentModal.modalType) {
        const {modalType, modalProps} = currentModal;
        const ModalComponent = MODAL_COMPONENTS[modalType];

        renderedModal = <ModalComponent {...modalProps} />
    }

    return renderedModal;
}


export default connect(mapStateToProps)(ModalManager);