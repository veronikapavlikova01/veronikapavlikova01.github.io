import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

function Map() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const info = dataAPI.getInfo(context.language);
    const header = dataAPI.getHeader(context.language);
    const roomsOverview = dataAPI.getRoomsOverview(context.language);
    const unvisited = dataAPI.getUnvisitedRooms(context.language, context.tour, context.room);
    const visited = dataAPI.getVisitedRooms(context.language, context.tour, context.room);

    return (
        <>
            <Header header={header.rooms} />
            <div class="content-container background-secondary">
                {
                    !context.room ? (<p>{roomsOverview.tour_not_selected}</p>) :
                        (<>
                            <div className="card box-shadow transition-primary padding-third margin-bottom-primary">
                                <div className="flex">
                                    <div className="flex-secondary align-items-primary">
                                        <InfoIcon className="icon margin-right-secondary" />
                                        <span className="font-weight-primary">{info.info}</span>
                                    </div>
                                    <span>{info.rooms_overview}</span>
                                </div>
                            </div>
                            <h3 className="opacity">{roomsOverview.seen}</h3>
                            {
                                visited.map((item) => (
                                    <div className="card flex-secondary align-items-primary margin-bottom-primary box-shadow padding-third opacity">
                                        <div className="flex round-item background-fourth margin-right-secondary">
                                            <span className="round-item-content color-primary">{item.number}</span>
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                ))
                            }
                            <h3>{roomsOverview.not_seen}</h3>
                            {
                                unvisited.map((item) => (
                                    <Link to="/room" className="transition-primary hover-primary card margin-bottom-primary box-shadow padding-third" onClick={() => context.changeRoom(item.number)}>
                                        <div className="flex-secondary align-items-primary">
                                            <div className="flex round-item background-fourth margin-right-secondary">
                                                <span className="round-item-content color-primary">{item.number}</span>
                                            </div>
                                            <span>{item.title}</span>
                                        </div>
                                    </Link>
                                ))
                            }
                        </>
                        )
                }
            </div>
        </>
    )
}


export default Map;
