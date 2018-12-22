import { updateObject } from '../../utils/updateObject';
import { RESET_PASSWORD_SUCCESSFUL, RESET_PASSWORD_UNSUCCESSFUL } from './index';

/**
 * Handle the process of updating the status for both success and failed
 * 
 * @param {} state 
 * @param {*} action 
 */
const reducePassword = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message
    });
}


/**
 * Set the initial state
 */
const initialState = {
    status: null,
    message: null
};


const reducer = (state = initialState, action) => {

    const lookup = {
        RESET_PASSWORD_SUCCESSFUL: reducePassword,
        RESET_PASSWORD_UNSUCCESSFUL: reducePassword
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;