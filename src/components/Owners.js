import React from "react";
import { Context } from "../Context";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'


function Owners() {
    const context = useContext(Context);
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        const owners = new DataAPI().getOwners(context.language, context.house);
        console.log(owners);
        setOwners(owners);
    }, [context.language, context.house]);



    return (
        <>
            <NavBar />
            <div className="margin-primary content-container">
                <div className="flex-secondary margin-bottom-primary">
                    <Link to="/houses">
                        <AiOutlineArrowLeft className="icon" />
                    </Link>
                    <h2 className="margin-right-primary margin-left-primary">Tours</h2>
                    <AiOutlineArrowRight className="icon visibility-hidden" />
                </div>
                <div className="grid">
                    {
                        owners.map((item) => (
                            <Link to="/owner" className="card box-shadow">
                                <article className="flex text-medium" key={item.title} onClick={() => context.changeOwner(item.number)}>
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

