import {messagesAllActions, messagesAllActionsType, messagesAllState} from "../../types/messagesAll";


const initinalState: messagesAllState = {
    searchValue: '',
    findUserSearch: null,
    loading: false,
    error: null
}
export const messagesAllReducer = (state:messagesAllState = initinalState, action: messagesAllActions):messagesAllState => {
    switch (action.type) {
        
        case messagesAllActionsType.SET_VALUE_SEARCH:
            return {...state, searchValue: action.payload}
        case messagesAllActionsType.SEARCH_USER:
            return {...state, loading: true}
        case messagesAllActionsType.SEARCH_USER_SUCCESS:
            return {...state, loading: false, findUserSearch: action.payload, error: null}
        case messagesAllActionsType.SEARCH_USER_ERROR:
            return {...state, loading:false, error: action.payload}
        default:
            return state
    }
}