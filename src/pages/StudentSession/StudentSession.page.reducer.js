import { updateObject } from '../../utils/updateObject';
import { 
    GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL, GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL, 
    GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL, 
    GET_SESSION_NUMBER_WAS_SUCCESSFUL, GET_SESSION_NUMBER_WAS_UNSUCCESSFUL,
    CONFIRM_TRANSACTION_WAS_SUCCESSFUL, CONFIRM_TRANSACTION_WAS_UNSUCCESSFUL
} from './index';

const getActiveAndFutureSessionsSuccessful = (state, action) => {
    return updateObject(state, {
        sessions: action.payload.data,
        get_active_and_future_session_status: action.payload.status,
    });
}

const getActiveAndFutureSessionsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_active_and_future_session_status: action.payload.status,
        get_active_and_future_session_message: action.payload.message,
    });
}


const getSessionWasSuccessful = (state, action) => {
    return updateObject(state, {
        session: action.payload.data.session,
        get_session_status: action.payload.status,
        transaction: action.payload.data.transaction,
        done_all_prerequisite: action.payload.data.done_all_prerequisite
    });
}

const getSessionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_session_status: action.payload.status,
        get_session_message: action.payload.message,
        done_all_prerequisite: action.payload.data.done_all_prerequisite
    });
}

const getSessionNumberWasSuccessful = (state, action) => {
    return updateObject(state, {
        session_student: action.payload.data,
        get_session_number_status: action.payload.status,
    });
}

const getSessionNumberWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_session_number_status: action.payload.status,
        get_session_number_message: action.payload.message,
    });
}

const confirmTransactionWasSuccessful = (state, action) => {
    return updateObject(state, {
        transaction: action.payload.data,
        online_payment_transaction_status: action.payload.status
    });
}

const resetOnlinePaymentTransaction = (state, action) => {
    return updateObject(state, {
        online_payment_transaction_status: null
    });
}

const initialState = {
    // sessions: [],

    session: null,
    transaction: null,

    get_session_status: null,
    get_session_message: null,

    session_number: null,
    session_number_status: null,

    done_all_prerequisite: null,

    get_active_and_future_session_status: null,
    get_active_and_future_session_message: null,

    session_student: null,
    get_session_number_status: null,

    online_payment_transaction: null,
    online_payment_transaction_status: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL: getActiveAndFutureSessionsSuccessful,
        GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL: getActiveAndFutureSessionsUnsuccessful,

        GET_SESSION_WAS_SUCCESSFUL: getSessionWasSuccessful,
        GET_SESSION_WAS_UNSUCCESSFUL: getSessionWasUnsuccessful,

        GET_SESSION_NUMBER_WAS_SUCCESSFUL: getSessionNumberWasSuccessful,
        GET_SESSION_NUMBER_WAS_UNSUCCESSFUL: getSessionNumberWasUnsuccessful,

        CONFIRM_TRANSACTION_WAS_SUCCESSFUL: confirmTransactionWasSuccessful, 
        CONFIRM_TRANSACTION_WAS_UNSUCCESSFUL: confirmTransactionWasSuccessful,

        RESET_ONLINE_PAYMENT_TRANSACTION: resetOnlinePaymentTransaction
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;
