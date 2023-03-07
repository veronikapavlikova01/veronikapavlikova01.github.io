import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import Information from './Information'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';



function Tours() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const tours = dataAPI.getTours(context.language);
    const header = dataAPI.getHeader(context.language);
    const info = dataAPI.getInfo(context.language);

    return (
        <>
            <Header header={header.tours} />
            <div className="content-container">
                <Information info={info.info} content={info.tours_info} />
                <div className="grid-secondary padding-top-primary">
                    {
                        tours.map((item) => (
                            <Link to="/rooms" className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex" onClick={() => context.setTour(item.tour_id)}>
                                    <img src={require(`../img${item.img}`)} alt="castle" className="card-image padding-bottom-primary border-radius-secondary" />
                                    <h2 className="text-medium padding-primary padding-bottom-primary">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter padding-bottom-primary">{item.description}</p>
                                    <div className="flex-secondary align-items-primary padding-primary padding-bottom-primary">
                                        <MeetingRoomIcon className="icon margin-right-secondary" />
                                        <span className="font-weight-primary">{item.rooms.length + " " + item.rooms_label}</span>
                                    </div>
                                    <div className="flex-secondary align-items-primary padding-primary padding-bottom-primary">
                                        <AccessTimeIcon className="icon margin-right-secondary" />
                                        <span className="font-weight-primary">{item.time}</span>
                                    </div>
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
