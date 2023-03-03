import React from "react";
import { Context } from "../Context";
import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/castle/castle.jpg'
import InfoIcon from '@mui/icons-material/Info';



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
                <div className="card box-shadow transition-primary padding-third margin-bottom-primary">
                    <div className="flex">
                        <div className="flex-secondary align-items-primary">
                            <InfoIcon className="icon margin-right-secondary" />
                            <span className="font-weight-primary">{info.info}</span>
                        </div>
                        <span>{info.history_info}</span>
                    </div>
                </div>
                <div className="grid-secondary padding-top-primary">
                    {
                        history.map((item) => (
                            <Link to={item.path} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <img src={require(`../img${item.img}`)} alt="castle" className="card-image padding-bottom-primary border-radius-secondary" />
                                    <h2 className="text-medium padding-primary padding-bottom-primary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.card_label}</p>
                                    <div className="center-text margin-primary">
                                        <button className="text-medium button align-self-primary background-primary font-weight-primary color-primary">{item.button}</button>
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

export default Tours;
