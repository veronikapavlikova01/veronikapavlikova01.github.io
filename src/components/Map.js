import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { AiOutlineArrowLeft } from 'react-icons/ai'


function Map() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header />
            {
                <section class="content-container background-secondary text-medium padding-secondary box-shadow border-radius-primary">
                    <h2>Map</h2>
                    <div class="contact-box">
                        <div className="margin-top">
                            <p>This is map of rooms for your tour.</p>
                            <div className="flex-secondary align-items-primary">
                                <span className="card-title-number">1</span>
                                <span>Místnost číslo 1</span>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}


export default Map;
