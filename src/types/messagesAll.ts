import {User} from "./user";

export interface messagesAllState {
    error: null | string
    findUserSearch: any | null
    loading: boolean
    searchValue: string
}
export enum messagesAllActionsType {
    SEARCH_USER = 'SEARCH_USER',
    SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS',
    SEARCH_USER_ERROR = 'SEARCH_USER_ERROR',
    SET_VALUE_SEARCH = 'SET_VALUE_SEARCH' 
}
 
interface searchUser {
    type: messagesAllActionsType.SEARCH_USER
}
interface searchUserSuccess {
    type: messagesAllActionsType.SEARCH_USER_SUCCESS
    payload: User
}
interface searchUserError {
    type: messagesAllActionsType.SEARCH_USER_ERROR
    payload: string
}
interface setValueSearch {
    type: messagesAllActionsType.SET_VALUE_SEARCH
    payload: string
}
export type messagesAllActions = searchUser | searchUserSuccess | searchUserError
| setValueSearch  
