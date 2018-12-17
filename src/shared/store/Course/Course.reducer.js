import { updateObject } from '../../../utils/updateObject';
import { STORE_COURSE, GET_COURSES_SUCCESSFUL, GET_COURSES_UNSUCCESSFUL, STORE_COURSE_WAS_SUCCESSFUL, STORE_COURSE_WAS_UNSUCCESSFUL, GET_COURSE } from './index';

const getCoursesSuccessful = (state, action) => {
    return updateObject(state, {
        courses: action.payload.data,
        get_course_status: action.payload.status,
        get_course_message: action.payload.message
    });
}

const getCoursesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_course_status: action.payload.status,
        get_course_message: action.payload.message,
    });
}

const storeCourseWasSuccessful = (state, action) => {
    return {
        ...state,
        store_course_status: action.payload.status,
        courses: [...state.courses, action.payload.data]
    }
}

const storeCourseWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_course_status: action.payload.status,
        store_course_message: action.payload.message
    }
}


const updateCourseWasSuccessful = (state, action) => {
    const newCourseArray = [...state.courses].filter(course => {
        return course.id !== action.payload.data.id
    });
    const updatedCourseArray = [...newCourseArray, action.payload.data];

    return {
        ...state,
        update_course_status: action.payload.status,
        courses: updatedCourseArray
    }
}

const updateCourseWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_course_status: action.payload.status,
        update_course_message: action.payload.message
    }
}



const resetStoreCourseStatus = (state, action) => {
    return {
        ...state,
        // get_course_status: null,
        get_course_message: null,

        store_course_status: null,
        store_course_message: null,

        delete_course_status: null,
        delete_course_message: null, 

        update_course_status: null,
        update_course_message: null,
    }
}

const deleteCourseWasSuccessful = (state, action) => {
    const oldCourseArray = [...state.courses];

    const newCourseArray = oldCourseArray.filter(course => {
        return course.id !== action.payload.courseId
    });

    return {
        ...state,
        courses: newCourseArray,
        delete_course_status: 200
    }
}

const deleteCourseWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const getCourse = (state, action) => {
    const course = [...state.courses].find(course => {
        return course.id == action.payload;
    });

    return {
        ...state,
        course: course
    }
}

const initialState = {
    courses: [],
    course: null,
    
    get_course_status: null,
    get_course_message: null,
    
    store_course_status: null,
    store_course_message: null,

    delete_course_status: null,
    delete_course_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_COURSE: getCourse,
        GET_COURSES_SUCCESSFUL: getCoursesSuccessful,
        GET_COURSES_UNSUCCESSFUL: getCoursesUnsuccessful,
        RESET_STORE_COURSE_STATUS: resetStoreCourseStatus,

        STORE_COURSE_WAS_SUCCESSFUL: storeCourseWasSuccessful,
        STORE_COURSE_WAS_UNSUCCESSFUL: storeCourseWasUnsuccessful,

        DELETE_COURSE_WAS_SUCCESSFUL: deleteCourseWasSuccessful,
        DELETE_COURSE_WAS_UNSUCCESSFUL: deleteCourseWasUnsuccessful,

        UPDATE_COURSE_WAS_SUCCESSFUL: updateCourseWasSuccessful,
        UPDATE_COURSE_WAS_UNSUCCESSFUL: updateCourseWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;