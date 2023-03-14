const ActionType = {
    SET_FILTER_THREAD_CATEGORY: 'SET_FILTER_THREAD_CATEGORY',
}

function setFilterThreadCategoryActionCreator(category) {
    return {
        type: ActionType.SET_FILTER_THREAD_CATEGORY,
        payload: { category },
    }
}

function setDataFilterThreadCategory(category) {
    return (dispatch) => {
        dispatch(setFilterThreadCategoryActionCreator(category))
    }
}

export {
    ActionType,
    setDataFilterThreadCategory,
}