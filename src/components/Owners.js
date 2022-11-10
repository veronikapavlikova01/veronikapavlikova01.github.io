import React from "react";
import { Context } from "../Context";
import { useContext} from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'


function Owners() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const labels = dataAPI.getLabels(context.language);
    const owners = dataAPI.getOwners(context.language, context.house);


    return (
        <>
            <Header />
            <div className="margin-primary content-container">
                <div className="flex-secondary margin-bottom-primary">
                    <Link to="/houses" classname="flex-secondary align-items-primary">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <h2 className="margin-right-primary margin-left-primary">{labels.owners}</h2>
                    <AiOutlineArrowRight className="icon visibility-hidden" />
                </div>
                <div className="grid">
                    {
                        owners.map((item) => (
                            <Link to="/owner" className="card box-shadow" key={item.number}>
                                <article className="flex text-medium" onClick={() => context.changeOwner(item.number)}>
                                    <img src={castle} alt="castle" className="card-image" />
                                    <h3 className="padding-primary">{item.name}</h3>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.label}</p>
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

export default Owners;

