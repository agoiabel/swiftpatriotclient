import { updateObject } from '../../utils/updateObject';
import { REGISTRATION_SUCCESSFUL, REGISTRATION_UNSUCCESSFUL } from './index';


const registrationWasSuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
        role_id: action.payload.data.role_id,
        account_type: action.payload.data.account_type
    });
}


const registrationWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}


const initialState = {
    user: null,
    status: null,
    message: null,
    role_id: null,
    account_type: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        REGISTRATION_SUCCESSFUL: registrationWasSuccessFul,
        REGISTRATION_UNSUCCESSFUL: registrationWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;