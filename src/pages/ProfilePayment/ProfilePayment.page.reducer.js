import { updateObject } from '../../utils/updateObject';
import { GET_TRANSACTION_WAS_SUCCESSFUL, GET_TRANSACTION_WAS_UNSUCCESSFUL } from './index';

const getTransactionWasSuccessful = (state, action) => {
    return updateObject(state, {
        transactions: action.payload.data,
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
    transactions: [],
    status: null,
    message: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_TRANSACTION_WAS_SUCCESSFUL: getTransactionWasSuccessful,
        GET_TRANSACTION_WAS_UNSUCCESSFUL: getTransactionWasUnsuccessful
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;