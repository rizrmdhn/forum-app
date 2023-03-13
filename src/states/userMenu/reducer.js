import { ActionType } from "./action";

function userMenuReducer(openMenu = false, action = {}) {
    switch (action.type) {
        case ActionType.SET_OPEN_MENU:
            return action.payload.openMenu;
        default:
            return openMenu;
    }
}

export default userMenuReducer;