import React from "react"
import { Context } from "../Context"
import { useContext, useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import NavBar from "./NavBar"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft } from 'react-icons/ai'




function HistoryOverview() {
    const context = useContext(Context);
    const [historyOverview, setHistoryOverview] = useState([]);

    useEffect(() => {
        const history = new DataAPI().getHistoryOverview(context.language);
        console.log(history);
        setHistoryOverview(history);
    },[context.language]);


    return (
        <>
            <NavBar />
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <Link to="/history">
                    <AiOutlineArrowLeft className="icon"/>
                </Link>
                <article className="font-size-third ">
                    <span className="font-style-primary margin-primary">{historyOverview.title}</span>
                    <h2>{historyOverview.title}</h2>
                    <span className="font-style-primary margin-primary">{historyOverview.label}</span>
                    <div>
                        <img src={castle} alt="castle" className="page-image"/>
                            <audio controls src="/src/mp3/nachod.mp3" className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{historyOverview.description}</p>
                </article>
            </div>
        </>
    )

}

export default HistoryOverview;



