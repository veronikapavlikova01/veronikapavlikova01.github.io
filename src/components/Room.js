import React from "react"
import { useEffect } from "react"
import { Context } from "../Context"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ArticleContent from "./content_components/ArticleContent"


function Room() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const room = dataAPI.getRoom(context.language, context.tour, context.room);
    const tour = dataAPI.getTour(context.language, context.tour);
    const isPrev = (room.number - 1) >= 1? true : false;
    const isNext = (room.number + 1) <= tour.rooms.length? true : false
    var x1 = 0;
    var y1 = 0;


    const previous = () => {
        if ((room.number - 1) >= 1) {
            context.setRoom(room.number-1);
        }
    }
    
    const next = () => {
        if ((room.number + 1) <= tour.rooms.length) {
            context.setRoom(room.number+1);
        }
    }
    
    const slide = (x1, x2, y1, y2) => {
        console.log("sliding");
        let distance = 100;
        if (Math.abs(y1 - y2) < 50) {
            if (x1 > (x2 + distance)) {
                next();
            } else if ((x1 + distance) < x2) {
                previous();
            }
        }
    }



    useEffect(() => {
        window.scrollTo(0,0);
    });

    return (
        <>
            <Header header={tour.title} />
            <div className="flex content-container background-secondary center-text padding-secondary border-radius-primary box-shadow" onTouchStart={touchStartEvent => { x1 = touchStartEvent.changedTouches[0].clientX; y1 = touchStartEvent.changedTouches[0].clientY }} onTouchEnd={touchEndEvent => { slide(x1, touchEndEvent.changedTouches[0].clientX, y1, touchEndEvent.changedTouches[0].clientY) }}>
                <ArticleContent first_label={room.number} title={room.title} second_label={tour.title} img={room.img} audio="/src/mp3/nachod.mp3" description={room.text}/>
                <div className="flex-secondary stick-bottom padding-bottom-primary padding-top-primary background-gradient">
                    <div className={`flex round-item background-fourth margin-right-primary ${isPrev ? '' : ' visibility-hidden'}`}>
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { previous() }} />
                    </div>
                    <Link to="/scan_room" className="flex round-item background-fourth">
                        <QrCode2Icon className="round-item-content color-primary margin-top-third cursor-primary" />
                    </Link>
                    <div className={`flex round-item background-fourth margin-left-primary ${isNext ? '' : ' visibility-hidden'}`}>
                        <ArrowForwardIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { next() }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Room;