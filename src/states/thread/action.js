import { hideLoading, showLoading } from 'react-redux-loading-bar';
import myToast from '../../components/Toast';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    CREATE_THREAD: 'CREATE_THREAD',
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

function createThreadActionCreator(threads) {
    return {
        type: ActionType.CREATE_THREAD,
        payload: { threads },
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
        dispatch(showLoading())
        try {
            const threads = await api.createThread({ title, body, category })
            dispatch(createThreadActionCreator(threads))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
        dispatch(hideLoading())
    }
}

function asyncUpVoteThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
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
        dispatch(hideLoading())
    }
}

function asyncDownVoteThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
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
        dispatch(hideLoading())
    }
}

function asyncNeutralVoteThread(threadId) {
    return async (dispatch, getState) => {
        dispatch(showLoading())
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
        dispatch(hideLoading())
    }
}

export {
    ActionType,
    receiveThreadsActionCreator,
    asyncCreateThread,
    asyncUpVoteThread,
    asyncDownVoteThread,
    asyncNeutralVoteThread,

}