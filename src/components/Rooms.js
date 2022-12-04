import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import Header from "./Header";
import DataAPI from '../DataAPI'


function Rooms() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const labels = dataAPI.getLabels(context.language);
    const tour = dataAPI.getTour(context.language, context.tour);

    return (
        <>
            <Header header={tour.title}/>
            <div className="content-container">
                <p className="margin-bottom-primary font-weight-primary">{labels.rooms_label}</p>
                <div className="grid">
                    {
                        rooms.map((item) => (
                            <Link to="/room" className="card box-shadow" key={item.number}>
                                <article className="flex" onClick={() => context.changeRoom(item.number)}>
                                    <div className="padding-bottom-primary position-relative">
                                        <img src={require(`../img${item.img}`)} alt="castle" className="card-image" />
                                        <div className="card-number flex round-number">
                                            <span className="card-title-number">{item.number}</span>
                                        </div>
                                    </div>
                                    <h2 className="padding-primary card-title flex-secondary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">Malé hradní nádvoří seznámí návštěvníka s architekturou starého hradu.</p>
                                    <div className="center-text">
                                        <button className="button align-self-primary margin-primary background-primary font-weight-primary color-primary">Navštívit</button>
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

export default Rooms;



