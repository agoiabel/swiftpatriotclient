import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form';
import authReducer from '../pages/Auth/Auth.page.reducer';
import modalReducer from '../components/Modal/Modal.reducer';
import coursesReducer from '../shared/store/Course/Course.reducer.js';
import sessionsReducer from '../shared/store/Session/Session.reducer.js';
import outlinesReducer from '../shared/store/Outline/Outline.reducer.js';
import registrationReducer from '../pages/Register/Register.page.reducer';
import facilitatorsReducer from '../shared/store/Facilitator/Facilitator.reducer.js';
import forgotPasswordReducer from '../pages/ForgotPassword/ForgotPassword.page.reducer';
import registerProfileReducer from '../pages/RegisterProfile/RegisterProfile.page.reducer';
import studentDashboardReducer from '../pages/StudentDashboard/StudentDashboard.page.reducer.js';
import facilitatorOutlinesReducer from '../shared/store/FacilitatorOutline/FacilitatorOutline.reducer.js';

export default combineReducers({
    form: formReducer,
    authReducer: authReducer,
    modalReducer: modalReducer,
    coursesReducer: coursesReducer,
    sessionsReducer: sessionsReducer,
    outlinesReducer: outlinesReducer,
    facilitatorsReducer: facilitatorsReducer,
    registrationReducer: registrationReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    registerProfileReducer: registerProfileReducer,
    studentDashboardReducer: studentDashboardReducer,
    facilitatorOutlinesReducer: facilitatorOutlinesReducer
});