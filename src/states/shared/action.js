import myToast from '../../components/Toast';
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../thread/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
    return async (dispatch) => {
        try {
            const users = await api.getAllUsers();
            const threads = await api.getAllThreads();

            dispatch(receiveUsersActionCreator(users));
            dispatch(receiveThreadsActionCreator(threads));
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            });
        }
    }
}

function asyncGetAllUsers() {
    return async (dispatch) => {
        try {
            const users = await api.getAllUsers();
            dispatch(receiveUsersActionCreator(users));
        } catch (error) {
            myToast.fire({
                icon: 'error',
                title: error.message,
            });
        }
    }
}

export { asyncPopulateUsersAndThreads, asyncGetAllUsers };