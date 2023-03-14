import React from "react";
import { Context } from "../Context";
import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import Information from "./Information";
import Button from "./content_components/Button";
import CardContent from "./content_components/CardContent";
import { ContentCopy } from "@mui/icons-material";



function Tours() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const history = dataAPI.getHistory(context.language);
    const header = dataAPI.getHeader(context.language);
    const info = dataAPI.getInfo(context.language);

    return (
        <>
            <Header header={header.history}/>
            <div className="content-container">
                <Information info={info.info} content={info.history_info}/>
                <div className="grid-secondary padding-top-primary">
                    {
                        history.map((item) => (
                            <Link to={item.path} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <CardContent img={item.img} title={item.title} description={item.card_label}/>
                                    <Button button={item.button}/>
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

export default Tours;
