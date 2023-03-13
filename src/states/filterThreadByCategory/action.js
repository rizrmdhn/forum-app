const ActionType = {
    SET_FILTER_THREAD_CATEGORY: 'SET_FILTER_THREAD_CATEGORY',
}

function setFilterThreadCategoryActionCreator(category) {
    return {
        type: ActionType.SET_FILTER_THREAD_CATEGORY,
        payload: { category },
    }
}

export {
    ActionType,
    setFilterThreadCategoryActionCreator,
}