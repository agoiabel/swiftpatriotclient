import { updateObject } from '../../utils/updateObject';
import {
    GET_SESSION_STUDENT_SUCCESSFUL, GET_SESSION_STUDENT_UNSUCCESSFUL,
} from './index';

const getSessionStudentWasSuccessful = (state, action) => {
    return updateObject(state, {
        sessionStudents: action.payload.data,
        get_sessionStudent_status: action.payload.status,
    });
}

const getSessionStudentWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_sessionStudent_status: action.payload.status,
    });
}


const resetUpdateTransactionStatus = (state, action) => {
    return {
        ...state,
        // get_session_student_status: null,
    }
}

const initialState = {
    sessionStudents: [],
    get_sessionStudent_status: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_SESSION_STUDENT_SUCCESSFUL: getSessionStudentWasSuccessful,
        GET_SESSION_STUDENT_UNSUCCESSFUL: getSessionStudentWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;