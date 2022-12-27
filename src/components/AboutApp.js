import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { AiOutlinePhone, AiOutlinePicture, AiOutlineQuestion, AiOutlineInfoCircle } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import Header from "./Header";
import DataAPI from '../DataAPI';
import small_icon from '../img/icons/icon-256.png'

function AboutApp() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getOther(context.language);
    const about = dataAPI.getAboutApp(context.language);

    return (
        <>
            <Header header={header.about_app} />
            <section class="content-container background-secondary padding-secondary box-shadow border-radius-primary">
                <div className="flex align-items-primary">
                    <div className="margin-top-secondary">
                        <img src={small_icon} alt="logo" className="page-image" />
                    </div>
                </div>
                <div class="contact-box">
                    <div className="margin-top">
                        <ul class="contact-list">
                            <li class="margin-bottom-primary flex">
                                <span class="font-weight-primary text-transform-primary">{about.for_label}</span>
                                <span>{about.for}</span>
                            </li>
                            <li class="margin-bottom-primary flex">
                                <span class="font-weight-primary text-transform-primary">{about.author_label}</span>
                                <span>{about.author}</span>
                            </li>
                            <li class="margin-bottom-primary flex">
                                <span class="font-weight-primary text-transform-primary">{about.collaboration_label}</span>
                                <span>{about.collaboration}</span>
                            </li>
                            <li class="margin-bottom-primary flex">
                                <span class="font-weight-primary text-transform-primary">{about.photos_label}</span>
                                <span>{about.photos}</span>
                            </li>
                            <li class="margin-bottom-primary flex">
                                <span class="font-weight-primary text-transform-primary">{about.logo_label}</span>
                                <span>{about.logo}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
} export default AboutApp;