import { Context } from "../Context";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { AiOutlinePhone, AiOutlinePicture, AiOutlineQuestion, AiOutlineInfoCircle } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import Header from "./Header";
import DataAPI from '../DataAPI';
import small_icon from '../img/icons/icon-256.png'

function Settings() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const header = dataAPI.getOther(context.language);
    const settings = dataAPI.getSettings(context.language);
    return (
        <>
            <Header header={header.settings} />
            <section className="content-container background-secondary padding-secondary box-shadow border-radius-primary">
                <div>
                    <h2 className="padding-bottom-primary">{settings.letter}</h2>
                    <div onClick={()=>context.changeFontSize("d")} className="font-size-default flex-secondary align-items-primary box-shadow transition-primary hover-primary padding-third margin-bottom-primary border-radius-primary cursor-primary">
                        <span className="margin-right-secondary font-weight-primary">Aa</span>
                        <span>{settings.default}</span>
                    </div>
                    <div onClick={()=>context.changeFontSize("m")} className="font-size-medium flex-secondary align-items-primary box-shadow transition-primary hover-primary padding-third margin-bottom-primary border-radius-primary cursor-primary">
                        <span className="margin-right-secondary font-weight-primary">Aa</span>
                        <span>{settings.medium}</span>
                    </div>
                    <div onClick={()=>context.changeFontSize("l")} className="font-size-large flex-secondary align-items-primary box-shadow transition-primary hover-primary padding-third margin-bottom-primary border-radius-primary cursor-primary">
                        <span className="margin-right-secondary font-weight-primary">Aa</span>
                        <span>{settings.large}</span>
                    </div>
                </div>
            </section>
        </>
    )
} export default Settings;