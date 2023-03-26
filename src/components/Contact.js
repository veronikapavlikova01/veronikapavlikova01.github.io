import React from "react";
import { Context } from "../Context";
import { useContext, useEffect, useState } from "react";
import Header from './Header'
import DataAPI from '../DataAPI'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import map from '../img/other/map.png'


function Contact() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const contact = dataAPI.getContact(context.language);
    const header = dataAPI.getHeader(context.language);
    const [isOnline, setIsOnline] = useState(false);

    const redirect = (url) => {
        window.open(url, "_blank", "");
    }

    useEffect(() => {
        if (navigator.onLine) {
            setIsOnline(false);
          } else {
            setIsOnline(false);
          }
      }, [isOnline]);

    return (
        <>
            <Header header={header.contact} />
            {
                <div className="content-container background-secondary padding-secondary box-shadow border-radius-primary">
                    <div className="contact-box">
                        <div className="margin-top">
                            <ul className="contact-list">
                                <li className="margin-bottom-primary">
                                    <div className="flex-secondary">
                                        <span className="font-weight-primary text-transform-primary margin-right-secondary">{contact.address}</span>
                                        <OpenInNewIcon />
                                    </div>
                                    <span className="cursor-primary" onClick={() => redirect("https://www.google.com/maps/place/Z%C3%A1mek+Fr%C3%BDdlant/@50.9040814,15.0505186,11.54z/data=!4m6!3m5!1s0x47092e5555ec4efb:0xb81e27103a735e5c!8m2!3d50.9148748!4d15.0837108!16s%2Fg%2F1tftvn_y")}>Zámecká 4001 464 01 Frýdlant</span>
                                </li>
                                <li className="margin-bottom-primary flex">
                                    <span className="font-weight-primary text-transform-primary margin-right-secondary">{contact.reservation}</span>
                                    <a href="mailto:zamek.rezervace@seznam.cz">zamek.rezervace@seznam.cz</a>
                                </li>
                                <li className="margin-bottom-primary">
                                    <div className="flex-secondary">
                                        <span className="font-weight-primary text-transform-primary margin-right-secondary">{contact.web}</span>
                                        <OpenInNewIcon />
                                    </div>
                                    <span className="cursor-primary" onClick={() => redirect("https://www.zamek-frydlant.cz/cs")}>www.zamek-frydlant.cz</span>
                                </li>
                                <li className="margin-bottom-primary flex">
                                    <span className="font-weight-primary text-transform-primary">{contact.phone}</span>
                                    <a href="tel:771 270 150">+420 771 270 150</a>
                                </li>
                            </ul>
                        </div>
                        <div className="map-box">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80611.4856216651!2d14.978767699106092!3d50.84766716300532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47092e5555ec4efb%3A0xb81e27103a735e5c!2zWsOhbWVrIEZyw71kbGFudA!5e0!3m2!1scs!2scz!4v1659987294190!5m2!1scs!2scz"
                                style={{ border: 0 }} allowfullscreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade" className="map" title="map"></iframe>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default Contact;
