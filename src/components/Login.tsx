import React from 'react';
import {useActions, useTypeSelector} from "../hooks/redux";
import {useForm} from "react-hook-form";
import {loginUserA} from "../store/action-creators/user";


const Login = () => {
    const {setLogin, setSeePassword,loginUserA } = useActions(),
        {login, seePassword } = useTypeSelector(state => state.utils),
        {errorUS, loading} = useTypeSelector(state => state.user),
        {register, formState: {errors, isValid}, handleSubmit} = useForm({mode: "onBlur"})


    const closeLogin = () => setLogin(!login),
        setSeePasswordFunc = () => setSeePassword(!seePassword),
        loginUser = (data: any) => loginUserA(data)
    return (
        <>
            <section className={["wrapper-close", login ? "active-wrapper-close" : ''].join(' ')} onClick={closeLogin}></section>
            <section className={["register__container", login ? "register__container-open" : ''].join(' ')}>
                <div className="relative">
                    <p>Войти через эл. почту</p>
                    <div className="errors">
                        <small className='error'>{errors.email && `${errors.email.message}`}</small>
                        <small className='error'>{errors.password && `${errors.password.message}`}</small>
                        <small className='error'>{errors.userName && `${errors.userName.message}`}</small>
                        <small className='error'>{errorUS?.message && `${errorUS?.message}`}</small>
                        <small className='error'>{errorUS && `${errorUS?.error}`}</small>
                    </div>
                    <div className="relative">
                        <input type="email" {...register('email',{
                            required: 'email является обязательным полем',
                            minLength: {
                                value: 6,
                                message: 'email должен быть больше 6-ти символов'
                            }})}  placeholder="Добавьте эл.почту"   />
                        <div className="login__logo temp">
                            <svg fill="none" height="16" viewBox="0 0 34 27" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M28.5 25.6H5.5C3.4 25.6 1.70001 23.8929 1.70001 21.7841V5.41592C1.70001 3.30714 3.4 1.59998 5.5 1.59998H28.5C30.6 1.59998 32.3 3.30714 32.3 5.41592V21.7841C32.4 23.8929 30.6 25.6 28.5 25.6Z" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M17 14.9557L2.60001 3.60834" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /><path d="M31.4 3.60834L17 14.9557" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" /></svg>
                        </div>
                    </div>
                    <div className="relative">
                        <input type={seePassword ? "text" : "password"} {...register('password', {
                            required: 'пароль является обязательным полем',
                            minLength: {
                            value: 5,
                            message: 'пароль должен быть больше 5-ти символов'
                        },
                            maxLength: {
                            value: 11,
                            message: 'пароль должен быть короче 11 символов'
                        }
                        })}   placeholder="Введите пароль"/>
                        <div className="seePassword" onClick={setSeePasswordFunc}>
                            {seePassword? <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg" ><g><path d="   M261.2,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C348,218.6,307.5,193.4,261.2,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="261.2" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><line strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" x1="152.7" x2="369.6" y1="348.5" y2="170" /></g></svg>
                                : <svg height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xmlns="http://www.w3.org/2000/svg"  ><g><path d="   M256,193.4c-46.4,0-86.8,25.2-108.5,62.6c21.7,37.4,62.1,62.6,108.5,62.6c46.4,0,86.8-25.2,108.5-62.6   C342.8,218.6,302.4,193.4,256,193.4z" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /><circle cx="256" cy="256" fill="none" r="37.7" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="10" /></g></svg>}

                        </div>
                        <div className="login__logo temp">
                            <svg viewBox="0 0 32 32" width='20px' height='19px' xmlns="http://www.w3.org/2000/svg"><defs> </defs><title /><g data-name="Layer 56" id="Layer_56"><path d="M16,31a1,1,0,0,1-.6-.2l-4-3A1,1,0,0,1,11,27V17.47a9,9,0,1,1,10,0V19a1,1,0,0,1-.29.71L19.41,21l1.3,1.29a1,1,0,0,1,0,1.42L19.41,25l1.3,1.29a1,1,0,0,1,.29.78,1,1,0,0,1-.4.73l-4,3A1,1,0,0,1,16,31Zm-3-4.5,3,2.25,2.48-1.86-1.19-1.18a1,1,0,0,1,0-1.42L18.59,23l-1.3-1.29a1,1,0,0,1,0-1.42L19,18.59V16.92a1,1,0,0,1,.5-.86,7,7,0,1,0-7,0,1,1,0,0,1,.5.86ZM20,19h0Z" /><circle cx="16" cy="8" r="1" /><path d="M16,10a2,2,0,1,1,2-2A2,2,0,0,1,16,10Zm0-2Z" /></g></svg>
                        </div>
                    </div>
                    <button className="registration regM" disabled={!isValid} onClick={handleSubmit(loginUser)}>
                        Продолжить
                    </button>
                    <div className="close" onClick={closeLogin}>&#10006;</div>
                </div>
                <section className={["loader__auth", loading ? 'activeLoader' : ""].join(' ')}>
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </section>
            </section>
        </>

    )
}
export default Login