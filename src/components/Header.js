import { NavLink, useNavigate } from 'react-router-dom'
import Dropdown from './Dropdown';
import { useContext, useState} from "react";
import { Context } from "../Context";
import DataAPI from '../DataAPI';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


function Header(props) {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const navbar = dataAPI.getNavbar(context.language);
    const install = dataAPI.getInstall(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => {setSidebar(!sidebar)}
    const [dialogOpen, setDialogOpen] = useState(false);
    const isSafariUsed = isSafari();
    const isIOSUsed = isIOS();
    const navigate = useNavigate();


    function isIOS(){
        const expression = /(Mac|iPhone|iPod|iPad)/i;
        if(expression.test(navigator.platform)){
            return true
        }
        return false
    }

    function isSafari(){
        const userAgent = navigator.userAgent;
        if(userAgent.includes("Safari")){
            if(!(userAgent.includes("Chrome") || userAgent.includes("Chromium"))){
                return true
            }
        }
        return false
    }

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
                window.installBannerDisplayed = false;
            }

        } else {
            openDialog();
        }
    } 

    return (
        <>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogs.install_download_label}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogs.install_step_1}</DialogContentText>
                    <DialogContentText>{isSafariUsed? dialogs.install_step_2_safari : dialogs.install_step_2}</DialogContentText>
                    <DialogContentText>{dialogs.install_step_3}</DialogContentText>
                    <DialogContentText className='font-weight-primary'>{(!isIOSUsed && !isSafariUsed)? dialogs.install_use_safari : ""}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{dialogs.close_label}</Button>
                </DialogActions>
            </Dialog>
            <header id="header" className="navigation background-primary stick-top z-index-nav flex-secondary align-items-primary">
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
                <ul id="navlist" className={sidebar? "navigation-list font-weight-primary flex navigation-list-active":"navigation-list flex font-weight-primary"} onClick={showSidebar}>
                    <li ><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/">{navbar.home}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/tours">{navbar.tours}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/rooms_overview">{navbar.map}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" onClick={()=> navigate(-1)}>{navbar.back}</NavLink></li>
                    <li><NavLink className="navigation-link text-medium font-weight-primary color-primary cursor-primary" to="/other">{navbar.other}</NavLink></li>
                    <li className={(window.installBannerDisplayed) ? "background-primary" : "display-none"}>
                        <div className="flex">
                            <span className="text-medium color-primary margin-bottom-primary">{install.install_label}</span>
                            <button onClick={onClick} id="downloadButton" className="margin-secondary background-secondary text-medium button background-primary color-secondary text-transform-primary font-weight-primary">{install.install}</button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}


export default Header