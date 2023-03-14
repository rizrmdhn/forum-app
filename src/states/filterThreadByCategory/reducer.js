import { ActionType } from "./action";

function filterThreadByCategoryReducer(category = "", action = {}) {
    switch (action.type) {
        case ActionType.SET_FILTER_THREAD_CATEGORY:
            return action.payload.category;
        default:
            return category;
    }
}

export default filterThreadByCategoryReducer;