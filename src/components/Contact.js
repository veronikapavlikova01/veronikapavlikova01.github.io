import React from "react";
import {Context } from "../Context";
import { useContext} from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import { AiOutlineArrowLeft} from 'react-icons/ai'


function Contact() {
    const context = useContext(Context);
    const contact = new DataAPI().getContact(context.language);

    return (
        <>
            <Header header={contact.info}/>
            {
                <section class="content-container background-secondary text-medium padding-secondary box-shadow border-radius-primary">
                    <h2>{contact.info}</h2>
                    <div class="contact-box">
                        <AiOutlineArrowLeft className="icon" />
                        <div className="margin-top">
                            <ul class="contact-list">
                                <li class="margin-bottom-primary">
                                    <span class="font-weight-primary color-secondary text-transform-primary">{contact.address}</span>
                                    <address>Zámecká 4001 464 01 Frýdlant</address>
                                </li>
                                <li class="margin-bottom-primary">
                                    <span class="font-weight-primary color-secondary text-transform-primary">{contact.reservation}</span>
                                    <address>zamek.rezervace@seznam.cz</address>
                                </li>
                                <li class="margin-bottom-primary">
                                    <span class="font-weight-primary color-secondary text-transform-primary">{contact.phone}</span>
                                    <address>+420 771 270 150</address>
                                </li>
                            </ul>
                        </div>
                        <div class="map-box">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80611.4856216651!2d14.978767699106092!3d50.84766716300532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47092e5555ec4efb%3A0xb81e27103a735e5c!2zWsOhbWVrIEZyw71kbGFudA!5e0!3m2!1scs!2scz!4v1659987294190!5m2!1scs!2scz"
                                style={{border:0}} allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade" class="map" title="map"></iframe>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}


export default Contact;
