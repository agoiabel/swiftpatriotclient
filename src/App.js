import React from 'react';
import Auth from './pages/Auth';

import Register from './pages/Register';
import ConfirmEmail from './pages/ConfirmEmail';
import RegisterProfile from './pages/RegisterProfile';

import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';

import CourseEdit from './pages/CourseEdit';
import CourseIndex from './pages/CourseIndex';
import CourseCreate from './pages/CourseCreate';

import OutlineEdit from './pages/OutlineEdit';
import OutlineIndex from './pages/OutlineIndex';
import OutlineCreate from './pages/OutlineCreate';

import SessionEdit from './pages/SessionEdit';
import SessionIndex from './pages/SessionIndex';
import SessionCreate from './pages/SessionCreate';

import SessionDashboard from './pages/SessionDashboard';

import FacilitatorEdit from './pages/FacilitatorEdit';
import FacilitatorIndex from './pages/FacilitatorIndex';
import FacilitatorCreate from './pages/FacilitatorCreate';

import StudentSession from './pages/StudentSession';
import StudentDashboard from './pages/StudentDashboard';

import FacilitatorOutlineIndex from './pages/FacilitatorOutlineIndex';
import FacilitatorOutlineCreate from './pages/FacilitatorOutlineCreate'

import PendingTransaction from './pages/PendingTransaction';


import {Route, Switch, Redirect} from 'react-router-dom';
import ModalManager from './components/Modal/ModalManager.component';

import RequiresAuth from './components/RequiresAuth';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>

        <ModalManager />

        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/resetPassword/:token" exact component={ResetPassword} />
          <Route path="/forgotPassword" exact component={ForgotPassword} />          
          <Route path="/confirmEmail/:token" exact component={ConfirmEmail} />

          <Route path="/register" exact component={Register} />
          <Route path="/register-profile/:accountType/:userSlug" exact component={RegisterProfile} />

          <Route path="/student-dashboard" exact component={RequiresAuth(StudentDashboard)} />
          <Route path="/student-session/:sessionSlug" exact component={RequiresAuth(StudentSession)} />

          <Route path="/dashboard" exact component={RequiresAuth(Dashboard)} />
          <Route path="/course/index" exact component={RequiresAuth(CourseIndex)} />
          <Route path="/course/create" exact component={RequiresAuth(CourseCreate)} />
          <Route path="/course/edit/:courseSlug" exact component={RequiresAuth(CourseEdit)} />

          <Route path="/outline/index" exact component={RequiresAuth(OutlineIndex)} />
          <Route path="/outline/create" exact component={RequiresAuth(OutlineCreate)} />
          <Route path="/outline/edit/:outlineSlug" exact component={RequiresAuth(OutlineEdit)} />

          <Route path="/facilitator/index" exact component={RequiresAuth(FacilitatorIndex)} />
          <Route path="/facilitator/create" exact component={RequiresAuth(FacilitatorCreate)} />
          <Route path="/facilitator/edit/:facilitatorSlug" exact component={RequiresAuth(FacilitatorEdit)} />

          <Route path="/session/index" exact component={RequiresAuth(SessionIndex)} />
          <Route path="/session/create" exact component={RequiresAuth(SessionCreate)} />
          <Route path="/session/edit/:sessionSlug" exact component={RequiresAuth(SessionEdit)} />

          <Route path="/facilitator-outline/index/:sessionSlug" exact component={RequiresAuth(FacilitatorOutlineIndex)} />
          <Route path="/facilitator-outline/create/:sessionSlug" exact component={RequiresAuth(FacilitatorOutlineCreate)} />

          <Route path="/session/dashboard/:sessionSlug" exact component={RequiresAuth(SessionDashboard)} />

          <Route path="/transaction/pending/:sessionSlug" exact component={RequiresAuth(PendingTransaction)} />

          <Redirect to="/" />
        </Switch>
        
      </React.Fragment>
    );
  }
}

export default App;