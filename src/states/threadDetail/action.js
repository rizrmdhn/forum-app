import { hideLoading, showLoading } from 'react-redux-loading-bar';
import myToast from '../../components/Toast';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS_DETAIL: 'RECEIVE_THREADS_DETAIL',
    UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
    DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
    NEUTRAL_VOTE_THREAD_DETAIL: 'NEUTRAL_VOTE_THREAD_DETAIL',
    CREATE_COMMENT_THREAD_DETAIL: 'CREATE_COMMENT_THREAD_DETAIL',
    UP_VOTE_COMMENT_THREAD_DETAIL: 'UP_VOTE_COMMENT_THREAD_DETAIL',
    DOWN_VOTE_COMMENT_THREAD_DETAIL: 'DOWN_VOTE_COMMENT_THREAD_DETAIL',
    NEUTRAL_VOTE_COMMENT_THREAD_DETAIL: 'NEUTRAL_VOTE_COMMENT_THREAD_DETAIL',
}

function receiveThreadsDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREADS_DETAIL,
        payload: { threadDetail },
    }
}

function upVoteThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.UP_VOTE_THREAD_DETAIL,
        payload: { threadId, userId },
    }
};

function downVoteThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.DOWN_VOTE_THREAD_DETAIL,
        payload: { threadId, userId },
    }
};

function neutralVoteThreadDetailActionCreator({ threadId, userId }) {
    return {
        type: ActionType.NEUTRAL_VOTE_THREAD_DETAIL,
        payload: { threadId, userId },
    }
};

function createCommentActionCreator(comment) {
    return {
        type: ActionType.CREATE_COMMENT_THREAD_DETAIL,
        payload: { comment },
    }
}


function upVoteCommentActionCreator({ threadId, commentId, userId }) {
    return {
        type: ActionType.UP_VOTE_COMMENT_THREAD_DETAIL,
        payload: {
            threadId,
            commentId,
            userId
        },
    }
}

function downVoteCommentActionCreator({ threadId, commentId, userId }) {
    return {
        type: ActionType.DOWN_VOTE_COMMENT_THREAD_DETAIL,
        payload: {
            threadId,
            commentId,
            userId
        },
    }
}

function neutralVoteCommentActionCreator({ threadId, commentId, userId }) {
    return {
        type: ActionType.NEUTRAL_VOTE_COMMENT_THREAD_DETAIL,
        payload: {
            threadId,
            commentId,
            userId
        },
    }
}

function asyncGetThreadDetail(threadId) {
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const threadDetail = await api.getThreadDetails(threadId)
            dispatch(receiveThreadsDetailActionCreator(threadDetail))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
        dispatch(hideLoading())
    }
}

function asyncUpVoteThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }))

        try {
            await api.upVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })

        }
        dispatch(hideLoading())
    }
}

function asyncDownVoteThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }))

        try {
            await api.downVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
        dispatch(hideLoading())
    }
}

function asyncNeutralVoteThreadDetail(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(neutralVoteThreadDetailActionCreator({ threadId, userId: authUser.id }))

        try {
            await api.neutralVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
        dispatch(hideLoading())
    }
}

function asyncCreateComment({ threadId, content }) {
    return async (dispatch) => {
        dispatch(showLoading())
        try {
            const comment = await api.createComment({ threadId, content });
            dispatch(createCommentActionCreator(comment));

            const threadDetail = await api.getThreadDetails(threadId)
            dispatch(receiveThreadsDetailActionCreator(threadDetail))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            });
        }
        dispatch(hideLoading())
    }
}

function asyncUpVoteComment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
        try {
            await api.upVoteComment({ threadId, commentId })
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
        }
        dispatch(hideLoading())
    }
}

function asyncDownVotecomment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))

        try {
            await api.downVoteComment({ threadId, commentId })
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
        }
        dispatch(hideLoading())
    }
}

function asyncNeutralVoteComment({ threadId, commentId }) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
        const { authUser } = getState()
        dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))

        try {
            await api.neutralVoteComment({ threadId, commentId })
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(neutralVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }))
        }
        dispatch(hideLoading())
    }
}
export {
    ActionType,
    asyncGetThreadDetail,
    asyncUpVoteThreadDetail,
    asyncDownVoteThreadDetail,
    asyncNeutralVoteThreadDetail,
    asyncCreateComment,
    asyncUpVoteComment,
    asyncDownVotecomment,
    asyncNeutralVoteComment,
}