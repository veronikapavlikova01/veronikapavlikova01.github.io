import React from "react";
import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import Header from "./Header";
import DataAPI from '../DataAPI';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import CollectionsIcon from '@mui/icons-material/Collections';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PortraitIcon from '@mui/icons-material/Portrait';
import HelpIcon from '@mui/icons-material/Help';


function Other() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getHeader(context.language);
    const other = dataAPI.getOther(context.language);

    return (
        <>
            <Header header={header.menu} />
            <div className="content-container">
                <Link to="/history" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <HistoryEduIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.history}</span>
                    </div>
                </Link>
                <Link to="/gallery" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <CollectionsIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.gallery}</span>
                    </div>
                </Link>
                <Link to="/image_recognition" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <PortraitIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.image_recognition}</span>
                    </div>
                </Link>
                <Link to="/scan_room" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <QrCode2Icon className="round-item-content color-primary" />
                        </div>
                        <span>{other.scan_room}</span>
                    </div>
                </Link>
                <Link to="/where_to_next" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <NotListedLocationIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.where_to_next}</span>
                    </div>
                </Link>
                <Link to="/contact" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <LocalPhoneIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.contact}</span>
                    </div>
                </Link>
                <Link to="/settings" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <SettingsIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.settings}</span>
                    </div>
                </Link>
                <Link to="/help" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <HelpIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.help}</span>
                    </div>
                </Link>
                <Link to="/about_app" className="card box-shadow transition-primary hover-primary padding-third margin-bottom-primary">
                    <div className="flex-secondary align-items-primary">
                        <div className="flex round-item background-fourth margin-right-secondary">
                            <InfoIcon className="round-item-content color-primary" />
                        </div>
                        <span>{other.about_app}</span>
                    </div>
                </Link>
            </div>
        </>
    )
} export default Other;