import React from "react";
import { Context } from "../Context";
import { useContext} from "react";
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'



function Tours() {
    const context = useContext(Context);
    const tours = new DataAPI().getTours(context.language);

    return (
        <>
            <NavBar />
            <div className="margin-primary content-container">
                <div className="grid-secondary">
                    {
                        tours.map((item) => (
                            <Link to="/rooms" className="card box-shadow" key={item.tour_id}>
                                <article className="flex text-medium" onClick={() => context.changeTour(item.tour_id)}>
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

export default Tours;
