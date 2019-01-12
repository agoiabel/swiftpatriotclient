import { updateObject } from '../../utils/updateObject';
import {
    GET_USER_SUCCESSFUL, GET_USER_UNSUCCESSFUL, UPDATE_STUDENT_SUCCESSFUL, UPDATE_STUDENT_UNSUCCESSFUL, RESET
} from './index';

const getUserWasSuccessful = (state, action) => {
    return updateObject(state, {
        student: action.payload.data,
        get_user_status: action.payload.status,
    });
}

const getUserWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_user_status: action.payload.status,
    });
}

const updateUser = (state, action) => {
    return {
        ...state,
        update_student_status: action.payload.status,
    }
}


const reset = (state, action) => {
    return {
        ...state,
        update_student_status: null,
    }
}


const initialState = {
    student: null,

    get_user_status: null,
    update_student_status: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_USER_SUCCESSFUL: getUserWasSuccessful,
        GET_USER_UNSUCCESSFUL: getUserWasUnsuccessful,

        UPDATE_STUDENT_SUCCESSFUL: updateUser,
        UPDATE_STUDENT_UNSUCCESSFUL: updateUser,

        RESET: reset,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;