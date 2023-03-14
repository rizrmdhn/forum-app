import { ActionType } from "./action";

function filterThreadByTitleReducer(title = "", action = {}) {
    switch (action.type) {
        case ActionType.SET_FILTER_THREAD_TITLE:
            return action.payload.title;
        default:
            return title;
    }
}

export default filterThreadByTitleReducer;