import { updateObject } from '../../utils/updateObject';
import { GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL } from './index';

const getTransactionWasSuccessful = (state, action) => {
    return updateObject(state, {
        sessionStudents: action.payload.data,
        status: action.payload.status,
    });
}
const getTransactionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message
    });
}


const initialState = {
    sessionStudents: [],
    status: null,
    message: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_SESSION_WAS_SUCCESSFUL: getTransactionWasSuccessful,
        GET_SESSION_WAS_UNSUCCESSFUL: getTransactionWasUnsuccessful
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;