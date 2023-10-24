import {userActions, UserActionsTypes, userState} from "../../types/user";

const initinalState: userState = {
    user: null,
    loading: false,
    errorUS: null,
    loadingStorage: false,

}
export const userReducer = (state: userState = initinalState, action: userActions):userState =>{
    switch (action.type) {
        case UserActionsTypes.FETCH_USER_LOCAL_STORAGE:
            return {...state, loadingStorage: true}
        case UserActionsTypes.FETCH_USER_LOCAL_STORAGE_SUCCESS:
            return {...state, loadingStorage: false, user: action.payload}
        case UserActionsTypes.FETCH_USER_REGISTER:
            return {...state, loading: true}
        case UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS:
            return {...state, loading: false, user: action.payload}
        case UserActionsTypes.FETCH_USERS_REGISTER_ERROR:
            return {...state, loading: false, errorUS: action.payload}
        case UserActionsTypes.FETCH_USER_LOGIN:
            return {...state, loading: true}
        case UserActionsTypes.FETCH_USER_LOGIN__SUCCESS:
            return {...state, loading: false, user: action.payload}
        case UserActionsTypes.FETCH_USER_ERROR_LOGIN:
            return {...state, loading: false, errorUS: action.payload}
        case UserActionsTypes.FETCH_USER_LOGIN_GOOGLE:
            return {...state, loading: true}
        case UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE:
            return {...state, loading: false, user: action.payload}
        case UserActionsTypes.FETCH_USER_ERROR_LOGIN_GOOGLE:
            return {...state, loading: false, errorUS: action.payload}
        case UserActionsTypes.EXIT_USER:
            return {...state, user: null}
        case UserActionsTypes.SET_DATA:
            //@ts-ignore
            return {...state, user: {...state.user, data: action.payload}}
        case UserActionsTypes.ADD_TODO:
            //@ts-ignore
            return {...state, user: {...state.user, todo: action.payload}}
        case UserActionsTypes.SET_PINNED_CHATS:
            //@ts-ignore
            return {...state, user: {...state.user, pinnedChats: [...state.user?.pinnedChats, {...action.payload}]}}
        case UserActionsTypes.USER_SET_CHATS:
            //@ts-ignore
            return {...state, user: {...state.user, chats: action.payload}}
        case UserActionsTypes.USER_SET_ALL_CHATS:
            //@ts-ignore
            return {...state, user: {...state.user, chats: action.payload}}
        case UserActionsTypes.SET_STATUS:
            //@ts-ignore
            return {...state, user: {...state.user, status: action.payload}}
        case UserActionsTypes.SET_AVATAR:
            //@ts-ignore
            return {...state, user: {...state.user, avatarSRC: action.payload}}
        default:
            return state
    }
}