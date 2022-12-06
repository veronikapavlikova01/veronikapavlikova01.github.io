import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import {AiOutlinePhone, AiOutlinePicture, AiOutlineQuestion, AiOutlineInfoCircle} from 'react-icons/ai'
import {FiSettings} from 'react-icons/fi'
import Header from "./Header";
import DataAPI from '../DataAPI';


function Other() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getLabels(context.language);
    const other = dataAPI.getOther(context.language);

    return (
        <>
            <Header header={header.other}/>
            <div className="content-container">
                <Link to="/contact" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-number background-fourth margin-right-secondary">
                            <AiOutlinePhone className="card-title-number color-primary"/>
                        </div>
                        <span>{other.contact}</span>
                    </div>
                </Link>
                <Link to="/where_to_next" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-number background-fourth margin-right-secondary">
                            <AiOutlineQuestion className="card-title-number color-primary"/>
                        </div>
                        <span>{other.where_to_next}</span>
                    </div>
                </Link>
                <Link to="/gallery" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-number background-fourth margin-right-secondary">
                            <AiOutlinePicture className="card-title-number color-primary"/>
                        </div>
                        <span>{other.gallery}</span>
                    </div>
                </Link>
                <Link to="/settings" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-number background-fourth margin-right-secondary">
                            <FiSettings className="card-title-number color-primary"/>
                        </div>
                        <span>{other.settings}</span>
                    </div>
                </Link>
                <Link to="/about_app" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-number background-fourth margin-right-secondary">
                            <AiOutlineInfoCircle className="card-title-number color-primary"/>
                        </div>
                        <span>{other.about_app}</span>
                    </div>
                </Link>
            </div>
        </>
    )
} export default Other;