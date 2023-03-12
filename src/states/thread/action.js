import myToast from '../../components/Toast';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    CREATE_THREAD: 'CREATE_THREAD',
    CREATE_COMMENT: 'CREATE_COMMENT',
    UP_VOTE_THREAD: 'UP_VOTE_THREAD',
    DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
    NEUTRAL_VOTE_THREAD: 'NEUTRAL_VOTE_THREAD',
}

function receiveThreadsActionCreator(threads) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: { threads },
    }
}

function createThreadActionCreator(thread) {
    return {
        type: ActionType.CREATE_THREAD,
        payload: { thread },
    }
}

function createCommentActionCreator(comment) {
    return {
        type: ActionType.CREATE_COMMENT,
        payload: { comment },
    }
}

function upVoteThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.UP_VOTE_THREAD,
        payload: { threadId, userId },
    }
}

function downVoteThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.DOWN_VOTE_THREAD,
        payload: { threadId, userId },
    }
}

function neutralVoteThreadActionCreator({ threadId, userId }) {
    return {
        type: ActionType.NEUTRAL_VOTE_THREAD,
        payload: { threadId, userId },
    }
}

function asyncCreateThread({ title, body, category }) {
    return async (dispatch) => {
        try {
            const threads = await api.createThread({ title, body, category })
            dispatch(createThreadActionCreator(threads))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
    }
}

function asyncCreateComment({ threadId, content }) {
    return async (dispatch) => {
        try {
            const comment = await api.createComment({ threadId, content })
            dispatch(createCommentActionCreator(comment))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
    }
}

function asyncUpVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }))

        try {
            await api.upVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }))
        }
    }
}

function asyncDownVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }))
        try {
            await api.downVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }))
        }
    }
}

function asyncNeutralVoteThread(threadId) {
    return async (dispatch, getState) => {
        const { authUser } = getState()
        dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }))
        try {
            await api.neutralVoteThread(threadId)
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
            dispatch(neutralVoteThreadActionCreator({ threadId, userId: authUser.id }))
        }
    }
}

export {
    ActionType,
    receiveThreadsActionCreator,
    asyncCreateThread,
    asyncCreateComment,
    asyncUpVoteThread,
    asyncDownVoteThread,
    asyncNeutralVoteThread,

}