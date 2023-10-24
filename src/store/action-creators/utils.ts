import {Dispatch} from "react";
import {UtilsActions, UtilsActionsTypes} from "../../types/utils";
import {v4} from 'uuid'
import {ChatUserActionsType} from "../../types/chatUser";
import {UserActionsTypes} from "../../types/user";


export const setLogin = (value: boolean) => (dispatch: Dispatch<UtilsActions>) => dispatch({ type: UtilsActionsTypes.SET_LOGIN_AUTH, payload: value }),
    setRegister = (value: boolean)  => (dispatch: Dispatch<UtilsActions>) => dispatch({type: UtilsActionsTypes.SET_REGISTER_AUTH, payload: value}),
    setSeePassword = (value: boolean) => (dispatch: Dispatch<UtilsActions>) => dispatch({type: UtilsActionsTypes.SET_SEE_PASSWORD, payload: value}),
    setConfirmEmail = (value: boolean) => (dispatch: Dispatch<UtilsActions>) => dispatch({type: UtilsActionsTypes.SET_CONFIRM_EMAIL, payload: value}),
    setSocket = (socket: any) => (dispatch: Dispatch<UtilsActions>) => dispatch({type: UtilsActionsTypes.SET_SOCKET, payload: socket}),
    changeUserSearch = (socket: any, nameUser:string, nameChatUser: string, chatUserL: string = '') => (dispatch: Dispatch<any>) => {
        const idChatMessages = v4() //1b738d3f-724f-4094-b784-058a6252ae05
        socket.emit('CLIENT:USER_CHANGE_CHAT', {
            query: {
                'roomId': idChatMessages,
                'userName': nameUser,
                'userI': nameUser,
                'userChatName': nameChatUser,
                'userNameOn': chatUserL
            }
        })
        dispatch({type: ChatUserActionsType.SET_ID_CHAT, payload: idChatMessages})
        dispatch({type: ChatUserActionsType.CLEAR_MESSAGES})
        //TODO: ДОДЕЛАТЬ МАССИВ СООБЩЕНИЙ И ПРИ СОБЫТИИ СМЕНЫ ЧАТА ОТЧИЩАТЬ МАССИВ
    },
    changeChatUser = (socket: any, chatID: string, userNameOn: string ='', userI:string = '' ) => (dispatch: Dispatch<any>) => {
        socket.emit('CLIENT:USER_CHANGE_CHAT', {query: {
                'roomId': chatID,
                'userI': userI, //Я
                'userNameOn': userNameOn, // старый пользователь
            }})
        dispatch({type: ChatUserActionsType.SET_ID_CHAT, payload: chatID})
        dispatch({type: ChatUserActionsType.CLEAR_MESSAGES})
        ;(async () => {
            const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/messages/getMessages', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({idMessages: chatID})
                }),
                dialog = await responce.json()
                dispatch({type: ChatUserActionsType.SET_ALL_MESSAGES, payload: dialog.messages})
        })()
    },
    setShowConfrimExit = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_CONFIRM_EXIT, payload: value}),
    setShowEmail = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_SHOW_EMAIL, payload: value}),
    setShowDialogs = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_DIALOGS, payload: value}),
    setShowPinned = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_SHOW_PINNED, payload: value}),
    setShowSetInp = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_SHOW_SET_INP, payload: value}),
    setValueStatus = (value: string) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_VALUE_STATUS, payload: value}),
    setStatus = (value: string, name: string) => (dispatch: Dispatch<any>) => {
        if(value.length > 14) return
        dispatch({type: UserActionsTypes.SET_STATUS, payload: value})
        ;(async () => {
            await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/setStatus', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({name, status: value})
                })
        })()
    },
    setAvatar = (name: string, e:any)  => (dispatch: Dispatch<any>) => {
        try {
            dispatch({type: UtilsActionsTypes.SET_LOADING_AVATAR, payload: true})
            const formData = new FormData()
            formData.append('picture', e.target.files[0])
            formData.append('name', name)
            ;(async () => {
                const response = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/setAvatar', {
                    method: "POST",
                    body: formData
                }),
                     path = await response.json()
                dispatch({type: UserActionsTypes.SET_AVATAR, payload: path.path})
                dispatch({type: UtilsActionsTypes.SET_LOADING_AVATAR, payload: false})
            })()

        } catch (e) {
            console.log(e)
        }
    },
    uploadChatPhoto = (e:any) => (dispatch: Dispatch<any>) => {
        try {
            dispatch({type: UtilsActionsTypes.SET_LOADING_PHOTO_CHAT, payload: true})
            const formData = new FormData()
            formData.append('picture', e.target.files[0])
            ;(async () => {
                const response = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/uploadPhoto', {
                    method: "POST",
                    body: formData
                })
                const path = await response.json()
                dispatch({type: UtilsActionsTypes.SET_URL_PHOTO_CHAT, payload: path.path})
                dispatch({type: UtilsActionsTypes.SET_HAVE_PHOTO_CHAT, payload: true})
                dispatch({type: UtilsActionsTypes.SET_LOADING_PHOTO_CHAT, payload: false})
            })()

        } catch (e) {
            console.log(e)
        }
    },
    setOpenManager = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_OPEN_MANAGER, payload: value}),
    setSubTodo = (e:any) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SUB_TODO_NAME_V, payload: e.target.value}),
    setNameTodo = (e:any) => (dispatch: Dispatch<any>) =>dispatch({type: UtilsActionsTypes.SET_NAME_TODO_V, payload: e.target.value}),
    setDescriptionTodo = (e:any) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.NAME_DESCRIPTION_V, payload: e.target.value}),
    setNameSubTodo = (e: any) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.NAME_SUB_TODO_V, payload: e.target.value}),
    setLocalTodoCreate = (todo: any) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_LOCAL_TODO_CREATE, payload: todo}),
    createTodo = (todo:any) => (dispatch: Dispatch<any>) => {
        dispatch({type: UserActionsTypes.ADD_TODO, payload: todo})
        dispatch({type: UtilsActionsTypes.SET_LOCAL_TODO_CREATE, payload: {}})
    },
    showTodo = (value: boolean) => (dispatch: Dispatch<any>) => dispatch({type: UtilsActionsTypes.SET_SHOW_TODO, payload: value}),
    setTodosinit = (todos: any, name: string) => () =>{
        try {
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/setTodosinit', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({todos, name})
                })
            })()
        } catch (e) {
            console.log(e)
        }
    }
