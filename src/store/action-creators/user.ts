import {Dispatch} from "react";
import {User, userActions, UserActionsTypes} from "../../types/user";
import {UtilsActionsTypes} from "../../types/utils";
import {ChatUserActionsType, IMessage} from "../../types/chatUser";
import {useTransformTime} from "../../hooks/useTransformTime";

export interface RegisterProps {
    name: string
    email: string
    password: string
}
export interface LoginProps {
    email: string
    password: string
}

export const registerUser = ({ name, email, password }: RegisterProps) => {
    return (dispatch: Dispatch<any>) => {
        try {
            dispatch({ type: UserActionsTypes.FETCH_USER_REGISTER })
            ;(async () => {
                const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/registration', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ name, email, password })
                }),
                    userR = await responce.json()

                if (userR.error) {
                    dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: userR })
                } else {
                    const {user, accessToken} = userR
                    dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_SUCCESS, payload: { ...user, isAuth: user.isActivated, loadingAvatar: false,id: `${user._id}` } })
                    localStorage.setItem('token', accessToken)
                    !user.isActivated && dispatch({type: UtilsActionsTypes.SET_REGISTER_AUTH, payload: false})
                    user.isActivated && window.location.reload()
                }
            })()
        } catch (e) {
            dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: `${e}` })
        }
    }
},
     loginInLocalStorage = (token: string) => {
    return (dispatch: Dispatch<userActions>) => {
        try {
            dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_STORAGE })
            ;(async () => {
                    const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/getUser', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({ token })
                    }),
                        userR = await responce.json()
                    if (userR.error) {
                        dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: userR })
                    } else {
                        const {user, token} = userR
                        dispatch({ type: UserActionsTypes.FETCH_USER_LOCAL_STORAGE_SUCCESS, payload: { ...user, loadingAvatar: false, isAuth: user.isActivated,id: `${user._id}` } })
                        localStorage.setItem('token', token)
                    }
                })()
        } catch (e) {
            dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: `${e}` })
        }
    }
},
    exitUser = (socket?:any) => {
        return (dispatch: Dispatch<any>) => {
            try {
                dispatch({ type: UserActionsTypes.EXIT_USER })
                dispatch({type: UtilsActionsTypes.SET_CONFIRM_EMAIL, payload: false})
                localStorage.removeItem('token')
                socket?.disconnect()
            } catch (e) {
                dispatch({ type: UserActionsTypes.FETCH_USERS_REGISTER_ERROR, payload: `${e}` })
            }
        }
    },
    loginUserA = ({email, password}:LoginProps ) => {

    return (dispatch: Dispatch<any>) => {

        try {
            ;(async () => {
                dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN })
                const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/login', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({ email, password })
                }),
                    userR = await responce.json()

                if (userR.error) {
                    dispatch({ type: UserActionsTypes.FETCH_USER_ERROR_LOGIN, payload: userR })
                } else {
                    const {user, accessToken} = userR
                    dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN__SUCCESS, payload: { ...user, loadingAvatar: false, isAuth: user.isActivated,id: `${user._id}` } })
                    localStorage.setItem('token', accessToken)
                    !user.isActivated && dispatch({type: UtilsActionsTypes.SET_LOGIN_AUTH, payload: false})
                    user.isActivated && window.location.reload()
                }
            })()
        } catch (e) {
            dispatch({ type: UserActionsTypes.FETCH_USER_ERROR_LOGIN, payload: `${e}` })
        }
    }
},
    loginGoogle = (name: string, email: string) => {
        return (dispatch: Dispatch<any>) => {
            try {
                ;(async() => {
                    dispatch({ type: UserActionsTypes.FETCH_USER_LOGIN_GOOGLE })
                    const responce = await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/loginGoogle', {
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ name, email })
                    }),
                        userR = await responce.json(),
                        {tokens, user} = userR
                    dispatch({ type: UserActionsTypes.FETCH_USER_SUCCESS_LOGIN_GOOGLE, payload: { ...user, loadingAvatar: false, isAuth: user.isActivated,id: `${user._id}` }})
                    localStorage.setItem('token', tokens.accessToken)
                    user.isActivated && window.location.reload()
                })()
            } catch (e) {
                console.log(e)
            }
        }
    },
    messageResponce = (message: IMessage, user: User, chatUser:string, inChat:boolean = false, messages?:any[], chatUserI?:User ) => async (dispatch: Dispatch<any>) => {
        const newChats = user.chats.filter((chat: any) => chat.name !== chatUser),
        	newChatsI = [...newChats, {...message, name: message.userNameEmit !== user?.name ? message.userNameEmit : message.userNameOn}]
        dispatch({type: UserActionsTypes.USER_SET_ALL_CHATS, payload: newChatsI })
        if(inChat && messages?.length !== 0) dispatch({type: ChatUserActionsType.SET_MESSAGES, payload:  message})
        try {
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/setChats', {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({name: user.name, chats: newChatsI})
                })
					 if(!inChat && chatUserI) {
						const newChatsIa = chatUserI.chats.filter((chat: any) => chat.name !== user.name),
							newChatsITw = [...newChatsIa, {...message, name: message.userNameEmit !== chatUser ? message.userNameEmit : message.userNameOn}]
						await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/setChats', {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({name: chatUser, chats: newChatsITw})
                })
					 }
            })()
        } catch (e) {
            console.log(e)
        }
},
    initDialogs = (chats: any[],chatUser: string,messages:any[] ) => async (dispatch: Dispatch<any>) => {

        await chats.map( async (chat: any) => {
            if(!chat.data.includes('GMT')) return chat
            chat.data = await useTransformTime(chat.data)
            return chat
        })
        if(chatUser) {

            await messages.map( async (message: any) => {
                if(!message.data.includes('GMT')) return message
                message.data = await useTransformTime(message.data)
                return message
            })
            delete messages[messages.length]
            dispatch({type: ChatUserActionsType.SET_ALL_MESSAGES, payload: messages})
        }

        dispatch({type: UserActionsTypes.USER_SET_ALL_CHATS, payload: chats })
    },
    setPinnedChats = (chats: any[],pinnedChats: any[], chatUserName: string, userName: string) => async (dispatch: Dispatch<any>) => {
        let used = false
        await pinnedChats.forEach((chat: any) => {
            if(chat.name === chatUserName) return used = true
        })
        if(!used) {
            await chats.forEach((chat: any) => {
                if(chat.name === chatUserName) {
                    dispatch({type: UserActionsTypes.SET_PINNED_CHATS, payload: chat})
                    ;(async () => {
                        await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/updatePinnedChats', {
                            headers: {
                                "Content-Type": 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify({name: userName, pinnedChats:[...pinnedChats, chat]})
                        })
                    })()
                }
            })
        }
    },
    setData = (isComplete:boolean, data: any, name: string) => (dispatch: Dispatch<any>) => {
        if(isComplete) {
            dispatch({type: UserActionsTypes.SET_DATA, payload: [...data, { name: `${data.length + 1}`, completed: 1, ongoing: 0, amt: 0 }]})
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/updateData', {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({name: name, data:[...data, { name: `${data.length + 1}`, completed: 1, ongoing: 0, amt: 0 }]})
                })
            })()
        } else {
            dispatch({type: UserActionsTypes.SET_DATA, payload: [...data, { name: `${data.length + 1}`, completed: 0, ongoing: 1, amt: 0 }]})
            ;(async () => {
                await fetch('https://safe-escarpment-65791.herokuapp.com/api/user/updateData', {
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({name: name, data:[...data, { name: `${data.length + 1}`, completed: 0, ongoing: 1, amt: 0 }]})
                })
            })()
        }

    }


