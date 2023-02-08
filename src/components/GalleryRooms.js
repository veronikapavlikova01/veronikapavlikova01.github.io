import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import Header from "./Header";
import DataAPI from '../DataAPI'


function GalleryRooms() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.gallery_tour);
    const tour = dataAPI.getTour(context.language, context.gallery_tour);

    return (
        <>
            <Header header={tour.title}/>
            <div className="content-container">
                <div className="grid">
                    {
                        rooms.map((item) => (
                            <Link to="/gallery_rooms" className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <div className="flex">
                                    <img src={require(`../img${item.img}`)} alt="castle" className="card-image border-radius-primary"/>
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

export default GalleryRooms;



