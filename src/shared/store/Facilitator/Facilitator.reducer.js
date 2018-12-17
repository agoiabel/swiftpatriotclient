import { updateObject } from '../../../utils/updateObject';
import { STORE_FACILITATOR, GET_FACILITATORS_SUCCESSFUL, GET_FACILITATORS_UNSUCCESSFUL, STORE_FACILITATOR_WAS_SUCCESSFUL, STORE_FACILITATOR_WAS_UNSUCCESSFUL, GET_FACILITATOR } from './index';

const getFacilitatorsSuccessful = (state, action) => {
    return updateObject(state, {
        facilitators: action.payload.data,
        get_facilitator_status: action.payload.status,
        get_facilitator_message: action.payload.message
    });
}

const getFacilitatorsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_facilitator_status: action.payload.status,
        get_facilitator_message: action.payload.message,
    });
}

const storeFacilitatorWasSuccessful = (state, action) => {
    return {
        ...state,
        store_facilitator_status: action.payload.status,
        facilitators: [...state.facilitators, action.payload.data]
    }
}

const storeFacilitatorWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_facilitator_status: action.payload.status,
        store_facilitator_message: action.payload.message
    }
}


const updateFacilitatorWasSuccessful = (state, action) => {
    const newFacilitatorArray = [...state.facilitators].filter(facilitator => {
        return facilitator.id !== action.payload.data.id
    });
    const updatedFacilitatorArray = [...newFacilitatorArray, action.payload.data];

    return {
        ...state,
        update_facilitator_status: action.payload.status,
        facilitators: updatedFacilitatorArray
    }
}

const updateFacilitatorWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_facilitator_status: action.payload.status,
        update_facilitator_message: action.payload.message
    }
}


const resetStoreFacilitatorStatus = (state, action) => {
    return {
        ...state,
        // get_facilitator_status: null,
        get_facilitator_message: null,

        store_facilitator_status: null,
        store_facilitator_message: null,

        delete_facilitator_status: null,
        delete_facilitator_message: null, 

        update_facilitator_status: null,
        update_facilitator_message: null,
    }
}

const deleteFacilitatorWasSuccessful = (state, action) => {
    const oldFacilitatorArray = [...state.facilitators];

    const newFacilitatorArray = oldFacilitatorArray.filter(facilitator => {
        return facilitator.id !== action.payload.facilitatorId
    });

    return {
        ...state,
        facilitators: newFacilitatorArray,
        delete_facilitator_status: 200
    }
}

const deleteFacilitatorWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const getFacilitator = (state, action) => {
    const facilitator = [...state.facilitators].find(facilitator => {
        return facilitator.id == action.payload;
    });

    return {
        ...state,
        facilitator: facilitator
    }
}

const initialState = {
    facilitators: [],
    facilitator: null,
    
    get_facilitator_status: null,
    get_facilitator_message: null,
    
    store_facilitator_status: null,
    store_facilitator_message: null,

    delete_facilitator_status: null,
    delete_facilitator_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_FACILITATOR: getFacilitator,
        GET_FACILITATORS_SUCCESSFUL: getFacilitatorsSuccessful,
        GET_FACILITATORS_UNSUCCESSFUL: getFacilitatorsUnsuccessful,
        RESET_STORE_FACILITATOR_STATUS: resetStoreFacilitatorStatus,

        STORE_FACILITATOR_WAS_SUCCESSFUL: storeFacilitatorWasSuccessful,
        STORE_FACILITATOR_WAS_UNSUCCESSFUL: storeFacilitatorWasUnsuccessful,

        DELETE_FACILITATOR_WAS_SUCCESSFUL: deleteFacilitatorWasSuccessful,
        DELETE_FACILITATOR_WAS_UNSUCCESSFUL: deleteFacilitatorWasUnsuccessful,

        UPDATE_FACILITATOR_WAS_SUCCESSFUL: updateFacilitatorWasSuccessful,
        UPDATE_FACILITATOR_WAS_UNSUCCESSFUL: updateFacilitatorWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;