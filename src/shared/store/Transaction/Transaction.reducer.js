import { updateObject } from '../../../utils/updateObject';
import { GET_TRANSACTION_SUCCESSFUL, GET_TRANSACTION_UNSUCCESSFUL, UPDATE_TRANSACTION_SUCCESSFUL, UPDATE_TRANSACTION_UNSUCCESSFUL, RESET_UPDATE_TRANSACTION_STATUS } from './index';

const getTransactionWasSuccessful = (state, action) => {
    return updateObject(state, {
        transactions: action.payload.data,
        get_transaction_status: action.payload.status,
        get_transaction_message: action.payload.message
    });
}

const getTransactionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_transaction_status: action.payload.status,
        get_transaction_message: action.payload.message
    });
}


const updateTransactionWasSuccessful = (state, action) => {

    const newTransactionArray = [...state.transactions].filter(transaction => {
        return transaction.id !== action.payload.data.id
    });

    return {
        ...state,
        update_transaction_status: action.payload.status,
        transactions: newTransactionArray
    }
}

const updateTransactionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_transaction_status: action.payload.status,
        update_transaction_message: action.payload.message
    }
}

const resetUpdateTransactionStatus = (state, action) => {
    return {
        ...state,
        update_transaction_status: null,
        update_transaction_message: null
    }
}

const initialState = {
    transactions: [],
    
    get_transaction_status: null,
    get_transaction_message: null,
    
    update_transaction_status: null,
    update_transaction_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_TRANSACTION_SUCCESSFUL: getTransactionWasSuccessful,
        GET_TRANSACTION_WAS_UNSUCCESSFUL: getTransactionWasUnsuccessful,

        RESET_UPDATE_TRANSACTION_STATUS: resetUpdateTransactionStatus,

        UPDATE_TRANSACTION_SUCCESSFUL: updateTransactionWasSuccessful,
        UPDATE_TRANSACTION_UNSUCCESSFUL: updateTransactionWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;