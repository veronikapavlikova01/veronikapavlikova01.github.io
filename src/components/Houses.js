import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'


function Houses() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const houses = dataAPI.getHouses(context.language);
    const labels = dataAPI.getLabels(context.language);

    return (
        <>
            <Header header={labels.houses}/>
            <div className="margin-primary content-container">
                <div className="grid">
                    {
                        houses.map((item) => (
                            <Link to="/owners" className="card box-shadow transition-primary hover-primary" key={item.title} onClick={() => context.changeHouse(item.title)}>
                                <article className="flex">
                                    <img src={castle} alt="castle" className="card-image padding-bottom-primary border-radius-secondary" loading="lazy"/>
                                    <h2 className="text-medium padding-primary">{item.title}</h2>
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

