import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/castle/room1.jpg'
import Information from "./Information";


function WhereToNext() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getHeader(context.language);
    const info = dataAPI.getInfo(context.language);
    const where = dataAPI.getWhereToNext(context.language);
    return (
        <>
            <Header header={header.where_to_next} />
            <div className="content-container">
                <Information info={info.info} content={info.where_to_info}/>
                <div className="grid padding-top-primary">
                    {
                        where.places.map((item) => (
                            <a href={item.url} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <div className="padding-bottom-primary position-relative">
                                        <img src={castle} alt="castle" className="card-image border-radius-secondary" />
                                    </div>
                                    <h2 className="padding-primary card-title flex-secondary text-medium padding-bottom-primary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.description}</p>
                                    <div className="center-text margin-primary">
                                        <a href={item.url} className="text-medium button align-self-primary background-primary font-weight-primary color-primary">{where.button}</a>
                                    </div>
                                </article>
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
} export default WhereToNext;