import React from 'react';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './MessageIndex.page.module.css';
import QuickContact from '../../components/QuickContact';

import CreateMessageForm from '../../components/Forms/CreateMessageForm';
import StudentMessageContainer from '../../components/StudentMessageContainer';

import { get_user_and_message_count, send_message_with } from './MessageIndex.page.action.js';

class MessageIndex extends React.Component {

    state = {
        student_id: null,
        submittingForm: false
    }

    sendMessageHandler = formData => {
        formData['receiver_id'] = this.state.student_id;
        this.setState({
            submittingForm: true
        }, () => {
            this.props.reset_form('CreateMessageForm');
        });
        this.props.send_message_with(formData);
    }

    componentDidMount() {
        this.props.get_user_and_message_count();
    }

    showUserMessageHandler = user => {
        this.setState({
            student_id: user.id
        });
    }

    render () {

        let messageContainer, quickContact;
        let messageHeader = 'Send message to all students';

        let container = (
            <div>
                <Spinner />
            </div>
        )

        if (this.state.student_id == null) {
            messageContainer = (
                <div className={styles.messageContainer}>
                    You can send message to all users here
                </div>
            )
        } else {
            messageHeader = `Send message to ${this.props.user.name}`;

            messageContainer = (
                <div className={styles.messageContainer}>
                    <StudentMessageContainer student_id={this.state.student_id} />
                </div>
            )
        }

        if (this.props.user.role_id == 5) {
            quickContact = (
                <div>
                    <QuickContact />
                </div>
            )
        }


        if (this.props.status === 200) {
                
            let users = this.props.users.map(user => (
                <div className={styles.user} onClick={() => this.showUserMessageHandler(user)} key={user.id}>
                    <div className={styles.user_header}>
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.matric_number}>{user.matric_number}</div>
                    </div>
                    <div className={styles.user_footer}>
                        <div className={styles.message}>
                            Click to read message
                        </div>

                        <div className={styles.unreadMessageCount}>{user.unread_received_message_count}</div>

                    </div>
                </div>
            ));

            container = (
                <div className={styles.container}>
                    <div className={styles.sidebar}>
                        <div className={styles.header}>
                            <input className={styles.input} placeholder="Search for student" />
                        </div>

                        <div className={styles.users}>

                            { users }
                            
                        </div>
                    </div>

                    <div className={styles.content}>
                        <div className={styles.contentHeader}>
                            { messageHeader }
                        </div>

                        { messageContainer }

                        <div className={styles.sendMessage}>
                            <CreateMessageForm submitText="Send" onSubmit={this.sendMessageHandler} />
                        </div>
                    </div>
                </div>
            )
        }


        return (
            <div>
                <div>
                    <Header />
                </div>

                { quickContact }

                { container }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        users: state.messageIndexReducer.users,
        status: state.messageIndexReducer.status,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset_form: payload => dispatch( reset(payload) ),
        send_message_with: payload => dispatch( send_message_with(payload) ),
        get_user_and_message_count: () => dispatch( get_user_and_message_count() )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageIndex);