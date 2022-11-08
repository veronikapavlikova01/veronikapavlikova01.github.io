import React from "react"
import { useEffect } from "react"
import { Context } from "../Context"
import { useContext} from "react"
import { Link } from 'react-router-dom'
import NavBar from "./NavBar"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillCamera } from 'react-icons/ai'


function prevRoomExists(number){
    if((number-1)>=1){
        return true;
    }
    return false;
}

function nextRoomExists(number, length){
    if((number+1) <=length){
        return true;
    }
    return false;

}

function previous(number, length, context){
    let newNumber = number-1;
    if(prevRoomExists(number)){
        context.changeRoom(newNumber);
    }
}

function next(number, length, context){
    let newNumber=number+1;
    if(nextRoomExists(number, length)){
        context.changeRoom(newNumber);
    }
}

function slide(x1, x2, y1, y2, number, length, context){
    if(Math.abs(y1-y2) < 50){
        if(x1>x2){
            next(number, length, context);
        } else if(x1<x2){
            previous(number, length, context);
        }
    }
}

function Room() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const room = dataAPI.getRoom(context.language, context.tour, context.room);
    const tour = dataAPI.getTour(context.language, context.tour);
    const isPrev = prevRoomExists(room.number);
    const isNext = nextRoomExists(room.number, tour.rooms.length);
    var x1 = 0;
    var y1 = 0;

    useEffect(()=>{
        window.scrollTo(0,0);
    })

    return (
        <>
            <NavBar />
            <div className="flex content-container background-secondary center-text padding-secondary border-radius-primary box-shadow" onTouchStart={touchStartEvent => {x1 = touchStartEvent.changedTouches[0].clientX; y1=touchStartEvent.changedTouches[0].clientY}} onTouchEnd={touchEndEvent => {slide(x1, touchEndEvent.changedTouches[0].clientX, y1, touchEndEvent.changedTouches[0].clientY, room.number, tour.rooms.length, context)}}>
                <article className="font-size-third">
                    <div className="flex-secondary">
                        <Link to="/rooms">
                            <AiOutlineArrowLeft className="icon" />
                        </Link>
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{room.number}</span>
                            <h2>{room.title}</h2>
                            <span className="font-style-primary margin-primary">{tour.title}</span>
                        </div>
                        <AiOutlineArrowRight className="icon visibility-hidden" />
                    </div>
                    <div className="margin-top-secondary">
                        <img src={castle} alt="castle" className="page-image" />
                        <audio controls src="/src/mp3/nachod.mp3" className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{room.text}</p>
                    <div className="flex-secondary">
                        <BsFillArrowLeftCircleFill className={`icon margin-right-primary margin-top-third cursor-primary ${isPrev? '' : ' visibility-hidden'}`} onClick={() => {previous(room.number, tour.rooms.length, context)}}></BsFillArrowLeftCircleFill>
                        <AiFillCamera className="icon margin-top-third cursor-primary visibility-hidden" />
                        <BsFillArrowRightCircleFill className={`icon margin-left-primary margin-top-third cursor-primary ${isNext? '' : ' visibility-hidden'}`} onClick={() => {next(room.number, tour.rooms.length, context)}}></BsFillArrowRightCircleFill>
                    </div>
                </article>
            </div>
        </>
    )

}

export default Room;



