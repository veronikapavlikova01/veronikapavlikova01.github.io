import React from "react"
import { Context } from "../Context"
import { useContext} from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'




function HistoryOverview() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const historyOverview = dataAPI.getHistoryOverview(context.language);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.history}/>
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <article className="font-size-third ">
                    <div className="flex-secondary">
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{labels.history}</span>
                            <h2>{historyOverview.title}</h2>
                            <span className="font-style-primary margin-primary">{historyOverview.label}</span>
                        </div>
                    </div>
                    <div>
                        <img src={castle} alt="castle" className="page-image" />
                        <audio controls src="/src/mp3/nachod.mp3" className="page-audio"> Your browser does not support the audio element.</audio>
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{historyOverview.description}</p>
                </article>
            </div>
        </>
    )

}

export default HistoryOverview;



