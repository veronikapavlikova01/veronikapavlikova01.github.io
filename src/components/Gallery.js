import React from "react";
import { Context } from "../Context";
import { useContext} from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'



function Gallery() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const tours = dataAPI.getTours(context.language);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.gallery}/>
            <div className="content-container">
                <div className="grid-secondary">
                    {
                        tours.map((item) => (
                            <Link to="/rooms" className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex" onClick={() => context.changeTour(item.tour_id)}>
                                    <img src={castle} alt="castle" className="card-image padding-bottom-primary" />
                                    <h2 className="text-medium padding-primary">{item.title}</h2>
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

export default Gallery;
