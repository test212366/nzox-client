import {Dispatch} from "react";

import {ChatUserActions, ChatUserActionsType, IMessage} from "../../types/chatUser";
import { messagesAllActionsType} from "../../types/messagesAll";
import {useTransformTime} from "../../hooks/useTransformTime";
import {UtilsActionsTypes} from "../../types/utils";


export const setChatUser = (chatUser:any, search?:boolean) => (dispatch: Dispatch<any>) => {

    try {
        dispatch({type: ChatUserActionsType.SET_INP_VALUE, payload: ''})
        if(search) {
            dispatch({type: messagesAllActionsType.SEARCH_USER_SUCCESS, payload: null})
            return dispatch({type: ChatUserActionsType.SET_CHAT_USER, payload: chatUser})
        }
        ;(async () => {
            dispatch({type: ChatUserActionsType.SET_LOADING_CHAT_USER, payload: true})
            const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/getUserSearch', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    //@ts-ignore
                    body: JSON.stringify({ name: chatUser})
                }),
                user = await responce.json()

            const time = await useTransformTime(user.online)
            //сделать в одном dispatch
            dispatch({type: ChatUserActionsType.SET_CHAT_USER, payload: {...user, online: time !== 'ne в ' ? time : 'online'}})
            dispatch({type: ChatUserActionsType.SET_LOADING_CHAT_USER, payload: false})
        })()
        dispatch({type: messagesAllActionsType.SEARCH_USER_SUCCESS, payload: null})
    } catch (e) {
        console.log(e)
    }
},
    setInpValueMess = (value: string) => (dispatch: Dispatch<ChatUserActions>) => dispatch({type: ChatUserActionsType.SET_INP_VALUE, payload: value}),
    sendMessage = (message: IMessage, socket: any, userChatID:string) => (dispatch: Dispatch<any>) => {

        try {

            dispatch({type: ChatUserActionsType.SET_INP_VALUE, payload: ''})
            //
            if(userChatID !== message.idChat) {
                socket.emit('CLIENT:SEND_MESSAGE_NO_IN_CHAT', message )
            }
            else {
                 socket.emit('CLIENT:SEND_MESSAGE_IN_CHAT', message )
            }
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/messages/updateMessages', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({idMessages: message.idChat, message})
                })
            })()
            if(message.photoURL  ) {
                dispatch({type: UtilsActionsTypes.SET_HAVE_PHOTO_CHAT, payload: false})
                dispatch({type: UtilsActionsTypes.SET_URL_PHOTO_CHAT, payload: ''})
            }
            if(message.recordedURL) {
                dispatch({type: UtilsActionsTypes.SET_HAVE_PHOTO_CHAT, payload: false})
                dispatch({type: ChatUserActionsType.SET_RECORDED_URL, payload: ''})
            }
        } catch (e) {
            console.log(e)
        }

    },
    setIdChatUser =  (user:any) => (dispatch: Dispatch<any>) => dispatch({type: ChatUserActionsType.SET_NOW_CHAT_USER, payload: user}),
    setCalls = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: ChatUserActionsType.SET_CALL_MESSAGE, payload: value}),
    setTypedMe = (value: boolean, socket: any, idChat: string, name: string) =>(dispatch: Dispatch<any>) =>{
        dispatch({type: ChatUserActionsType.SET_TYPED_ME, payload: value})
        if(idChat) socket.emit('CLIENT:TYPED', {idChat, userTyped: name, value})
    }  ,
    setTyped = (value: boolean) =>(dispatch: Dispatch<any>) => dispatch({type: ChatUserActionsType.SET_TYPED, payload: value}),
    recorderStart = (setMedia: any) => (dispatch: Dispatch<any>) => {
        //@ts-ignore
        window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.webkitGetUserMedia
        //@ts-ignore
        navigator.getUserMedia({ audio: true }, (stream: any) => {
            const recorder = new MediaRecorder(stream)
            recorder.start()
            setMedia(recorder)
            recorder.onstart = () => {
               dispatch({type: ChatUserActionsType.SET_RECORDED, payload: true})
            }
            recorder.onstop = () => {
                dispatch({type: ChatUserActionsType.SET_RECORDED, payload: false})
            }
            recorder.ondataavailable = async (e: any) => {
                 window.URL.createObjectURL(e.data)
                 const file = new File([e.data], 'audio.ogg'),
                    formData = new FormData()
                formData.append("audio", file)

                dispatch({type: UtilsActionsTypes.SET_LOADING_PHOTO_CHAT, payload: true})
                const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/uploadAudio', {
                        method: "POST",
                        body: formData
                    }),
                    dataResponce = await responce.json()
                dispatch({type: ChatUserActionsType.SET_RECORDED_URL, payload: dataResponce.url})
                dispatch({type: UtilsActionsTypes.SET_LOADING_PHOTO_CHAT, payload: false})
                dispatch({type: UtilsActionsTypes.SET_HAVE_PHOTO_CHAT, payload: true})
            }
            return recorder
        }, (err: any) => console.log("FollowError " + err))
    },
    recorderStop = (mediaRecorder: any) => () => {
        mediaRecorder.stop()
    },
    setReadMessages =(messages: any[], idChat: string) => (dispatch: Dispatch<any>) => {
        messages.map(message => {
              message.isRead = true
            return message
        })
        dispatch({type: ChatUserActionsType.SET_ALL_MESSAGES, payload: messages})
        try {
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/messages/setAllMessages', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({idMessages: idChat, messages})
                })
            })()
        } catch (e) {
            console.log(e)
        }
    }