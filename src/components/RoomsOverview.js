import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsCheck } from "react-icons/bs";
import {Link} from 'react-router-dom';


function Map() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const labels = dataAPI.getLabels(context.language);
    const roomsOverview = dataAPI.getRoomsOverview(context.language);
    const unvisited = dataAPI.getUnvisitedRooms(context.language, context.tour, context.room);
    const visited = dataAPI.getVisitedRooms(context.language, context.tour, context.room);
    const tour = dataAPI.getTour(context.language, context.tour);

    return (
        <>
            <Header header={labels.rooms} />
            <section class="content-container background-secondary">
                {
                    !context.room ? (<p>{roomsOverview.tour_not_selected}</p>) :
                        (<>
                            <h2>{tour.title}</h2>
                            <p className="margin-bottom-primary">{roomsOverview.label}</p>
                            <h3 className="opacity">{roomsOverview.seen}</h3>
                            {
                                visited.map((item) => (
                                    <div className="flex-secondary align-items-primary margin-bottom-primary box-shadow padding-third border-radius-primary opacity">
                                        <div className="flex round-number background-fourth margin-right-secondary">
                                            <span className="card-title-number color-primary">{item.number}</span>
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                ))
                            }
                            <h3>{roomsOverview.not_seen}</h3>
                            {
                                unvisited.map((item) => (
                                    <Link to="/room">
                                        <div className="flex-secondary align-items-primary margin-bottom-primary box-shadow padding-third border-radius-primary" onClick={() => context.changeRoom(item.number)}>
                                            <div className="flex round-number background-fourth margin-right-secondary">
                                                <span className="card-title-number color-primary">{item.number}</span>
                                            </div>
                                            <span>{item.title}</span>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                        )
                }
            </section>
        </>
    )
}


export default Map;
