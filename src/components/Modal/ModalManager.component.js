import React from 'react';
import {connect} from 'react-redux';
import { PayWithTeller } from './index';
import PayWithTellerModal from './PayWithTeller';

const MODAL_COMPONENTS = {
    PayWithTeller: PayWithTellerModal 
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