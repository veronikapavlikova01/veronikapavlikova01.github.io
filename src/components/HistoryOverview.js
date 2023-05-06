import React from 'react';
import { Context } from "../Context"
import { useContext } from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'




function HistoryOverview() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const historyOverview = dataAPI.getHistoryOverview(context.language);
    const header = dataAPI.getHeader(context.language);

    return (
        <>
            <Header header={header.history}/>
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <article className="font-size-third ">
                    <div className="flex-secondary">
                        <div className="margin-right-primary margin-left-primary">
                            <span className="font-style-primary margin-primary">{header.history}</span>
                            <h2>{historyOverview.title}</h2>
                            <span className="font-style-primary margin-primary">{historyOverview.label}</span>
                        </div>
                    </div>
                    <div className="margin-top-secondary">
                        <img src={require(`../img${historyOverview.img}`)} alt="castle" className="page-image" />
                    </div>
                    <p className="start-text margin-top-secondary medieval-first-letter">{historyOverview.description}</p>
                </article>
            </div>
        </>
    )

}

export default HistoryOverview;



