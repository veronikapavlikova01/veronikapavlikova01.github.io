import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext} from "react";
import Header from "./Header";
import DataAPI from '../DataAPI'
import Button from "./content_components/Button";
import CardContent from "./content_components/CardContent";


function Rooms() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const tour = dataAPI.getTour(context.language, context.tour);

    return (
        <>
            <Header header={tour.title} />
            <div className="content-container">
                <div className="grid">
                    {
                        tour.rooms.map((item) => (
                            <Link to="/room" className="card box-shadow transition-primary hover-primary" key={item.number} onClick={() => context.setRoom(item.number)}>
                                <article className="flex">
                                    <CardContent img={item.img} title={item.title} description={item.card_label}>
                                        <div className="card-number flex round-item">
                                            <span className="round-item-content">{item.number}</span>
                                        </div>
                                    </CardContent>
                                    <Button button={item.button}/>
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