import React from "react"
import { Context } from "../Context"
import { useContext} from "react"
import { Link } from 'react-router-dom'
import Header from "./Header"
import DataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'


function History() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const history = dataAPI.getHistory(context.language);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.history}/>
            <div className="margin-primary content-container">
                <div className="grid-secondary">
                    {
                        history.map((item) => (
                            <Link to={item.path} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <img src={castle} alt="castle" className="card-image padding-bottom-primary" />
                                    <h2 className="padding-primary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.card_label}</p>
                                    <div className="center-text">
                                        <button className="button align-self-primary margin-primary text-medium background-primary font-weight-primary color-primary">{item.button}</button>
                                    </div>
                                </article>
                            </Link>
                        )
                        )
                    }
                </div>
            </div>
        </>
    )

}

export default History;
