import { updateObject } from '../../utils/updateObject';
import { STORE_BATCH, GET_BATCHES_SUCCESSFUL, GET_BATCHES_UNSUCCESSFUL } from './index';


const getBatchesSuccessful = (state, action) => {
    return updateObject(state, {
        batches: action.payload.data,
        status: action.payload.status,
        message: action.payload.message
    });
}


const getBatchesUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const storeBatch = (state, action) => {
    return updateObject(state, {
        batch: action.payload
    });
}

const initialState = {
    status: null,
    batches: [],
    message: null,
    batch: null,    
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_BATCHES_SUCCESSFUL: getBatchesSuccessful,
        GET_BATCHES_UNSUCCESSFUL: getBatchesUnsuccessful,
        STORE_BATCH: storeBatch
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;