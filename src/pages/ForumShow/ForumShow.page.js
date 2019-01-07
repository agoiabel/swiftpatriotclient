import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './ForumShow.page.module.css';
import QuickContact from '../../components/QuickContact';
import CustomButton from '../../components/CustomButton';
import StudentForumSidebar from '../../components/StudentForumSidebar';

import { openModal } from '../../components/Modal/Modal.action';
import { NewForumPostComment } from '../../components/Modal/index';
import { get_active_forum_comments, like_comment_with } from './ForumShow.page.action';

class ForumShow extends React.Component {

    componentDidMount() {
        this.props.get_active_forum_comments(this.props.match.params.forumSlug);
    }

    newDiscussionHandler = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        this.props.openModal(NewForumPostComment, {forumId: this.props.match.params.forumSlug});
    }

    likeCommentHandler = comment => {
        this.props.like_comment_with({
            comment_id: comment.id
        });
    }

    render() {
        let comments;
        let forumCommentContainer = <Spinner />

        if (this.props.status === 200) {

            comments = this.props.comments.map(comment => (
                <div className={styles.discussionComment} key={comment.id}>
                    <div>
                        <span className={styles.postedBy}>{comment.owner.firstname} {comment.owner.lastname}</span>
                        <span className={styles.postedDate}>{moment(comment.posted_at).startOf('hour').fromNow()}</span>
                    </div>
                    <div>
                        {comment.post}
                    </div>
                    <div className={styles.likes}>
                        <div className={styles.icon} onClick={() => this.likeCommentHandler(comment)}>
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        </div>
                        <span className={styles.likeCount}>{comment.no_of_likes}</span>
                    </div>
                </div>
            ));

            forumCommentContainer = (
                <div className={styles.discussion}>

                    <div className={styles.header}>
                        <div className={styles.nameDate}>
                            <span className={styles.name}>{this.props.forum.owner.firstname} {this.props.forum.owner.lastname}</span>
                            <span className={styles.day}>{moment(this.props.forum.posted_at).startOf('hour').fromNow()}</span>
                        </div>
                        <div className={styles.comment}>
                            <i className="fa fa-comments" aria-hidden="true"></i> {this.props.forum.comments.length}
                        </div>
                    </div>

                    <div className={styles.title}>
                        {this.props.forum.post}
                    </div>

                    <div className={styles.discussionComments}>

                        { comments }

                        <div className={styles.commentContainer}>
                            <CustomButton onClick={this.newDiscussionHandler}>Add Comment</CustomButton>
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
                <div>
                    <QuickContact />
                </div>
                <div className={styles.container}>

                    <div className={styles.forumContainer}>

                        <div className={styles.forumMenus}>
                            <StudentForumSidebar />
                        </div>

                        
                        { forumCommentContainer }

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        forum: state.forumShowReducer.forum,
        status: state.forumShowReducer.status,
        comments: state.forumShowReducer.comments
    }
}
const mapDispatchToProps = dispatch => {
    return {
        like_comment_with: payload => dispatch( like_comment_with(payload) ),
        openModal: (modalType, modalProp) => dispatch( openModal(modalType, modalProp) ),
        get_active_forum_comments: payload => dispatch( get_active_forum_comments(payload) ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumShow);