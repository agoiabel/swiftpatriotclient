import { get, post } from '../../../utils/http_client.js';
import { 
    GET_COURSES_SUCCESSFUL, GET_COURSES_UNSUCCESSFUL, RESET_STORE_COURSE_STATUS, 
    STORE_COURSE_WAS_SUCCESSFUL, STORE_COURSE_WAS_UNSUCCESSFUL, DELETE_COURSE_WAS_SUCCESSFUL, 
    DELETE_COURSE_WAS_UNSUCCESSFUL, GET_COURSE, UPDATE_COURSE_WAS_SUCCESSFUL, UPDATE_COURSE_WAS_UNSUCCESSFUL
} from './index';

export const get_courses = () => async dispatch => {

    try {
        let response = await get('course/index');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_courses_unsuccessful());
            }));
        }

        dispatch(get_courses_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_courses_successful = payload => {
    return {
        type: GET_COURSES_SUCCESSFUL,
        payload: payload
    };
}
export const get_courses_unsuccessful = payload => {
    return {
        type: GET_COURSES_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_course = payload => async dispatch => {
    try {


        let response = await post(payload, 'course/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_course_was_unsuccessful());
            }));
        }

        dispatch(store_course_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_course_was_successful = payload => {
    return {
        type: STORE_COURSE_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_course_was_unsuccessful = payload => {
    return {
        type: STORE_COURSE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_course_status = () => {
    return {
        type: RESET_STORE_COURSE_STATUS
    }
}


export const deleteCourse = payload => async dispatch => {
    try {

        let response = await get(`course/delete/${payload.courseId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_course_was_unsuccessful());
            }));
        }

        dispatch(delete_course_was_successful({
            courseId: payload.courseId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_course_was_successful = payload => {
    return {
        type: DELETE_COURSE_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_course_was_unsuccessful = payload => {
    return {
        type: DELETE_COURSE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_course = payload => {
    return {
        type: GET_COURSE,
        payload: payload
    }
}


export const update_course = payload => async dispatch => {
    try {

        let response = await post(payload, 'course/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_course_was_unsuccessful());
            }));
        }

        dispatch(update_course_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_course_was_successful = payload => {
    return {
        type: UPDATE_COURSE_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const update_course_was_unsuccessful = payload => {
    return {
        type: UPDATE_COURSE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}