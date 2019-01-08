import { get, post } from '../../utils/http_client.js';
import {
    GET_FORUM_SUCCESSFUL, GET_FORUM_UNSUCCESSFUL,
    UPDATE_FORUM_SUCCESSFUL, UPDATE_FORUM_UNSUCCESSFUL, RESET_UPDATE_FORUM_STATUS
} from './index';



export const get_forum_for = payload => async dispatch => {

    try {
        let response = await get(`forum/index/${payload.status}`);

        response = await response.json();

        console.dir(response);

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_forum_for_unsuccessful(response));
            }));
        }
        dispatch(get_forum_for_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_forum_for_successful = payload => {
    return {
        type: GET_FORUM_SUCCESSFUL,
        payload: payload
    };
}
export const get_forum_for_unsuccessful = payload => {
    return {
        type: GET_FORUM_UNSUCCESSFUL,
        payload: payload
    }
}



export const update_forum = payload => async dispatch => {

    try {
        let response = await post(payload, 'forum/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_forum_unsuccessful(response));
            }));
        }
        dispatch(update_forum_successful(response));
    } catch (error) {
        console.dir(error);
    }

};

export const update_forum_successful = payload => {
    return {
        type: UPDATE_FORUM_SUCCESSFUL,
        payload: payload
    };
}
export const update_forum_unsuccessful = payload => {
    return {
        type: UPDATE_FORUM_UNSUCCESSFUL,
        payload: payload
    }
}




export const reset_update_forum_status = () => {
    return {
        type: RESET_UPDATE_FORUM_STATUS
    }
}