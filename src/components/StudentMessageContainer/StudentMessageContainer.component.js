import React from 'react';
import Spinner from '../Spinner';

import { connect } from 'react-redux';
import styles from './StudentMessageContainer.component.module.css';
import { get_user_messages } from './StudentMessageContainer.component.action';

class StudentMessageContainer extends React.Component {

    componentDidMount() {
        this.props.get_user_messages(this.props.student_id);
    }


    render() {

        let messages = (
            <div>
                <Spinner />
            </div>
        );

        if (this.props.status === 200) {
            messages = this.props.messages.map(message => {

                const className = (message.sender.id == this.props.user.id) ? styles.me : styles.you;
                const messageStyle = (message.sender.id == this.props.user.id) ? styles.message_me : styles.message_you;

                return (
                    <div className={messageStyle} key={message.id}>
                        <div className={className}>
                            {message.body}
                        </div>
                    </div>
                )
            });
        }

        return (
            <div className={styles.container}>

                {messages}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        status: state.studentMessageReducer.status,
        messages: state.studentMessageReducer.messages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_user_messages: payload => dispatch(get_user_messages(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentMessageContainer);