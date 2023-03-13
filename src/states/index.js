import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from 'react-redux-loading-bar';
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import threadsReducer from "./thread/reducer";
import usersReducer from "./users/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import userMenuReducer from "./userMenu/reducer";
import filterThreadByCategoryReducer from "./filterThreadByCategory/reducer";

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreloadReducer,
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
        users: usersReducer,
        leaderboards: leaderboardsReducer,
        userMenu: userMenuReducer,
        filterThreadByCategory: filterThreadByCategoryReducer,
        loadingBar: loadingBarReducer
    }
});

export default store;