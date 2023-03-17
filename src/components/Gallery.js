import React from "react";
import { Context } from "../Context";
import { useContext} from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';



function Gallery() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const tours = dataAPI.getTours(context.language);
    const header = dataAPI.getHeader(context.language);

    return (
        <>
            <Header header={header.gallery}/>
            <div className="content-container">
                <div className="grid-secondary">
                    {
                        tours.map((item) => (
                            <Link to="/gallery_rooms" className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <div className="flex" onClick={() => context.setGalleryTour(item.tour_id)}>
                                    <img src={require(`../img${item.img}`)} alt="castle" className="card-image border-radius-primary" loading="lazy"/>
                                    <h2 className="text-medium gallery-label margin-top-fourth color-primary padding-third">{item.title}</h2>
                                </div>
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
