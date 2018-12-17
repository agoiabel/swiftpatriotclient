import React from 'react';
import {connect} from 'react-redux';
import { ENUMERATOR } from './index';
import Enumerator from './Enumerator';

const MODAL_COMPONENTS = {
    ENUMERATOR: Enumerator 
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