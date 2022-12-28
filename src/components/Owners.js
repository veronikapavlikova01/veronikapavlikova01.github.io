import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'


function Owners() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const owners = dataAPI.getOwners(context.language, context.house);


    return (
        <>
            <Header header={context.house}/>
            <div className="content-container">
                <div className="grid">
                    {
                        owners.map((item) => (
                            <Link to="/owner" className="card box-shadow transition-primary hover-primary" key={item.number}>
                                <article className="flex" onClick={() => context.changeOwner(item.number)}>
                                    <div className="padding-bottom-primary position-relative">
                                        <img src={castle} alt="castle" className="card-image" />
                                    </div>
                                    <h2 className="text-medium padding-primary card-title flex-secondary">{item.name}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">Majitel hrad a zámku.</p>
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

export default Owners;

