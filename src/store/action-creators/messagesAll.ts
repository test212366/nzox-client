import {Dispatch} from "react";
import {messagesAllActions, messagesAllActionsType} from "../../types/messagesAll";
import {useTransformTime} from "../../hooks/useTransformTime";

export const setValueSearch = (value: string) => (dispatch: Dispatch<messagesAllActions>) => dispatch({type: messagesAllActionsType.SET_VALUE_SEARCH, payload: value}),
    findUser = (name: string ) => (dispatch: Dispatch<messagesAllActions>) => {
        try {
            if(!name) return
            dispatch({type: messagesAllActionsType.SEARCH_USER})
            dispatch({type: messagesAllActionsType.SET_VALUE_SEARCH, payload: ''})
            ;(async () => {
                const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/findUser', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ name })
                    }),
                    userR = await responce.json()
                if(userR.error) return dispatch({type: messagesAllActionsType.SEARCH_USER_ERROR, payload: userR.error})
					 if(userR.online === 'online' || !userR.online) dispatch({type: messagesAllActionsType.SEARCH_USER_SUCCESS, payload: userR})
					 else {
						const time = await useTransformTime(userR.online)
						dispatch({type: messagesAllActionsType.SEARCH_USER_SUCCESS, payload: {...userR, online: time}})
					 }
					
            })()
        } catch (e) {
            console.log(e)
        }
    } 