import { get } from '../../utils/http_client.js';
import {GET_ACTIVE_FORUM_WAS_SUCCESSFUL, GET_ACTIVE_FORUM_WAS_UNSUCCESSFUL} from './index';

export const get_active_forums = () => async dispatch => {

    try {
        let response = await get('forum/index/1');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_active_forums_unsuccessful());
            }));
        }

        dispatch(get_active_forums_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_active_forums_successful = payload => {
    return {
        type: GET_ACTIVE_FORUM_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_active_forums_unsuccessful = payload => {
    return {
        type: GET_ACTIVE_FORUM_WAS_UNSUCCESSFUL,
        payload: payload
    }
}