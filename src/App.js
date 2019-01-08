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

import FeedbackQuestionEdit from './pages/FeedbackQuestionEdit';
import FeedbackQuestionIndex from './pages/FeedbackQuestionIndex';
import FeedbackQuestionCreate from './pages/FeedbackQuestionCreate';

import FacilitatorOutlineIndex from './pages/FacilitatorOutlineIndex';
import FacilitatorOutlineCreate from './pages/FacilitatorOutlineCreate'

import FacilitatorOutlineAddFeedback from './pages/FacilitatorOutlineAddFeedback';

import PendingTransaction from './pages/PendingTransaction';

import FeedbackGeneralCreate from './pages/FeedbackGeneralCreate';

import {Route, Switch, Redirect} from 'react-router-dom';
import ModalManager from './components/Modal/ModalManager.component';

import RequiresAuth from './components/RequiresAuth';
import FeedbackGeneralIndex from './pages/FeedbackGeneralIndex';

import ForumShow from './pages/ForumShow';
import ForumIndex from './pages/ForumIndex';
import ForumMyPost from './pages/ForumMyPost';
import ForumMyPostAwaiting from './pages/ForumMyPostAwaiting';
import ForumMyPostDeclined from './pages/ForumMyPostDeclined';

import DonateCreate from './pages/DonationCreate';
import MessageIndex from './pages/MessageIndex';

import ForumManagement from './pages/ForumManagement';
import ForumCommentManagement from './pages/ForumCommentManagement';

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

          <Route path="/feedback-question/index" exact component={RequiresAuth(FeedbackQuestionIndex)} />
          <Route path="/feedback-question/create" exact component={RequiresAuth(FeedbackQuestionCreate)} />
          <Route path="/feedback-question/edit/:feedbackQuestionSlug" exact component={RequiresAuth(FeedbackQuestionEdit)} />

          <Route path="/session/dashboard/:sessionSlug" exact component={RequiresAuth(SessionDashboard)} />

          <Route path="/facilitator-outline/add-feedback/:facilitatorOutlineId" exact component={RequiresAuth(FacilitatorOutlineAddFeedback)} />
          <Route path="/transaction/pending/:sessionSlug" exact component={RequiresAuth(PendingTransaction)} />
          <Route path="/feedback-general/create" exact component={RequiresAuth(FeedbackGeneralCreate)} />
          <Route path="/feedback-general/index" exact component={RequiresAuth(FeedbackGeneralIndex)} />


          <Route path="/forum/index" exact component={RequiresAuth(ForumIndex)} />
          <Route path="/forum/me" exact component={RequiresAuth(ForumMyPost)} />
          <Route path="/forum/me-awaiting" exact component={RequiresAuth(ForumMyPostAwaiting)} />
          <Route path="/forum/me-declined" exact component={RequiresAuth(ForumMyPostDeclined)} />
          <Route path="/forum/show/:forumSlug" exact component={RequiresAuth(ForumShow)} />

          <Route path="/forum/management" exact component={RequiresAuth(ForumManagement)} />
          <Route path="/forum-comment/management" exact component={RequiresAuth(ForumCommentManagement)} />

          <Route path="/donate/create" exact component={RequiresAuth(DonateCreate)} />

          <Route path="/message/index" exact component={RequiresAuth(MessageIndex)} />

          <Redirect to="/" />
        </Switch>
        
      </React.Fragment>
    );
  }
}

export default App;