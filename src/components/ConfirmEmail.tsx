import React from 'react';
import {useActions, useTypeSelector} from "../hooks/redux";

const ConfirmEmail = () => {
    const { exitUser} = useActions(),
        {confirmEmail} = useTypeSelector(state => state.utils)

    const exitUserF = () => exitUser()
    return (
        <>
            <section className={["wrapper-close", confirmEmail ? "active-wrapper-close" : ''].join(' ')} ></section>
            <section className={["register__container", confirmEmail ? "register__container-open" : ''].join(' ')}>
                <p className='confirmEmail'>
                    На вашу почту пришло <span>письмо</span> с подтверждением аккаунта. Перейдите по ссылке чтобы подтвердить аккаунт
                    <span> NZox</span>
                </p>
                <button className="registration regM" onClick={exitUserF}>Выйти с аккаунта</button>
            </section>
        </>
    )
}
export default ConfirmEmail