import React from "react";
import { Context } from "../Context";
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import NavBar from "./NavBar";
import dataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'


function Rooms() {
    const context = useContext(Context);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const newRooms = new dataAPI().getRooms(context.language, context.tour);
        setRooms(newRooms);
    }, [context.language, context.tour]);



    return (
        <>
            <NavBar />
            <div className="margin-primary content-container">
                <div className="flex-secondary margin-bottom-primary">
                    <Link to="/tours">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <h2 className="margin-right-primary margin-left-primary">Tours</h2>
                    <AiOutlineArrowRight className="icon visibility-hidden" />
                </div>
                <div className="grid">
                    {
                        rooms.map((item) => (
                            <Link to="/room" className="card box-shadow">
                                <article className="flex text-medium" key={item.title} onClick={() => context.changeRoom(item.number)}>
                                    <img src={castle} alt="castle" className="card-image" />
                                    <h3 className="padding-primary card-title flex-secondary"><span className="card-title-number">{item.number}.</span><span className="align-self-primary">{item.title}</span></h3>
                                    <p className="margin-bottom padding-primary medieval-first-letter">Malé hradní nádvoří seznámí návštěvníka s architekturou starého hradu.</p>
                                    <div className="center-text">
                                        <button className="button align-self-primary margin-primary text-medium background-primary font-weight-primary color-primary">Navštívit</button>
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



