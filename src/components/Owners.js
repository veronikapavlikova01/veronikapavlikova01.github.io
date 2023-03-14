import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import Button from "./content_components/Button";
import CardContent from "./content_components/CardContent";


function Owners() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const owners = dataAPI.getOwners(context.language, context.house);


    return (
        <>
            <Header header={context.house} />
            <div className="content-container">
                <div className="grid">
                    {
                        owners.map((item) => (
                            <Link to="/owner" className="card box-shadow transition-primary hover-primary" key={item.number} onClick={() => context.setOwner(item.number)}>
                                <article className="flex">
                                    <CardContent img={item.img} title={item.name} description={item.label}/>
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

export default Owners;