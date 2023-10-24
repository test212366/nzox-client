import React, {FC} from 'react';
import MessagesAll from "../components/MessagesAll";
import PersonalManager from "../components/PersonalManager";
import Slider from "react-slick";

const Bookmarks:FC = () => {
    return (
            <Slider  {...{
                infinite: false,
                speed: 500,
                responsive: [
                    {
                        breakpoint: 3000,
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
                <MessagesAll bookmarks={true}/>
                <PersonalManager bookmarks={true}/>
            </Slider>
    )
}
export default Bookmarks