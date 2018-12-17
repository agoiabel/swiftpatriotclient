import { updateObject } from '../../utils/updateObject';
import { FORGOT_PASSWORD_SUCCESSFUL, FORGOT_PASSWORD_UNSUCCESSFUL } from './index';


const forgotPasswordWasSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message
    });
}


const forgotPasswordWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}


const initialState = {
    status: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        FORGOT_PASSWORD_SUCCESSFUL: forgotPasswordWasSuccessFul,
        FORGOT_PASSWORD_UNSUCCESSFUL: forgotPasswordWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;