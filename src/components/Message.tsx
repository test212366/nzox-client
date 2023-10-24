import React, {FC} from 'react';


interface MessageProps {
    name: string
    isFind?: boolean
    data: string
    isRead: boolean
    text: string
    sendYou?:boolean
    avatarEmit: string
    avatarOn: string
}

const Message:FC<MessageProps> = ({name, isFind, isRead, data, text,sendYou,avatarEmit,avatarOn}) => {
    return (
        <section className="message__item">
            <div className="message__avatar">
                <img className="message__img" height='60px' width='60px' src={sendYou ? avatarOn || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png' : !sendYou ? avatarEmit || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png' : 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'}     alt="message__avatar" />
            </div>
            <div className="message__desc">
                <div className="message__name">
                    <p>{name}</p>
                </div>
                <div className="message__last" >
                    {sendYou && 'Вы: '}{text}
                    {isFind && 'Нажмите, что-бы начать переписку'}
                   </div>
                <div className="message__data">
                    {data}
                </div>
                {!isRead && !sendYou && <div className="message__no-read">(1)</div>}

            </div>
        </section>
    )
}
export default Message