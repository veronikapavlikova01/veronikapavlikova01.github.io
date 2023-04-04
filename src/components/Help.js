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
                <h3>{help.help_tour}</h3>
                <p className="margin-bottom-primary">{help.help_tour_content}</p>
                <h3>{help.help_room}</h3>
                <p className="margin-bottom-primary">{help.help_room_content}</p>
                <h3>{help.help_more_functions}</h3>
                <p>{help.help_more_functions_content}</p>
            </div>
        </>
    )
}

export default Help;