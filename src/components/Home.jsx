import Dropdown from "./Dropdown";
import { Context } from "../Context";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import DataAPI from '../DataAPI'
import CustomDialog from "./dialogs/CustomDialog";



function Home() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const home = dataAPI.getHome(context.language);
    const dialogs = dataAPI.getDialogs(context.language)
    const isIOSNotSafari = isIOS() && !isSafari()
    const [dialogOpen, setDialogOpen] = useState(isIOSNotSafari);

    useEffect(() => {
        let homepage = document.getElementById('homepage');
        let hour = new Date().getHours();
        if(hour>=6 && hour<12){
            homepage.classList.add("welcome-morning");
        }
        if(hour>=12 && hour<18){
            homepage.classList.add("welcome-afternoon");
        }
        if(hour>=18 && hour<22){
            homepage.classList.add("welcome-evening");
        }
        if(hour>=22){
            homepage.classList.add("welcome-night");
        }
      });

    function isIOS() {
        const expression = /(Mac|iPhone|iPod|iPad)/i;
        if (expression.test(navigator.platform)) {
            return true
        }
        return false
    }

    function isSafari() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Safari")) {
            if (!(userAgent.includes("Chrome") || userAgent.includes("Chromium"))) {
                return true
            }
        }
        return false
    }

    const dialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div id="homepage" className="welcome-background full-screen flex">
            <CustomDialog isOpen={dialogOpen} closeDialog={dialogClose} title={dialogs.warning} content={dialogs.install_use_safari} />
            <Dropdown />
            <div className="flex welcome-box">
                <h1 className="center-text welcome-text-large color-primary welcome-text">
                    {home.label_1}<br />{home.label_2}<br />{home.label_3}
                </h1>
                <Link to="/tours">
                    <button className="button margin-top-primary background-primary color-primary welcome-text-button font-weight-primary text-transform-primary" onClick={() => window.lastVisited}>
                        {home.button_label}
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default Home;
