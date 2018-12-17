import { SHOW_MODAL, HIDE_MODAL } from './index';

export const openModal = (modalType, modalProps) => {

    return {
        type: SHOW_MODAL,
        payload: {
            modalType,
            modalProps
        }
    }
}

export const closeModal = () => {
    return {
        type: HIDE_MODAL
    }
}