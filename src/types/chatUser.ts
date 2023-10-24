import {User} from "./user";

export interface IMessage {
    userNameEmit: string
    idChat: string
    userNameOn: string
    text: string
    data?: string
    isRead: boolean
    userEmitAvatarSrc: string
    userOnAvatarSrc: string
    photoURL?: string
    recordedURL?: string
}

export interface ChatUserState {
    chatUser: User  | null
    loading: boolean
    idChat: string | null
    messages: IMessage[]
    inpValue: string
    calls: boolean
    typedMe: boolean
    typed: boolean
    recorded: boolean
    recordedUrl: string
}
export enum ChatUserActionsType {
    SET_CHAT_USER = 'SET_CHAT_USER',
    SET_LOADING_CHAT_USER = 'SET_LOADING_CHAT_USER',
    SET_ID_CHAT = 'SET_ID_CHAT',
    SET_MESSAGES = 'SET_MESSAGES',
    SET_INP_VALUE = 'SET_INP_VALUE',
    SET_NOW_CHAT_USER = 'SET_NOW_CHAT_USER',
    CLEAR_MESSAGES = 'CLEAR_MESSAGES',
    SET_CALL_MESSAGE = 'SET_CALL_MESSAGE',
    SET_ALL_MESSAGES = 'SET_ALL_MESSAGES',
    SET_TYPED_ME = 'SET_TYPED_ME',
    SET_TYPED = 'SET_TYPED',
    SET_RECORDED = 'SET_RECORDED',
    SET_RECORDED_URL = 'SET_RECORDED_URL'
}

interface setRecordedURL {
    type: ChatUserActionsType.SET_RECORDED_URL
    payload: string
}
interface setRecorded {
    type: ChatUserActionsType.SET_RECORDED
    payload: boolean
}
interface setTyped {
    type: ChatUserActionsType.SET_TYPED
    payload: boolean
}
interface setTypedMe {
    type: ChatUserActionsType.SET_TYPED_ME
    payload: boolean
}
interface setCallMessage {
    type: ChatUserActionsType.SET_CALL_MESSAGE
    payload: boolean
}
interface setAllMessages {
    type: ChatUserActionsType.SET_ALL_MESSAGES
    payload: any[]
}
interface clearMessages {
    type: ChatUserActionsType.CLEAR_MESSAGES
}
interface  setNowChatUser {
    type: ChatUserActionsType.SET_NOW_CHAT_USER
    payload: any
}
interface setInputValue {
    type: ChatUserActionsType.SET_INP_VALUE
    payload: string
}
interface setMessages {
    type: ChatUserActionsType.SET_MESSAGES
    payload: any
}
interface setIdChat {
    type: ChatUserActionsType.SET_ID_CHAT
    payload: string
}
interface setChatUser {
    type: ChatUserActionsType.SET_CHAT_USER
    payload: User | null
}
interface setLoadingChatUser {
    type: ChatUserActionsType.SET_LOADING_CHAT_USER
    payload: boolean
}
export type ChatUserActions = setChatUser | setLoadingChatUser | setIdChat
| setMessages | setInputValue | setNowChatUser
|clearMessages | setAllMessages |setCallMessage
|setTyped | setTypedMe | setRecorded
| setRecordedURL