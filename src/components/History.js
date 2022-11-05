import React from "react";
import { Context } from "../Context";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import NavBar from "./NavBar";
import dataAPI from '../DataAPI'
import castle from '../img/uvod.jpg'



function History() {
    const context = useContext(Context);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const newHistory = new dataAPI().getHistory(context.language);
        setHistory(newHistory);
    }, [context.language]);



    return (
        <>
            <NavBar />
            <div className="margin-primary content-container">
                <div className="grid-secondary">
                    {
                        history.map((item) => (
                            <Link to={item.path} className="card box-shadow">
                                <article className="flex text-medium" key={item.title}>
                                    <img src={castle} alt="castle" className="card-image" />
                                    <h3 className="padding-primary">{item.title}</h3>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.card_label}</p>
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

export default History;
