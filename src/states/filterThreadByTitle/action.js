const ActionType = {
    SET_FILTER_THREAD_TITLE: 'SET_FILTER_THREAD_TITLE',
}

function setFilterThreadTitleActionCreator(title) {
    return {
        type: ActionType.SET_FILTER_THREAD_TITLE,
        payload: { title },
    }
}

function setDataFilterThreadTitle(title) {
    return (dispatch) => {
        dispatch(setFilterThreadTitleActionCreator(title))
    }
}

export {
    ActionType,
    setDataFilterThreadTitle,
}