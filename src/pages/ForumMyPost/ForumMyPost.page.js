import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import styles from './ForumMyPost.page.module.css';
import EmptyState from '../../components/EmptyState';
import QuickContact from '../../components/QuickContact';
import CustomButton from '../../components/CustomButton';
import { NewForumPost } from '../../components/Modal/index';
import { openModal } from '../../components/Modal/Modal.action';
import { get_active_forums } from './ForumMyPost.page.action';

import StudentForumSidebar from '../../components/StudentForumSidebar';

class ForumMyPost extends React.Component {

    navigateTo = page => {
        this.props.history.push(page);
    }

    newDiscussionHandler = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        this.props.openModal(NewForumPost, {});
    }


    componentDidMount() {
        this.props.get_active_forums();
    }


    render() {
        let forums = <Spinner />;

        if (this.props.status === 200 && !this.props.forums.length) {
            forums = <EmptyState message="No forum created yet" />;
        }

        if (this.props.status === 200 && this.props.forums.length) {
            forums = this.props.forums.map(forum => (
                <div className={styles.discussion} onClick={() => this.navigateTo(`/forum/show/${forum.id}`)} key={forum.id}>
                    <div className={styles.questionTitle}>
                        {forum.title}
                    </div>
                    <div className={styles.questionBody}>
                        {forum.post}
                    </div>
                    <div className={styles.questionFooter}>
                        <div className={styles.posted}>
                            <span className={styles.postedTime}>Posted <span className={styles.minsAgo}>{moment(forum.posted_at).startOf('hour').fromNow()}</span></span>
                            <span className={styles.postedBy}>{forum.owner.firstname} {forum.owner.middlename} {forum.owner.lastname}</span>
                        </div>
                        <div className={styles.questionComment}>
                            <i className="fa fa-comments" aria-hidden="true"></i> {forum.comments.length}
                        </div>
                    </div>
                </div>
            ));
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
                    
                    <div className={styles.newDiscussion}>
                        <CustomButton onClick={this.newDiscussionHandler}>NEW DISCUSSION</CustomButton>
                    </div>

                    <div className={styles.forumContainer}>
                        <div className={styles.forumMenus}>
                            <StudentForumSidebar />
                        </div>

                        <div className={styles.discussions}>
                            { forums }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        forums: state.myForumPostReducer.forums,
        status: state.myForumPostReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get_active_forums: () => dispatch( get_active_forums() ),
        openModal: (modalType, modalProp) => dispatch(openModal(modalType, modalProp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumMyPost);