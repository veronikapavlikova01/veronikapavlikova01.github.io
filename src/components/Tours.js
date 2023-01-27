import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import InfoIcon from '@mui/icons-material/Info';



function Tours() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const tours = dataAPI.getTours(context.language);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.tours} />
            <div className="content-container">
                <div className="card box-shadow transition-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <InfoIcon className="icon margin-right-secondary" />
                        <span>{labels.tours_label}</span>
                    </div>
                </div>
                <div className="grid-secondary">
                    {
                        tours.map((item) => (
                            <Link to="/rooms" className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex" onClick={() => context.changeTour(item.tour_id)}>
                                    <img src={castle} alt="castle" className="card-image padding-bottom-primary border-radius-secondary" />
                                    <h2 className="text-medium padding-primary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.description}</p>
                                    <div className="center-text  margin-primary ">
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
