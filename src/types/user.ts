export interface User {
    id: string
    name: string
    email: string
    password?: string
    isAuth: boolean
    token: string
    chats: any[]
    nowChat: string
    pinnedChats: any[]
    activationLink?: string
    todo: any[]
    data: any[]
    status: string
    online: string
    loadingAvatar: boolean
    avatarSRC: string
}
export interface userState {
    user: User | null,
    loading: boolean,
    errorUS: any | null
    loadingStorage: boolean

}
export enum UserActionsTypes {
    FETCH_USER_REGISTER = 'FETCH_USER_REGISTER',
    FETCH_USER_LOCAL_STORAGE = 'FETCH_USER_LOCAL_STORAGE',
    FETCH_USER_LOCAL_STORAGE_SUCCESS = 'FETCH_USER_LOCAL_STORAGE_SUCCESS',
    FETCH_USERS_REGISTER_SUCCESS = 'FETCH_USERS_REGISTER_SUCCESS',
    FETCH_USERS_REGISTER_ERROR = 'FETCH_USERS_REGISTER_ERROR',
    FETCH_USER_LOGIN_GOOGLE = 'FETCH_USER_LOGIN_GOOGLE',
    FETCH_USER_SUCCESS_LOGIN_GOOGLE = 'FETCH_USER_SUCCESS_LOGIN_GOOGLE',
    FETCH_USER_ERROR_LOGIN_GOOGLE = 'FETCH_USER_ERROR_LOGIN_GOOGLE',
    FETCH_USER_LOGIN = 'FETCH_USER_LOGIN',
    FETCH_USER_LOGIN__SUCCESS = 'FETCH_USER_LOGIN_SUCCESS',
    FETCH_USER_ERROR_LOGIN = 'FETCH_USER_ERROR_LOGIN',
    EXIT_USER = 'EXIT_USER',
    USER_SET_CHATS = 'USER_SET_CHATS',
    USER_SET_ALL_CHATS = 'USER_SET_ALL_CHATS',
    SET_PINNED_CHATS = 'SET_PINNED_CHATS',
    SET_STATUS = 'SET_STATUS',
    SET_AVATAR = 'SET_AVATAR',
    ADD_TODO = 'ADD_TODO',
    SET_DATA = 'SET_DATA'
}
interface setData {
    type: UserActionsTypes.SET_DATA
    payload: any
}
interface addTodo {
    type: UserActionsTypes.ADD_TODO
    payload: any
}
interface setAvatar {
    type: UserActionsTypes.SET_AVATAR
    payload: string
}
interface setStatus {
    type: UserActionsTypes.SET_STATUS
    payload: string
}
interface SetPinnedChats {
    type: UserActionsTypes.SET_PINNED_CHATS
    payload: any[]
}

interface UserSetAllChats {
    type: UserActionsTypes.USER_SET_ALL_CHATS
    payload: any
}

interface UserSetChats {
    type: UserActionsTypes.USER_SET_CHATS
    payload: any
}

interface FetchUserLocalStore {
    type:UserActionsTypes.FETCH_USER_LOCAL_STORAGE
}
interface FetchUserLocalStorageSuccess {
    type: UserActionsTypes.FETCH_USER_LOCAL_STORAGE_SUCCESS
    payload: User
}
interface FecthUserRegister {
    type: UserActionsTypes.FETCH_USER_REGISTER
}
interface FecthUserSuccessRegister {
    type: UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS
    payload: User
}
interface FecthUserErrorRegister {
    type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR
    payload: any
}

interface FecthUserLoginGoogle {
    type: UserActionsTypes.FETCH_USER_LOGIN_GOOGLE

}
interface FecthUserSuccessLoginGoogle {
    type: UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE
    payload: User
}
interface FecthUserErrorLoginGoogle {
    type: UserActionsTypes.FETCH_USER_ERROR_LOGIN_GOOGLE
    payload: any
}
interface FecthUserLogin {
    type: UserActionsTypes.FETCH_USER_LOGIN
}
interface FecthUserLoginSuccess {
    type: UserActionsTypes.FETCH_USER_LOGIN__SUCCESS
    payload: User
}
interface FecthUserErrorLogin {
    type: UserActionsTypes.FETCH_USER_ERROR_LOGIN
    payload: any
}
interface ExitUser {
    type: UserActionsTypes.EXIT_USER
}
export type userActions = FecthUserRegister | FecthUserSuccessRegister | FecthUserErrorRegister
|FecthUserLoginGoogle |FecthUserSuccessLoginGoogle | FecthUserErrorLoginGoogle
|FecthUserLogin | FecthUserLoginSuccess |FecthUserErrorLogin |ExitUser
|FetchUserLocalStore |FetchUserLocalStorageSuccess | UserSetChats
| UserSetAllChats | SetPinnedChats | setStatus
|setAvatar | addTodo | setData