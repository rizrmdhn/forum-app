const ActionType = {
    SET_OPEN_MENU: 'SET_OPEN_MENU',
}

function setOpenMenuActionCreator(openMenu) {
    return {
        type: ActionType.SET_OPEN_MENU,
        payload: { openMenu },
    }
}

export {
    ActionType,
    setOpenMenuActionCreator,
}