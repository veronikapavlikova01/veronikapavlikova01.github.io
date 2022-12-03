import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'



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
                            <Link to="/owners" className="card box-shadow" key={item.title}>
                                <article className="flex text-medium" onClick={() => context.changeHouse(item.title)}>
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

