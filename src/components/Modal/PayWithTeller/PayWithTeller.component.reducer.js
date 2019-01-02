import { updateObject } from '../../../utils/updateObject.js';
import { PAY_WITH_TELLER_WAS_SUCCESSFUL, PAY_WITH_TELLER_WAS_UNSUCCESSFUL } from './index';



const payWithTellerWasSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        transaction: action.payload.data
    });
}


const payWithTellerWasUnSuccessFul = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const resetTransactionStatus = (state, action) => {
    return updateObject(state, {
        status: null,
    });
}

const initialState = {
    status: null,
    message: null,
    transaction: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        PAY_WITH_TELLER_WAS_SUCCESSFUL: payWithTellerWasSuccessFul,
        PAY_WITH_TELLER_WAS_UNSUCCESSFUL: payWithTellerWasUnSuccessFul,
        RESET_TRANSACTION_STATUS: resetTransactionStatus
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;