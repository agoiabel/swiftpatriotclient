import { updateObject } from '../../../utils/updateObject';
import { STORE_QUESTION, GET_QUESTIONS_SUCCESSFUL, GET_QUESTIONS_UNSUCCESSFUL, STORE_QUESTION_WAS_SUCCESSFUL, STORE_QUESTION_WAS_UNSUCCESSFUL, GET_QUESTION } from './index';

const getQuestionsWasSuccessful = (state, action) => {
    return updateObject(state, {
        questions: action.payload.data,
        get_question_status: action.payload.status,
        get_question_message: action.payload.message
    });
}

const getQuestionsWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_question_status: action.payload.status,
        get_question_message: action.payload.message,
    });
}

const storeQuestionWasSuccessful = (state, action) => {
    return {
        ...state,
        store_question_status: action.payload.status,
        questions: [...state.questions, action.payload.data]
    }
}

const storeQuestionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_question_status: action.payload.status,
        store_question_message: action.payload.message
    }
}


const updateQuestionWasSuccessful = (state, action) => {
    const newQuestionArray = [...state.questions].filter(question => {
        return question.id !== action.payload.data.id
    });
    const updatedQuestionArray = [...newQuestionArray, action.payload.data];

    return {
        ...state,
        update_question_status: action.payload.status,
        questions: updatedQuestionArray
    }
}

const updateQuestionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_question_status: action.payload.status,
        update_question_message: action.payload.message
    }
}


const resetStoreQuestionStatus = (state, action) => {
    return {
        ...state,
        // get_outline_status: null,
        get_question_message: null,

        store_question_status: null,
        store_question_message: null,

        delete_question_status: null,
        delete_question_message: null, 

        update_question_status: null,
        update_question_message: null,
    }
}

const deleteQuestionWasSuccessful = (state, action) => {
    const oldQuestionArray = [...state.questions];

    const newQuestionArray = oldQuestionArray.filter(question => {
        return question.id !== action.payload.feedbackQuestionId
    });

    return {
        ...state,
        questions: newQuestionArray,
        delete_question_status: 200
    }
}

const deleteQuestionWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const getQuestion = (state, action) => {
    const question = [...state.questions].find(question => {
        return question.id == action.payload;
    });

    return {
        ...state,
        question: question
    }
}

const initialState = {
    questions: [],
    question: null,
    
    get_question_status: null,
    get_question_message: null,
    
    store_question_status: null,
    store_question_message: null,

    delete_question_status: null,
    delete_question_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_QUESTION: getQuestion,

        GET_QUESTIONS_SUCCESSFUL: getQuestionsWasSuccessful,
        GET_QUESTIONS_UNSUCCESSFUL: getQuestionsWasUnsuccessful,
      
        RESET_STORE_QUESTION_STATUS: resetStoreQuestionStatus,

        STORE_QUESTION_WAS_SUCCESSFUL: storeQuestionWasSuccessful,
        STORE_QUESTION_WAS_UNSUCCESSFUL: storeQuestionWasUnsuccessful,

        DELETE_QUESTION_WAS_SUCCESSFUL: deleteQuestionWasSuccessful,
        DELETE_QUESTION_WAS_UNSUCCESSFUL: deleteQuestionWasUnsuccessful,

        UPDATE_QUESTION_WAS_SUCCESSFUL: updateQuestionWasSuccessful,
        UPDATE_QUESTION_WAS_UNSUCCESSFUL: updateQuestionWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;