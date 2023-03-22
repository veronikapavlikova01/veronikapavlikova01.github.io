import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from "./Header";
import DataAPI from '../DataAPI';
import Information from "./Information";
import CardContent from "./content_components/CardContent";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from "./content_components/Button";
import { redirect } from "react-router-dom";


function WhereToNext() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getHeader(context.language);
    const info = dataAPI.getInfo(context.language);
    const where = dataAPI.getWhereToNext(context.language);

    const redirect = (url) => {
        window.open(url, "_blank", "");
    }

    return (
        <>
            <Header header={header.where_to_next} />
            <div className="content-container">
                <Information info={info.info} content={info.where_to_info} />
                <div className="grid padding-top-primary">
                    {
                        where.places.map((item) => (
                            <a className="card box-shadow transition-primary hover-primary" href="" onClick={() => redirect(item.url)}>
                                <article className="flex" key={item.title}>
                                    <CardContent img="/castle/castle.jpg" title={item.title} description={item.description}>
                                        <div className="card-number flex round-item">
                                            <OpenInNewIcon className="round-item-content">{item.number}</OpenInNewIcon>
                                        </div>
                                    </CardContent>
                                    <Button button={where.button} />
                                </article>
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
} export default WhereToNext;