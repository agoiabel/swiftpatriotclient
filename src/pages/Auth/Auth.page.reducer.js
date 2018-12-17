import { updateObject } from '../../utils/updateObject';
import { AUTH_SUCCESSFUL, AUTH_UNSUCCESSFUL } from './index';


const authWasSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        role_id: action.payload.data.role_id,
        user: action.payload.data
    });
}


const authWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}


const initialState = {
    status: null,
    user: null,
    message: null,
    role_id: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        AUTH_SUCCESSFUL: authWasSuccessFul,
        AUTH_UNSUCCESSFUL: authWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;