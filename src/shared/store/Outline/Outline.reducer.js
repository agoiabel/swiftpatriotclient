import { updateObject } from '../../../utils/updateObject';
import { STORE_OUTLINE, GET_OUTLINES_SUCCESSFUL, GET_OUTLINES_UNSUCCESSFUL, STORE_OUTLINE_WAS_SUCCESSFUL, STORE_OUTLINE_WAS_UNSUCCESSFUL, GET_OUTLINE } from './index';

const getOutlinesSuccessful = (state, action) => {
    return updateObject(state, {
        outlines: action.payload.data,
        get_outline_status: action.payload.status,
        get_outline_message: action.payload.message
    });
}

const getOutlinesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_outline_status: action.payload.status,
        get_outline_message: action.payload.message,
    });
}

const storeOutlineWasSuccessful = (state, action) => {
    return {
        ...state,
        store_outline_status: action.payload.status,
        outlines: [...state.outlines, action.payload.data]
    }
}

const storeOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_outline_status: action.payload.status,
        store_outline_message: action.payload.message
    }
}


const updateOutlineWasSuccessful = (state, action) => {
    const newOutlineArray = [...state.outlines].filter(outline => {
        return outline.id !== action.payload.data.id
    });
    const updatedOutlineArray = [...newOutlineArray, action.payload.data];

    return {
        ...state,
        update_outline_status: action.payload.status,
        outlines: updatedOutlineArray
    }
}

const updateOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_outline_status: action.payload.status,
        update_outline_message: action.payload.message
    }
}


const resetStoreOutlineStatus = (state, action) => {
    return {
        ...state,
        // get_outline_status: null,
        get_outline_message: null,

        store_outline_status: null,
        store_outline_message: null,

        delete_outline_status: null,
        delete_outline_message: null, 

        update_outline_status: null,
        update_outline_message: null,
    }
}

const deleteOutlineWasSuccessful = (state, action) => {
    const oldOutlineArray = [...state.outlines];

    const newOutlineArray = oldOutlineArray.filter(outline => {
        return outline.id !== action.payload.outlineId
    });

    return {
        ...state,
        outlines: newOutlineArray,
        delete_outline_status: 200
    }
}

const deleteOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const getOutline = (state, action) => {
    const outline = [...state.outlines].find(outline => {
        return outline.id == action.payload;
    });

    return {
        ...state,
        outline: outline
    }
}

const initialState = {
    outlines: [],
    outline: null,
    
    get_outline_status: null,
    get_outline_message: null,
    
    store_outline_status: null,
    store_outline_message: null,

    delete_outline_status: null,
    delete_outline_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_OUTLINE: getOutline,
        GET_OUTLINES_SUCCESSFUL: getOutlinesSuccessful,
        GET_OUTLINES_UNSUCCESSFUL: getOutlinesUnsuccessful,
        RESET_STORE_OUTLINE_STATUS: resetStoreOutlineStatus,

        STORE_OUTLINE_WAS_SUCCESSFUL: storeOutlineWasSuccessful,
        STORE_OUTLINE_WAS_UNSUCCESSFUL: storeOutlineWasUnsuccessful,

        DELETE_OUTLINE_WAS_SUCCESSFUL: deleteOutlineWasSuccessful,
        DELETE_OUTLINE_WAS_UNSUCCESSFUL: deleteOutlineWasUnsuccessful,

        UPDATE_OUTLINE_WAS_SUCCESSFUL: updateOutlineWasSuccessful,
        UPDATE_OUTLINE_WAS_UNSUCCESSFUL: updateOutlineWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;