import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import castle from '../img/uvod.jpg'
import Button from "./content_components/Button";
import CardContent from "./content_components/CardContent";


function Houses() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const houses = dataAPI.getHouses(context.language);
    const header = dataAPI.getHeader(context.language);

    return (
        <>
            <Header header={header.houses} />
            <div className="margin-primary content-container">
                <div className="grid">
                    {
                        houses.map((item) => (
                            <Link to="/owners" className="card box-shadow transition-primary hover-primary" key={item.title} onClick={() => context.setHouse(item.title)}>
                                <article className="flex">
                                    <CardContent img={item.img} title={item.title} description={item.description}/>
                                    <Button button={item.button}/>
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

