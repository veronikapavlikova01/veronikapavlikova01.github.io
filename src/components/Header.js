import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown';
import { useContext, useState } from "react";
import { Context } from "../Context";
import DataAPI from '../DataAPI';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


function Header(props) {
    const language = useContext(Context);
    const dataAPI = new DataAPI();
    const navbar = dataAPI.getNavbar(language.language);
    const labels = dataAPI.getLabels(language.language);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {setSidebar(!sidebar)}
    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    async function onClick() {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            const { outcome } = await window.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                window.installButtonDisplayed = false;
            }

        } else {
            openDialog();
        }
    } 

    /*
    function shrinkNavbar() {
        var docHeight = document.documentElement.scrollTop;
        var header = document.getElementById("header");
        var navlist = document.getElementById("navlist");
        if (docHeight > 100 && header.style.height !== "70px") {
            header.style.height = "70px";
            navlist.classList.remove("navigation-list-active");
            if (sidebar) {
                navlist.classList.add("navigation-list-active-70");
            }
        } else if (docHeight < 70 && header.style.height !== "100px") {
            header.style.height = "100px";
            navlist.classList.remove("navigation-list-active-70");
            if (sidebar) {
                navlist.classList.add("navigation-list-active");
            }
        }
    }

    function navlistClasses() {
        if (sidebar) {
            var height = document.getElementById("header").style.height;
            if (height && height === "70px") {
                return "navigation-list-active-70";
            } else {
                return "navigation-list-active";
            }
        }
    }
    */

    return (
        <>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{labels.install_download_label}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{labels.install_step_1}</DialogContentText>
                    <DialogContentText>{labels.install_step_2}</DialogContentText>
                    <DialogContentText>{labels.install_step_3}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{labels.close_label}</Button>
                </DialogActions>
            </Dialog>
            <header id="header" className="navigation stick z-index-nav flex-secondary align-items-primary">
                <h1 id="headerLabel" className="text-header font-weight-primary color-primary margin-right-primary text-large">{props.header}</h1>
                <div className="flex-secondary align-items-primary z-index-nav">
                    <Dropdown></Dropdown>
                    <div className="hamburger" onClick={showSidebar}>
                        <span className={sidebar ? 'bar hamburger1' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger2' : 'bar'}></span>
                        <span className={sidebar ? 'bar hamburger3' : 'bar'}></span>
                    </div>
                </div>
            </header>
            <nav id="navbar">
                <ul id="navlist" className={sidebar? "navigation-list  navigation-list-active":"navigation-list"} onClick={showSidebar}>
                    <li ><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/">{navbar.home}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/tours">{navbar.tours}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/rooms_overview">{navbar.map}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/scan_room">{navbar.scan_room}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/history">{navbar.history}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/other">{navbar.other}</NavLink></li>
                    <li className={(window.installButtonDisplayed) ? "background-primary" : "display-none"}>
                        <div className="flex">
                            <span className="text-medium color-primary margin-bottom-primary">{labels.install_label}</span>
                            <button onClick={onClick} id="downloadButton" className="margin-secondary background-secondary text-medium button background-primary color-secondary text-transform-primary font-weight-primary">{labels.install_button}</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}


export default Header