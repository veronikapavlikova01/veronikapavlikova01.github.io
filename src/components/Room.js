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


function Room() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const room = dataAPI.getRoom(context.language, context.tour, context.room);
    const tour = dataAPI.getTour(context.language, context.tour);

    const prevRoomExists = (number) => {
        if ((number - 1) >= 1) {
            return true;
        }
        return false;
    }

    const nextRoomExists = (number, length) => {
        if ((number + 1) <= length) {
            return true;
        }
        return false;
    
    }

    const isPrev = prevRoomExists(room.number);
    const isNext = nextRoomExists(room.number, tour.rooms.length);
    var x1 = 0;
    var y1 = 0;


    const previous = (number, length, context) => {
        let newNumber = number - 1;
        if (prevRoomExists(number)) {
            context.changeRoom(newNumber);
        }
    }
    
    const next = (number, length, context) => {
        let newNumber = number + 1;
        if (nextRoomExists(number, length)) {
            context.changeRoom(newNumber);
        }
    }
    
    const slide = (x1, x2, y1, y2, number, length, context) => {
        let distance = 100;
        if (Math.abs(y1 - y2) < 50) {
            if (x1 > (x2 + distance)) {
                next(number, length, context);
            } else if ((x1 + distance) < x2) {
                previous(number, length, context);
            }
        }
    }



    useEffect(() => {
        window.scrollTo(0,0);
    });

    return (
        <>
            <Header header={tour.title} />
            <div className="flex content-container background-secondary center-text padding-secondary border-radius-primary box-shadow" onTouchStart={touchStartEvent => { x1 = touchStartEvent.changedTouches[0].clientX; y1 = touchStartEvent.changedTouches[0].clientY }} onTouchEnd={touchEndEvent => { slide(x1, touchEndEvent.changedTouches[0].clientX, y1, touchEndEvent.changedTouches[0].clientY, room.number, tour.rooms.length, context) }}>
                <article>
                    <div className="flex-secondary">
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{room.number}</span>
                            <h2 className="text-medium">{room.title}</h2>
                            <span className="font-style-primary margin-primary">{tour.title}</span>
                        </div>
                    </div>
                    <div className="margin-top-secondary">
                        <img src={require(`../img${room.img}`)} alt="castle" className="page-image" />
                        <audio controls src="/src/mp3/nachod.mp3" className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{room.text}</p>
                </article>
                <div className="flex-secondary stick-bottom padding-bottom-primary padding-top-primary background-gradient">
                    <div className={`flex round-item background-fourth margin-right-primary ${isPrev ? '' : ' visibility-hidden'}`}>
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { previous(room.number, tour.rooms.length, context) }} />
                    </div>
                    <Link to="/scan_room" className="flex round-item background-fourth">
                        <QrCode2Icon className="round-item-content color-primary margin-top-third cursor-primary" />
                    </Link>
                    <div className={`flex round-item background-fourth margin-left-primary ${isNext ? '' : ' visibility-hidden'}`}>
                        <ArrowForwardIcon className="round-item-content color-primary margin-top-third cursor-primary" onClick={() => { next(room.number, tour.rooms.length, context) }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Room;



