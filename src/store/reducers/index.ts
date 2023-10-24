import {combineReducers} from 'redux'
import {userReducer} from "./userReducer";
import {UtilsReducer} from "./utilsReducer";
import {messagesAllReducer} from "./messagesAll";
import {chatUserReducer} from "./chatUserReducer";

export const rootReducers = combineReducers({
    user: userReducer,
    utils: UtilsReducer,
    messagesAll: messagesAllReducer,
    chatUser: chatUserReducer
})
export type RootState = ReturnType<typeof rootReducers>