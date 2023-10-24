import {ChatUserActions, ChatUserActionsType, ChatUserState} from "../../types/chatUser";


const initinalState: ChatUserState = {
    chatUser: null,
    loading: false,
    idChat: null, // мой чат в котором сейчас нахожусь
    messages: [],
    inpValue: '',
    calls: true,
    typed: false,
    typedMe: false,
    recorded: false,
    recordedUrl: ''
}

export const chatUserReducer = (state: ChatUserState = initinalState, action: ChatUserActions): ChatUserState => {
    switch (action.type){
        case ChatUserActionsType.SET_RECORDED_URL:
            return {...state, recordedUrl: action.payload}
        case ChatUserActionsType.SET_RECORDED:
            return {...state, recorded: action.payload}
        case ChatUserActionsType.SET_TYPED:
            return {...state, typed: action.payload}
        case ChatUserActionsType.SET_TYPED_ME:
            return {...state, typedMe: action.payload}
        case ChatUserActionsType.SET_CHAT_USER:
            return {...state, chatUser: action.payload}
        case ChatUserActionsType.SET_INP_VALUE:
            return {...state, inpValue: action.payload}
        case ChatUserActionsType.SET_LOADING_CHAT_USER:
            return {...state, loading: action.payload}
        case ChatUserActionsType.SET_ID_CHAT:
            return {...state, idChat: action.payload}
        case ChatUserActionsType.SET_NOW_CHAT_USER:
            //@ts-ignore
            return {...state, chatUser: action.payload}
        case ChatUserActionsType.SET_MESSAGES:
            return {...state, messages: [...state.messages, action.payload]}
        case ChatUserActionsType.CLEAR_MESSAGES:
            return {...state, messages: []}
        case ChatUserActionsType.SET_ALL_MESSAGES:
            return {...state, messages: action.payload}
        case ChatUserActionsType.SET_CALL_MESSAGE:
            return {...state, calls: action.payload}
        default:
            return state
    }
}