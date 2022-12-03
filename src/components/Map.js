import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { BsCheck } from "react-icons/bs";


function Map() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.map}/>
            <section class="content-container background-secondary text-medium padding-secondary box-shadow border-radius-primary">
                <h2>Map</h2>
                <p className="margin-bottom-primary">This is map of rooms for your tour.</p>
                {
                    !context.tour? (<p>Please select your tour first!</p>) :
                    (rooms.map((item) => (
                        <div className="flex-secondary align-items-primary margin-bottom-primary">
                            <div className="flex round-number background-fourth margin-right-secondary">
                                <span className="card-title-number color-primary">{item.number}</span>
                            </div>
                            <span>{item.title}</span>
                        </div>
                    )))
                }
            </section>
        </>
    )
}


export default Map;
