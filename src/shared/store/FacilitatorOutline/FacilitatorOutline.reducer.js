import { updateObject } from '../../../utils/updateObject';
import { STORE_FACILITATOR_OUTLINE, GET_FACILITATOR_OUTLINES_SUCCESSFUL, GET_FACILITATOR_OUTLINES_UNSUCCESSFUL, STORE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL, STORE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL, GET_FACILITATOR_OUTLINE } from './index';

const getFacilitatorOutlinesSuccessful = (state, action) => {
    return updateObject(state, {
        facilitator_outlines: action.payload.data,
        get_facilitator_outline_status: action.payload.status,
        get_facilitator_outline_message: action.payload.message
    });
}

const getFacilitatorOutlinesUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_facilitator_outline_status: action.payload.status,
        get_facilitator_outline_message: action.payload.message,
    });
}

const storeFacilitatorOutlineWasSuccessful = (state, action) => {
    return {
        ...state,
        store_facilitator_outline_status: action.payload.status,
        // facilitator_outlines: [...state.facilitator_outlines, action.payload.data]
    }
}

const storeFacilitatorOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_facilitator_outline_status: action.payload.status,
        store_facilitator_outline_message: action.payload.message
    }
}


const updateFacilitatorOutlineWasSuccessful = (state, action) => {
    const newFacilitatorOutlineArray = [...state.facilitator_outlines].filter(facilitator_outline => {
        return facilitator_outline.id !== action.payload.data.id
    });
    const updatedFacilitatorOutlineArray = [...newFacilitatorOutlineArray, action.payload.data];

    return {
        ...state,
        update_outline_status: action.payload.status,
        outlines: updatedFacilitatorOutlineArray
    }
}

const updateFacilitatorOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_facilitator_outline_status: action.payload.status,
        update_facilitator_outline_message: action.payload.message
    }
}


const resetStoreFacilitatorOutlineStatus = (state, action) => {
    return {
        ...state,
        // get_outline_status: null,
        get_facilitator_outline_message: null,

        store_facilitator_outline_status: null,
        store_facilitator_outline_message: null,

        delete_facilitator_outline_status: null,
        delete_facilitator_outline_message: null, 

        update_facilitator_outline_status: null,
        update_facilitator_outline_message: null,
    }
}

const deleteFacilitatorOutlineWasSuccessful = (state, action) => {
    const oldFacilitatorOutlineArray = [...state.facilitator_outlines];

    const newFacilitatorOutlineArray = oldFacilitatorOutlineArray.filter(facilitator_outline => {
        return facilitator_outline.id !== action.payload.facilitator_outlineId
    });

    return {
        ...state,
        facilitator_outlines: newFacilitatorOutlineArray,
        delete_facilitator_outline_status: 200
    }
}

const deleteFacilitatorOutlineWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const getFacilitatorOutline = (state, action) => {
    const facilitator_outline = [...state.facilitator_outlines].find(facilitator_outline => {
        return facilitator_outline.id == action.payload;
    });

    return {
        ...state,
        facilitator_outline: facilitator_outline
    }
}

const initialState = {
    facilitator_outlines: [],
    facilitator_outline: null,
    
    get_facilitator_outline_status: null,
    get_facilitator_outline_message: null,
    
    store_facilitator_outline_status: null,
    store_facilitator_outline_message: null,

    delete_facilitator_outline_status: null,
    delete_facilitator_outline_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_FACILITATOR_OUTLINE: getFacilitatorOutline,
        GET_FACILITATOR_OUTLINES_SUCCESSFUL: getFacilitatorOutlinesSuccessful,
        GET_FACILITATOR_OUTLINES_UNSUCCESSFUL: getFacilitatorOutlinesUnsuccessful,
        RESET_STORE_FACILITATOR_OUTLINE_STATUS: resetStoreFacilitatorOutlineStatus,

        STORE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL: storeFacilitatorOutlineWasSuccessful,
        STORE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL: storeFacilitatorOutlineWasUnsuccessful,

        DELETE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL: deleteFacilitatorOutlineWasSuccessful,
        DELETE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL: deleteFacilitatorOutlineWasUnsuccessful,

        UPDATE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL: updateFacilitatorOutlineWasSuccessful,
        UPDATE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL: updateFacilitatorOutlineWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;