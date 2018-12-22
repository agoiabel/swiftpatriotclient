import { getStorage } from '../../utils/storage';
import { updateObject } from '../../utils/updateObject';
import { AUTH_SUCCESSFUL, AUTH_UNSUCCESSFUL } from './index';


const authWasSuccessFul = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        status: action.payload.status,
        message: action.payload.message,
        role_id: action.payload.data.role_id,
        account_type: action.payload.data.account_type,
        email_confirmed: action.payload.data.email_confirmed
    });
}


const authWasUnSuccessFul = (state, action) => {
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
    account_type: null,
    email_confirmed: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        AUTH_SUCCESSFUL: authWasSuccessFul,
        AUTH_UNSUCCESSFUL: authWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;