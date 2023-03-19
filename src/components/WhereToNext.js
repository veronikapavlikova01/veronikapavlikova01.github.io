import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from "./Header";
import DataAPI from '../DataAPI';
import Information from "./Information";
import CardContent from "./content_components/CardContent";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


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
                <Information info={info.info} content={info.where_to_info} />
                <div className="grid padding-top-primary">
                    {
                        where.places.map((item) => (
                            <a href={item.url} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <CardContent img="/castle/castle.jpg" title={item.title} description={item.description}>
                                        <div className="card-number flex round-item">
                                            <OpenInNewIcon className="round-item-content">{item.number}</OpenInNewIcon>
                                        </div>
                                    </CardContent>
                                    <a href={item.url} className="margin-primary display-block text-medium button align-self-primary background-primary font-weight-primary color-primary">{where.button}</a>
                                </article>
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
} export default WhereToNext;