import { updateObject } from '../../utils/updateObject';
import { REGISTER_PROFILE_SUCCESSFUL, REGISTER_PROFILE_UNSUCCESSFUL } from './index';


const registerProfileWasSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        role_id: action.payload.data.role_id
    });
}


const registerProfileWasUnSuccessFul = (state, action) => {
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
        REGISTER_PROFILE_SUCCESSFUL: registerProfileWasSuccessFul,
        REGISTER_PROFILE_UNSUCCESSFUL: registerProfileWasUnSuccessFul
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;