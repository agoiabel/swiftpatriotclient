import { updateObject } from '../../utils/updateObject';
import { EMAIL_CONFIRMED_SUCCESSFUL, EMAIL_CONFIRMED_UNSUCCESSFUL } from './index';

/**
 * Handle the process of updating the status for both success and failed
 * 
 * @param {} state 
 * @param {*} action 
 */
const reduceEmailConfirmation = (state, action) => {
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
        EMAIL_CONFIRMED_SUCCESSFUL: reduceEmailConfirmation,
        EMAIL_CONFIRMED_UNSUCCESSFUL: reduceEmailConfirmation
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}


export default reducer;