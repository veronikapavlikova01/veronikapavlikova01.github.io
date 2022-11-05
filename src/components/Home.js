import Dropdown from "./Dropdown";
import { Context } from "../Context";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import DataAPI from '../DataAPI'



function Home() {
    const context = useContext(Context);
    const [home, setHome] = useState({});

    useEffect(() => {
        const newHome = new DataAPI().getHome(context.language);
        setHome(newHome);
    },[context.language]);

    return (
        <div className="welcome-background flex">
            <Dropdown />
            <div className="flex welcome-box">
                <h1 className="center-text welcome-text-large color-primary welcome-text">
                     {home.label_1}<br/>{home.label_2}<br/>{home.label_3}
                </h1>
                <Link to="/tours">
                    <button className="button margin-top-primary background-primary color-primary welcome-text-button font-weight-primary text-transform-primary">
                        {home.button_label}
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default Home;
