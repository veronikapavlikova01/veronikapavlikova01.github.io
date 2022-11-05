import React from "react";
import { Context } from "../Context";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'



function Houses() {
    const context = useContext(Context);
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const houses = new DataAPI().getHouses(context.language);
        console.log(houses);
        setHouses(houses);
    }, [context.language]);



    return (
        <>
            <NavBar />
            <div className="margin-primary content-container">
                <div className="flex-secondary margin-bottom-primary">
                    <Link to="/history">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <h2 className="margin-right-primary margin-left-primary">Tours</h2>
                    <AiOutlineArrowRight className="icon visibility-hidden" />
                </div>
                <div className="flex align-items-primary">

                </div>
                <div className="grid">
                    {
                        houses.map((item) => (
                            <Link to="/owners" className="card box-shadow">
                                <article className="flex text-medium" key={item.title} onClick={() => context.changeHouse(item.title)}>
                                    <img src={castle} alt="castle" className="card-image" />
                                    <h3 className="padding-primary">{item.title}</h3>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.description}</p>
                                    <div className="center-text">
                                        <button className="button align-self-primary margin-primary text-medium background-primary font-weight-primary color-primary">{item.button}</button>
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

export default Houses;

