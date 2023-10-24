import {useEffect} from 'react';
import {useActions, useTypeSelector} from "../hooks/redux";
import {IMessage} from "../types/chatUser";


const SocketTs = () => {
    const {user} = useTypeSelector(state => state.user),
        {chatUser,inpValue, messages, calls, idChat} = useTypeSelector(state => state.chatUser),
        {socket} = useTypeSelector(state => state.utils),
        {messageResponce, setIdChatUser, setTyped, setReadMessages} = useActions(),
        audioSend = new Audio(require('../assets/live_chat_001_38569.mp3'))
//utils
    const messageNoChat = (message: IMessage) => {
            messageResponce(message, user!, message.userNameEmit !== user?.name ? message.userNameEmit : message.userNameOn, false, [], chatUser!)
        },
        setTypedF = (data:any) => {
            if(data.userTyped === chatUser?.name) setTyped(data.value)
        },
        messageResponceInChat = async (message: IMessage) => {
            if(message.userNameEmit !== user?.name && calls) await audioSend.play()
 
            messageResponce(message, user!, message.userNameEmit !== user?.name ? message.userNameEmit : message.userNameOn,true, messages, chatUser!)
        },
        changeChat = (data: any) => {
            if(data.userAddedChat === chatUser?.name) {
                setIdChatUser({ ...chatUser, nowChat: data.roomId})
                if(!messages[messages.length - 1].isRead) setReadMessages(messages, idChat || '')
            }
        }
    useEffect(() => {
        if(!socket) return
        socket.on('SERVER:RESPONCE_MESSAGE_NO_IN_CHAT', messageNoChat )
        socket.on('SERVER:RESPONCE_CHAT_MESSAGE', messageResponceInChat )
        socket.on('SERVER:RESPONCE_USER_CHANGE_CHAT',changeChat )
        socket.on('SERVER:RESPONCE_TYPED', setTypedF)
        return () => {
            socket.removeListener('SERVER:RESPONCE_MESSAGE_NO_IN_CHAT', messageNoChat)
            socket.removeListener('SERVER:RESPONCE_TYPED', setTypedF)
            socket.removeListener('SERVER:RESPONCE_CHAT_MESSAGE', messageResponceInChat)
            socket.removeListener('SERVER:RESPONCE_USER_CHANGE_CHAT', changeChat)
        }
    } ,[socket, chatUser?.nowChat,inpValue, user?.chats, messages, idChat, changeChat, messageResponceInChat, setTypedF,messageNoChat])



    return (<section></section>)
}
export default SocketTs