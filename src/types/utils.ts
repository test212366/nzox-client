export interface UtilsState {
    login: boolean
    registerV: boolean
    seePassword: boolean
    confirmEmail: boolean
    socket: any
    showConfirmExit: boolean
    showEmail:boolean
    showPinnedDialogs: boolean
    showDialogs: boolean
    setShowSetInpV:boolean
    setStatusValue: string
    loadingSetAvatar: boolean
    havePhotoChat: boolean
    loadingPhotoChat: boolean
    havePhotoChatURL: string
    openManager: boolean
    nameTodoV: string
    nameSubTodoV: string
    nameDescriptionV: string
    subTodoNameV: string
    localTodoCreate: any
    setShowTodo: boolean
}
export enum UtilsActionsTypes {
    SET_SHOW_TODO = 'SET_SHOW_TODO',
    SET_LOCAL_TODO_CREATE = 'SET_LOCAL_TODO_CREATE',
    SET_NAME_TODO_V = 'SET_NAME_TODO_V',
    NAME_SUB_TODO_V = 'NAME_SUB_TODO_V',
    NAME_DESCRIPTION_V = 'NAME_DESCRIPTION_V',
    SUB_TODO_NAME_V = 'SUB_TODO_NAME_V',
    SET_LOGIN_AUTH = 'SET_LOGIN_AUTH',
    SET_REGISTER_AUTH = 'SET_REGISTER_AUTH',
    SET_SEE_PASSWORD = 'SET_SEE_PASSWORD',
    SET_CONFIRM_EMAIL = 'SET_CONFIRM_EMAIL',
    SET_SOCKET = 'SET_SOCKET',
    SET_CONFIRM_EXIT = 'SET_CONFIRM_EXIT',
    SET_SHOW_EMAIL = 'SET_SHOW_EMAIL',
    SET_SHOW_PINNED = 'SET_SHOW_PINNED',
    SET_DIALOGS = 'SET_DIALOGS',
    SET_SHOW_SET_INP = 'SET_SHOW_SET_INP',
    SET_VALUE_STATUS = 'SET_VALUE_STATUS',
    SET_LOADING_AVATAR = 'SET_LOADING_AVATAR',
    SET_HAVE_PHOTO_CHAT = 'SET_HAVE_PHOTO_CHAT',
    SET_LOADING_PHOTO_CHAT = 'SET_LOADING_PHOTO_CHAT',
    SET_URL_PHOTO_CHAT = 'SET_URL_PHOTO_CHAT',
    SET_OPEN_MANAGER = 'SET_OPEN_MANAGER'
}
interface setShowTodo {
    type: UtilsActionsTypes.SET_SHOW_TODO
    payload: boolean
}
interface setCreateTodo {
    type: UtilsActionsTypes.SET_LOCAL_TODO_CREATE
    payload: any
}
interface setNameTodoV {
    type: UtilsActionsTypes.SET_NAME_TODO_V
    payload: string
}
interface setNameSubTodoV {
    type: UtilsActionsTypes.NAME_SUB_TODO_V
    payload: string
}
interface setNameDescriptionV {
    type: UtilsActionsTypes.NAME_DESCRIPTION_V
    payload: string
}
interface setSubTodoNameV {
    type: UtilsActionsTypes.SUB_TODO_NAME_V
    payload: string
}
interface setOpenManager {
    type: UtilsActionsTypes.SET_OPEN_MANAGER
    payload: boolean
}
interface setUrlPhotoChat {
    type: UtilsActionsTypes.SET_URL_PHOTO_CHAT
    payload: string
}
interface setHavePhotoChat {
    type :UtilsActionsTypes.SET_HAVE_PHOTO_CHAT,
    payload: boolean
}
interface setLoadingPhotoChat {
    type: UtilsActionsTypes.SET_LOADING_PHOTO_CHAT
    payload: boolean
}
interface setLoadingAvatar {
    type: UtilsActionsTypes.SET_LOADING_AVATAR
    payload: boolean
}
interface setValueStatus {
    type: UtilsActionsTypes.SET_VALUE_STATUS
    payload: string
}
interface setShopSetInp {
    type: UtilsActionsTypes.SET_SHOW_SET_INP
    payload: boolean
}
interface showEmail {
    type: UtilsActionsTypes.SET_SHOW_EMAIL
    payload: boolean
}
interface showPinnedDialogs {
    type: UtilsActionsTypes.SET_SHOW_PINNED
    payload: boolean
}
interface showDialogs {
    type: UtilsActionsTypes.SET_DIALOGS
    payload: boolean
}
interface setConfirmExit {
    type: UtilsActionsTypes.SET_CONFIRM_EXIT
    payload: boolean
}
interface setSocket {
    type: UtilsActionsTypes.SET_SOCKET
    payload: any
}
interface setLoginAuth {
    type: UtilsActionsTypes.SET_LOGIN_AUTH
    payload: boolean
}
interface setRegisterAuth {
    type: UtilsActionsTypes.SET_REGISTER_AUTH
    payload: boolean
}
interface setSeePassword {
    type: UtilsActionsTypes.SET_SEE_PASSWORD,
    payload: boolean
}
interface setConfirmEmail {
    type: UtilsActionsTypes.SET_CONFIRM_EMAIL,
    payload: boolean
}


export type UtilsActions = setLoginAuth | setRegisterAuth | setSeePassword
|setConfirmEmail |setSocket | setConfirmExit
| showEmail | showPinnedDialogs | showDialogs
|setShopSetInp | setValueStatus | setLoadingAvatar
|setHavePhotoChat | setLoadingPhotoChat |setUrlPhotoChat
|setOpenManager | setNameTodoV | setNameSubTodoV
| setNameDescriptionV | setSubTodoNameV | setCreateTodo
|setShowTodo
