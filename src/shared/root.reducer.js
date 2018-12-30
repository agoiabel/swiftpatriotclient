import {combineReducers} from 'redux';

import { reducer as formReducer } from 'redux-form';
import authReducer from '../pages/Auth/Auth.page.reducer';
import modalReducer from '../components/Modal/Modal.reducer';
import coursesReducer from '../shared/store/Course/Course.reducer.js';
import sessionsReducer from '../shared/store/Session/Session.reducer.js';
import outlinesReducer from '../shared/store/Outline/Outline.reducer.js';
import registrationReducer from '../pages/Register/Register.page.reducer';
import confirmEmailReducer from '../pages/ConfirmEmail/ConfirmEmail.page.reducer';
import transactionReducer from '../shared/store/Transaction/Transaction.reducer.js';
import resetPasswordReducer from '../pages/ResetPassword/ResetPassword.page.reducer';
import facilitatorsReducer from '../shared/store/Facilitator/Facilitator.reducer.js';
import forgotPasswordReducer from '../pages/ForgotPassword/ForgotPassword.page.reducer';
import registerProfileReducer from '../pages/RegisterProfile/RegisterProfile.page.reducer';
import sessionDashboardReducer from '../pages/SessionDashboard/SessionDashboard.page.reducer';
import studentDashboardReducer from '../pages/StudentDashboard/StudentDashboard.page.reducer.js';
import payWithTellerReducer from '../components/Modal/PayWithTeller/PayWithTeller.component.reducer.js';
import facilitatorOutlinesReducer from '../shared/store/FacilitatorOutline/FacilitatorOutline.reducer.js';

export default combineReducers({
    form: formReducer,
    authReducer: authReducer,
    modalReducer: modalReducer,
    coursesReducer: coursesReducer,
    sessionsReducer: sessionsReducer,
    outlinesReducer: outlinesReducer,
    transactionReducer: transactionReducer,
    confirmEmailReducer: confirmEmailReducer,
    facilitatorsReducer: facilitatorsReducer,
    registrationReducer: registrationReducer,
    resetPasswordReducer: resetPasswordReducer,
    payWithTellerReducer: payWithTellerReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    registerProfileReducer: registerProfileReducer,
    sessionDashboardReducer: sessionDashboardReducer,
    studentDashboardReducer: studentDashboardReducer,
    facilitatorOutlinesReducer: facilitatorOutlinesReducer
});