import myToast from '../../components/Toast';
import api from '../../utils/api';

const ActionType = {
    RECEIVE_THREADS_DETAIL: 'RECEIVE_THREADS_DETAIL',
}

function receiveThreadsDetailActionCreator(threadDetail) {
    return {
        type: ActionType.RECEIVE_THREADS_DETAIL,
        payload: { threadDetail },
    }
}

function asyncGetThreadDetail(id) {
    return async (dispatch) => {
        try {
            const threadDetail = await api.getThreadDetails(id)
            dispatch(receiveThreadsDetailActionCreator(threadDetail))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
    }
}

export {
    ActionType,
    asyncGetThreadDetail,
}