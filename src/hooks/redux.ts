import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from 'redux'
import actionCreators from "../store/action-creators";
import {RootState} from "../store/reducers";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
},
    useTypeSelector: TypedUseSelectorHook<RootState> = useSelector