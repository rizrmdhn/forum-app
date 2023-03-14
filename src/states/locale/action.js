const ActionType = {
    SET_LOCALE: 'SET_LOCALE',
}

function setLocaleActionCreator(locale) {
    return {
        type: ActionType.SET_LOCALE,
        payload: { locale },
    }
}

export { ActionType, setLocaleActionCreator }