import { updateObject } from '../../utils/updateObject';
import { GET_USER_MESSAGES_WAS_SUCCESSFUL, GET_USER_MESSAGES_WAS_UNSUCCESSFUL, SEND_MESSAGE_WAS_SUCCESSFUL, SEND_MESSAGE_WAS_UNSUCCESSFUL } from './index';


const getMessageWasSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        messages: action.payload.data,
    });
}

const getMessageWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
    });
}

const sendMessageWasSuccessful = (state, action) => {
    return {
        ...state,
        messages: [...state.messages, action.payload.data]
    }
}

const sendMessageWasUnsuccessful = (state, action) => {
    return {
        ...state,
        // messages: [...state.messages, action.payload.data]
    }
}

const initialState = {
    status: null,
    messages: [],
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_USER_MESSAGES_WAS_SUCCESSFUL: getMessageWasSuccessful,
        GET_USER_MESSAGES_WAS_UNSUCCESSFUL: getMessageWasUnsuccessful,

        SEND_MESSAGE_WAS_SUCCESSFUL: sendMessageWasSuccessful,
        SEND_MESSAGE_WAS_UNSUCCESSFUL: sendMessageWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;