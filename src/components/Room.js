import React from "react"
import { Context } from "../Context"
import { useContext, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import NavBar from "./NavBar"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiFillCamera } from 'react-icons/ai'




function Room() {
    const context = useContext(Context);
    const [room, setRoom] = useState([]);
    const [tour, setTour] = useState([]);

    useEffect(() => {
        const dataAPI = new DataAPI();
        const newRoom = dataAPI.getRoom(context.language, context.tour, context.room);
        const newTour = dataAPI.getTour(context.language, context.tour);
        setRoom(newRoom);
        setTour(newTour);
    }, [context.language, context.tour, context.room]);


    return (
        <>
            <NavBar />
            <div className="flex content-container background-secondary center-text padding-secondary border-radius-primary box-shadow">
                <article className="font-size-third">
                    <Link to="/rooms">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <span className="font-style-primary margin-primary">{tour.title}</span>
                    <h2>{room.title}</h2>
                    <span className="font-style-primary margin-primary">{room.label}</span>
                    <div className="margin-top-secondary">
                        <img src={castle} alt="castle" className="page-image" />
                        <audio controls src="/src/mp3/nachod.mp3" className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{room.text}</p>
                    <div className="flex-secondary">
                        <BsFillArrowLeftCircleFill className="icon margin-right-primary margin-top-third"></BsFillArrowLeftCircleFill>
                        <AiFillCamera className="icon margin-top-third visibility-hidden"/>
                        <BsFillArrowRightCircleFill className="icon margin-left-primary margin-top-third"></BsFillArrowRightCircleFill>
                    </div>
                </article>
            </div>
        </>
    )

}

export default Room;



