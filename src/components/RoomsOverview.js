import { Context } from "../Context";
import { useContext, useEffect } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { Link } from 'react-router-dom';
import Information from './Information'

function RoomsOverview() {
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
            <div className="content-container background-secondary">
                {
                    !(context.tour) ? (<span className="padding-third display-block font-weight-primary text-medium">{roomsOverview.tour_not_selected}</span>) :
                        <>
                            <Information info={info.info} content ={info.rooms_overview}/>
                            <h3 className={visited.length? "opacity padding-top-primary padding-bottom-primary" : "display-none"}>{roomsOverview.seen}</h3>
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
                            <h3 className="padding-top-primary padding-bottom-primary">{unvisited.length? roomsOverview.not_seen : roomsOverview.nothing_more}</h3>
                            {
                                unvisited.map((item) => (
                                    <Link to="/room" className="transition-primary hover-primary card flex-secondary align-items-primary margin-bottom-primary box-shadow padding-third" onClick={() => context.setRoom(item.number)}>
                                        <div className="flex round-item background-fourth margin-right-secondary">
                                            <span className="round-item-content color-primary">{item.number}</span>
                                        </div>
                                        <span>{item.title}</span>
                                    </Link>
                                ))
                            }
                        </>
                }
            </div>
        </>
    )
}


export default RoomsOverview;