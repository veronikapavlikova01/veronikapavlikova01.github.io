import { React } from 'react';
import { Context } from "../Context";
import { useContext } from "react";
import DataAPI from '../DataAPI';
import Header from "./Header";

function Help(props) {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const help = dataAPI.getHelp(context.language);
    const header = dataAPI.getHeader(context.language);

    return (
        <>
            <Header header={header.help} />
            <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
                <h2 className="text-medium">{help.help}</h2>
            </div>
        </>
    )
}

export default Help;