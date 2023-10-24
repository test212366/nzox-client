import {ChangeEvent, FC, useEffect} from 'react';
import Message from "./Message";
import {useActions, useTypeSelector} from "../hooks/redux";


import Navigation from "./Navigation";

interface MessagesAllProps {
    bookmarks?:boolean
	 slider?: any
}

const MessagesAll:FC<MessagesAllProps> = ({bookmarks,slider}) => {
    const {user} = useTypeSelector(state => state.user),
        {chatUser, messages, idChat} = useTypeSelector(state => state.chatUser),
        {searchValue, error, loading, findUserSearch} = useTypeSelector(state => state.messagesAll),
        {socket} = useTypeSelector(state => state.utils),
        {setValueSearch, findUser, setChatUser, changeUserSearch, changeChatUser, setReadMessages} = useActions()
     //utils

    useEffect(() => {
            if(messages.length !== 0 && !messages[messages.length - 1].isRead && chatUser?.nowChat !== idChat && messages[messages.length - 1].userNameEmit !== user?.name) setReadMessages(messages,idChat || '')
        }, [messages, idChat,setReadMessages])

    const setValue = (value: ChangeEvent<HTMLInputElement>) => setValueSearch(value.target.value),
        findUserFunc = () => findUser(searchValue ),
        setChatUserFunc = async () => {
            let used:boolean = false
            if(findUserSearch?.name === chatUser?.name) return
            used = await user?.chats.find((chat: any) => chat.name === findUserSearch?.name)
            if(!used) {
                changeUserSearch(socket, user!.name, findUser.name, chatUser?.name)
                setChatUser(findUserSearch, true)
					 slider.current && slider.current.slickGoTo(1)
            }
        },
        setChatUserIn = (chat:any) => {
				
            if(chat.name === chatUser?.name) return
            changeChatUser(socket, chat.idChat, chatUser?.name, user?.name)
            setChatUser(chat.userNameEmit !== user?.name ? chat.userNameEmit : chat.userNameOn, false)
				 slider.current && slider.current.slickGoTo(1)
        }



    return (
        <section className='phoneDisflex messages__all'>
            {window.innerWidth < 900 && <Navigation/>}
            <section className='wrapper__navig'>
                <div className="wrapper__select">
                    <p className="select__chats">{!bookmarks && 'Все чаты'}</p>
                    {!bookmarks &&  <div className="arrow">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                             width="15px" height="15px" viewBox="0 0 284.929 284.929"
                        >
                            <g>
                                <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
                            </g>

                        </svg>
                    </div>}
                </div>
                <h4 className= "home__messages">{bookmarks ? <>Закрепленные <span>({user?.pinnedChats.length})</span></> : <>Сообщения <span>({user?.chats.length})</span></>} </h4>
                {!bookmarks &&<> <div className="search">
                    <input type="text" className="home__input-search" placeholder={loading ? 'поиск пользователя...' : "поиск.."} value={searchValue} onChange={setValue} />
                    <div className="search__logo" onClick={findUserFunc}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                    {error ? <>
                            <div className="pinned__messages">
                                <p className="pinned">{error}</p>
                                <div className="pinned__logo find noneFind">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                            </div>
                            <hr className="findErrorHR" />
                        </>
                        : ''}
                    {findUserSearch &&
                        <>
                            <div className="pinned__messages">
                                <p className="pinned">найденные пользователи</p>
                                <div className="pinned__logo find findSVG">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                            </div>
                            <div onClick={setChatUserFunc}>
                                <Message data={''} avatarOn={''} sendYou={false} avatarEmit={findUserSearch.avatarSRC} isRead={true} text={''} name={findUserSearch.name} isFind={true}/>
                            </div>
                        </>
                    }
                </div>
                    <div className="pinned__messages">
                        <p className="pinned">закреплённые</p>
                        <div className="pinned__logo">
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50px" height="50px" viewBox="0 0 256 256"  >
                                <defs>
                                </defs>
                                <g>
                                    <g>
                                        <path d="M 84.303 82.191 l -6.492 -6.492 l -6.492 -6.492 c -1.077 -1.087 -2.175 -2.153 -3.235 -3.257 c -0.016 -0.009 -0.031 -0.017 -0.047 -0.025 l -2.154 -2.154 L 90 39.653 l -1.056 -1.056 c -9.367 -9.368 -23.457 -12.705 -36.139 -8.632 l -7.345 -7.344 c 0.929 -7.947 -1.815 -15.958 -7.422 -21.565 L 36.983 0 L 0 36.982 l 1.057 1.056 c 5.606 5.606 13.614 8.353 21.565 7.422 l 7.345 7.345 c -4.073 12.681 -0.737 26.772 8.631 36.139 L 39.653 90 l 24.117 -24.117 l 2.155 2.155 c 0.008 0.015 0.016 0.031 0.025 0.046 c 1.1 1.058 2.164 2.152 3.247 3.226 l 8.081 8.081 l 0 0 l 4.912 4.912 l 3.246 3.246 c 1.403 0.761 2.796 1.532 4.302 2.19 c -0.658 -1.506 -1.429 -2.899 -2.19 -4.302 L 84.303 82.191 z M 33.086 52.897 l 0.311 -0.886 l -9.714 -9.714 l -0.742 0.108 c -6.763 0.987 -13.633 -1.042 -18.681 -5.459 L 36.948 4.26 c 4.415 5.047 6.447 11.92 5.458 18.68 l -0.108 0.742 l 9.714 9.714 l 0.886 -0.311 c 11.361 -3.984 24.084 -1.387 32.853 6.593 L 39.678 85.75 C 31.698 76.981 29.102 64.254 33.086 52.897 z" strokeLinecap="round" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {user?.pinnedChats.length === 0 && <p className="startChats"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>закрепите свой первый чат</p>}
                        {user?.pinnedChats.map((chat: any, i:number) => <div key={i} onClick={() => setChatUserIn(chat)}><Message avatarOn={chat.userOnAvatarSrc} avatarEmit={chat.userEmitAvatarSrc} sendYou={chat.userNameEmit === user.name} text={'Ваш закрепленный чат'} name={chat.userNameEmit !== user.name ? chat.userNameEmit : chat.userNameOn} data={''} isRead={chat.isRead}/></div> )}
                    </div></>}
                <div className="all__messages">
                    <p className="pinned">{bookmarks ? 'Пользователи' : 'все сообщения'}</p>
                    {!bookmarks && user?.chats.length === 0 && <p className="startChats"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>найдите чат и начните общение</p>}
                    {!bookmarks && user?.chats.map((chat: any, i:number) => <div key={i} onClick={() => setChatUserIn(chat)}><Message avatarOn={chat.userOnAvatarSrc} avatarEmit={chat.userEmitAvatarSrc} sendYou={chat.userNameEmit === user.name} text={chat.text} name={chat.userNameEmit !== user.name ? chat.userNameEmit : chat.userNameOn} data={chat.data} isRead={chat.isRead}/></div> )}
                    {bookmarks && user?.pinnedChats.length === 0 && <p className="startChats"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" /></svg>закрепите свой первый чат</p>}
                    {bookmarks && user?.pinnedChats.map((chat: any, i:number) => <div key={i} onClick={() => setChatUserIn(chat)}><Message avatarOn={chat.userOnAvatarSrc} avatarEmit={chat.userEmitAvatarSrc} sendYou={chat.userNameEmit === user.name} text={'Ваш закрепленный чат'} name={chat.userNameEmit !== user.name ? chat.userNameEmit : chat.userNameOn} data={''} isRead={chat.isRead}/></div> )}
                </div>

            </section>

        </section>

    )
}
export default MessagesAll