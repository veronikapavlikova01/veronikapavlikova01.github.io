import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { AiOutlinePhone, AiOutlinePicture, AiOutlineQuestion, AiOutlineInfoCircle } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import Header from "./Header";
import DataAPI from '../DataAPI';
import small_icon from '../img/icons/icon-256.png'
import castle from '../img/castle/room1.jpg'


function WhereToNext() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getLabels(context.language);
    const where = dataAPI.getWhereToNext(context.language);
    return (
        <>
            <Header header={header.where_to_next} />
            <div className="content-container">
                <div className="grid">
                    {
                        where.places.map((item) => (
                            <a href={item.url} className="card box-shadow transition-primary hover-primary" key={item.title}>
                                <article className="flex">
                                    <div className="padding-bottom-primary position-relative">
                                        <img src={castle} alt="castle" className="card-image" />
                                    </div>
                                    <h2 className="padding-primary card-title flex-secondary text-medium">{item.title}</h2>
                                    <p className="margin-bottom padding-primary medieval-first-letter">{item.description}</p>
                                    <div className="center-text margin-primary">
                                        <a href={item.url} className="text-medium button align-self-primary background-primary font-weight-primary color-primary text-medium">{where.button}</a>
                                    </div>
                                </article>
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    )
} export default WhereToNext;