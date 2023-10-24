import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {useActions, useTypeSelector} from "../hooks/redux";
import {exitUser} from "../store/action-creators/user";
import Message from "../components/Message";
import Navigation from "../components/Navigation";

const Settings:FC = () => {
    const {user} = useTypeSelector(state => state.user),
        {showConfirmExit, socket, showEmail, showPinnedDialogs, showDialogs} = useTypeSelector(state => state.utils),
        {setShowConfrimExit,exitUser, setShowEmail, setShowPinned, setShowDialogs} = useActions()



    const showConfirmExitF = () => setShowConfrimExit(!showConfirmExit),
        exit = () => exitUser(socket),
        showEmailF = () => setShowEmail(!showEmail),
        showPinnedF = () => setShowPinned(!showPinnedDialogs),
        showDialogsF = () => setShowDialogs(!showDialogs)
    return (
        <>
            <section className={'phoneDisflex'}>
                {window.innerWidth < 900 && <Navigation/>}
                <section className='settings__center'>
                    <div className='settingsItem'>
                        <NavLink to='/contacts' className='noneViewProfile'>
                            <div className='settings__user'>
                                <div className="user__first-info">
                                    <div className="settings__id">
                                        <p> <span>@</span>{user?.id}</p>
                                    </div>
                                    <div className="user__photo">
                                        <img src={user?.avatarSRC ? user.avatarSRC : 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'} width='80px' height='80px' alt="userPhoto" />
                                        <div className="online BIG"></div>
                                    </div>
                                </div>

                                <div className="user__info ml-1">
                                    <div className="settings__name">
                                        {user?.name}
                                    </div>
                                    <div className='settings__status'>
                                        {user?.status ? user.status : "Установите статус"}
                                    </div>
                                    <div className="settings__info">
                                        нажмите что-бы посмотреть профиль
                                    </div>
                                </div>

                            </div>
                        </NavLink>
                        <div className={`settings__buttons `}>
                            <div className={`acardion__item  `} >
                                <button onClick={showDialogsF}>Список диалогов
                                    <div className={['arrow', showDialogs ? 'rotate' : ""].join(' ')}>
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
                                    </div>
                                </button>
                                <div className={['settings__show-accordion', showDialogs ? 'show-accordion' : ""].join(' ')}>
                                    {user?.chats.length === 0 ? <p className={`noneAccordion `}>нет диалогов...</p> : ""}
                                    {user?.chats.map((chat: any, i:number) =>  <Message avatarOn={chat.userOnAvatarSrc} avatarEmit={chat.userEmitAvatarSrc} key={i} sendYou={chat.userNameEmit === user.name} text={chat.text} name={chat.userNameEmit !== user.name ? chat.userNameEmit : chat.userNameOn} data={chat.data} isRead={chat.isRead}/>  )}

                                </div>
                            </div>

                            <div className={`acardion__item `}>
                                <button onClick={showPinnedF}>Список закрепленных диалогов
                                    <div className={['arrow', showPinnedDialogs ? 'rotate' : ""].join(' ')}>
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                             width="15px" height="15px" viewBox="0 0 284.929 284.929">
                                            <g>
                                                <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <div className={['settings__show-accordion', showPinnedDialogs ? 'show-accordion' : ""].join(' ')}>
                                    {user?.pinnedChats.length === 0 ? <p className={`noneAccordion `}>нет закрепленных диалогов...</p> : ""}
                                    {user?.pinnedChats.map((chat: any, i:number) =>  <Message avatarOn={chat.userOnAvatarSrc} avatarEmit={chat.userEmitAvatarSrc} key={i} sendYou={chat.userNameEmit === user.name} text={chat.text} name={chat.userNameEmit !== user.name ? chat.userNameEmit : chat.userNameOn} data={chat.data} isRead={chat.isRead}/>  )}
                                </div>
                            </div>

                            <div className={`acardion__item`} >
                                <button onClick={showEmailF}>ваш email
                                    <div className={['arrow', showEmail ? 'rotate' : ""].join(' ')}>
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                             width="15px" height="15px" viewBox="0 0 284.929 284.929">
                                            <g>
                                                <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
		L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
		c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
		c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
                                            </g>
                                        </svg>
                                    </div>
                                </button>
                                <div className={['settings__show-accordion email__show', showEmail ? 'show-accordion-email' : ""].join(' ')}>
                                    <p>{user?.email}</p>
                                </div>
                            </div>

                            <button onClick={showConfirmExitF}>выйти из профиля </button>
                        </div>





                    </div>
                    <p className={`info__footer `}>После выхода вы потеряете доступ ко всем возможностям <span>REASE</span> NZ </p>

                    <>
                        <section className={["wrapper-close", showConfirmExit ? "active-wrapper-close" : ''].join(' ')} onClick={showConfirmExitF} ></section>
                        <div className="confirm__exit">
                            <div className= {["wrapper__confirm", showConfirmExit ? "wrapper__confirm-open" : ''].join(' ')}>
                                <div className="close__alert" onClick={showConfirmExitF}>&#10006;</div>
                                <p>Вы уверены что хотите выйти?</p>
                                <NavLink to='/' className='noneViewProfile'>
                                    <button onClick={exit}>выйти</button>
                                </NavLink>
                            </div>
                        </div>
                    </>
                </section >
            </section>

        </>

    )
}
export default Settings