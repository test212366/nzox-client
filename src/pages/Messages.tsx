import React, {FC, useEffect, useRef} from 'react';
import MessagesAll from "../components/MessagesAll";
import Chat from "../components/Chat";
import PersonalManager from "../components/PersonalManager";
import Slider from "react-slick";
import {useActions} from "../hooks/redux";
import jwt_decode from 'jwt-decode';
import {io} from "socket.io-client";

const token = localStorage.getItem('token')

let socket: any = null
if(token) {
    const item: any = jwt_decode(token || '')
    //@ts-ignore
    socket = io.connect('https://safe-escarpment-65791.herokuapp.com/', { transports: ['websocket'],
        query: {
            'name': item.email
        }
    })
    socket.on('disconnect', {
        query: {
            'name': item.email
        }
    })
}


const Messages:FC = ( ) => {

    const  {setSocket} = useActions(),
	 slider = useRef(null)

    useEffect(() => {
        setSocket(socket )
    }, [setSocket])

    return (
         <Slider ref={slider}  {...{
                    infinite: false,
                    speed: 500,
                    dots: false,
                    responsive: [

                        {
                            breakpoint: 10000,
                            settings: 'unslick'
                        },
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }

                    ]
                }}>

                    <MessagesAll slider={slider}/>
                    <Chat/>
                    <PersonalManager />
                </Slider>
    )
}
export default Messages