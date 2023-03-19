import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Information from './Information'

function RoomsOverview() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const info = dataAPI.getInfo(context.language);
    const header = dataAPI.getHeader(context.language);
    const roomsOverview = dataAPI.getRoomsOverview(context.language);
    //const unvisited = dataAPI.getUnvisitedRooms(context.language, context.tour, context.room);
    //const visited = dataAPI.getVisitedRooms(context.language, context.tour, context.room);

    return (
        <>
            <Header header={header.rooms} />
            <div class="content-container background-secondary">
                {
                    !(context.tour) ? (<span className="font-weight-primary text-medium">{roomsOverview.tour_not_selected}</span>) :
                        (<>
                            <Information info={info.info} content ={info.rooms_overview}/>
                            <h3 className="opacity padding-top-primary padding-bottom-primary">{roomsOverview.seen}</h3>
                            {
                                dataAPI.getVisitedRooms(context.language, context.tour, context.room).map((item) => (
                                    <div className="card flex-secondary align-items-primary margin-bottom-primary box-shadow padding-third opacity">
                                        <div className="flex round-item background-fourth margin-right-secondary">
                                            <span className="round-item-content color-primary">{item.number}</span>
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                ))
                            }
                            <h3 className="padding-top-primary padding-bottom-primary">{roomsOverview.not_seen}</h3>
                            {
                                dataAPI.getUnvisitedRooms(context.language, context.tour, context.room).map((item) => (
                                    <Link to="/room" className="transition-primary hover-primary card margin-bottom-primary box-shadow padding-third" onClick={() => context.setRoom(item.number)}>
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


export default RoomsOverview;