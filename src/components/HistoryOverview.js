import React from "react"
import { Context } from "../Context"
import { useContext} from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArticleContent from "./content_components/ArticleContent"




function HistoryOverview() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const historyOverview = dataAPI.getHistoryOverview(context.language);
    const header = dataAPI.getHeader(context.language);

    return (
        <>
            <Header header={header.history}/>
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <ArticleContent first_label={header.history} title={historyOverview.title} second_label={historyOverview.label} img={historyOverview.img} description={historyOverview.description}/>
            </div>
        </>
    )

}

export default HistoryOverview;



