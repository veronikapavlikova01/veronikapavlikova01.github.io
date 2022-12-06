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
            <section class="content-container background-secondary text-medium padding-secondary box-shadow border-radius-primary">
                <div className="flex align-items-primary">
                    <div className="margin-top-secondary">
                        <img src={small_icon} alt="castle" className="page-image" />
                    </div>
                </div>
                <div class="contact-box">
                    <div className="margin-top">
                        <ul class="contact-list">
                            <li class="margin-bottom-primary">
                                <span class="font-weight-primary text-transform-primary">{about.for_label}</span>
                                <address>{about.for}</address>
                            </li>
                            <li class="margin-bottom-primary">
                                <span class="font-weight-primary text-transform-primary">{about.author_label}</span>
                                <address>{about.author}</address>
                            </li>
                            <li class="margin-bottom-primary">
                                <span class="font-weight-primary text-transform-primary">{about.collaboration_label}</span>
                                <address>{about.collaboration}</address>
                            </li>
                            <li class="margin-bottom-primary">
                                <span class="font-weight-primary text-transform-primary">{about.photos_label}</span>
                                <address>{about.photos}</address>
                            </li>
                            <li class="margin-bottom-primary">
                                <span class="font-weight-primary text-transform-primary">{about.logo_label}</span>
                                <address>{about.logo}</address>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
} export default AboutApp;