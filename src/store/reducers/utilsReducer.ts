import {UtilsActions, UtilsActionsTypes, UtilsState} from "../../types/utils";

const initinalState: UtilsState = {
    login: false,
    registerV: false,
    seePassword: false,
    confirmEmail: false,
    showConfirmExit: false,
    socket: null,
    showDialogs: false,
    showEmail: false,
    showPinnedDialogs: false,
    setShowSetInpV: false,
    setStatusValue: '',
    loadingSetAvatar: false,
    havePhotoChat: false,
    loadingPhotoChat: false,
    havePhotoChatURL: '',
    openManager: false,
    nameDescriptionV: '',
    nameSubTodoV: '',
    nameTodoV: '',
    subTodoNameV: '',
    localTodoCreate: {},
    setShowTodo: false
}
export const UtilsReducer = (state:UtilsState = initinalState, action: UtilsActions): UtilsState => {
    switch (action.type) {
        case UtilsActionsTypes.SET_SHOW_TODO:
            return {...state, setShowTodo: action.payload}
        case UtilsActionsTypes.SET_LOCAL_TODO_CREATE:
            return {...state, localTodoCreate: action.payload}
        case UtilsActionsTypes.NAME_DESCRIPTION_V:
            return {...state, nameDescriptionV: action.payload}
        case UtilsActionsTypes.NAME_SUB_TODO_V:
            return {...state, nameSubTodoV: action.payload}
        case UtilsActionsTypes.SET_NAME_TODO_V:
            return {...state, nameTodoV:action.payload }
        case UtilsActionsTypes.SUB_TODO_NAME_V:
            return {...state, subTodoNameV: action.payload}
        case UtilsActionsTypes.SET_OPEN_MANAGER:
            return {...state, openManager: action.payload}
        case UtilsActionsTypes.SET_URL_PHOTO_CHAT:
            return {...state, havePhotoChatURL: action.payload}
        case UtilsActionsTypes.SET_HAVE_PHOTO_CHAT:
            return {...state, havePhotoChat: action.payload}
        case UtilsActionsTypes.SET_LOADING_PHOTO_CHAT:
            return {...state, loadingPhotoChat: action.payload}
        case UtilsActionsTypes.SET_LOGIN_AUTH:
            return ({...state, login: action.payload})
        case UtilsActionsTypes.SET_REGISTER_AUTH:
            return ({...state, registerV: action.payload})
        case UtilsActionsTypes.SET_SEE_PASSWORD:
            return ({...state, seePassword: action.payload})
        case UtilsActionsTypes.SET_CONFIRM_EMAIL:
            return ({...state, confirmEmail: action.payload})
        case UtilsActionsTypes.SET_SOCKET:
            return ({...state, socket: action.payload})
        case UtilsActionsTypes.SET_CONFIRM_EXIT:
            return {...state, showConfirmExit: action.payload}
        case UtilsActionsTypes.SET_DIALOGS:
            return {...state, showDialogs: action.payload}
        case UtilsActionsTypes.SET_SHOW_EMAIL:
            return {...state, showEmail: action.payload}
        case UtilsActionsTypes.SET_SHOW_PINNED:
            return {...state, showPinnedDialogs: action.payload}
        case UtilsActionsTypes.SET_SHOW_SET_INP:
            return {...state, setShowSetInpV: action.payload}
        case UtilsActionsTypes.SET_VALUE_STATUS:
            return {...state, setStatusValue: action.payload}
        case UtilsActionsTypes.SET_LOADING_AVATAR:
            return {...state, loadingSetAvatar:action.payload}
        default:
            return state
    }
}
