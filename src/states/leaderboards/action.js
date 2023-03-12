import myToast from "../../components/Toast"
import api from "../../utils/api"

const ActionType = {
    RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
}

function receiveLeaderboardActionCreator(leaderboards) {
    return {
        type: ActionType.RECEIVE_LEADERBOARD,
        payload: { leaderboards },
    }
}

function asyncGetLeaderboard() {
    return async (dispatch) => {
        try {
            const leaderboards = await api.getLeaderboards()
            dispatch(receiveLeaderboardActionCreator(leaderboards))
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            })
        }
    }
}

export { ActionType, asyncGetLeaderboard }