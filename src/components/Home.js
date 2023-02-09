import Dropdown from "./Dropdown";
import { Context } from "../Context";
import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import DataAPI from '../DataAPI'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";



function Home() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const home = dataAPI.getHome(context.language);
    const dialogs = dataAPI.getDialogs(context.language)
    const isIOSNotSafari = isIOS() && !isSafari()
    const [dialogOpen, setDialogOpen] = useState(isIOSNotSafari);

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

    const closeDialog = () => {
        setDialogOpen(false);
    };

    return (
        <div className="welcome-background full-screen flex">
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogs.warning}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogs.install_use_safari}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{dialogs.close_label}</Button>
                </DialogActions>
            </Dialog>
            <Dropdown />
            <div className="flex welcome-box">
                <h1 className="center-text welcome-text-large color-primary welcome-text">
                    {home.label_1}<br />{home.label_2}<br />{home.label_3}
                </h1>
                <Link to="/tours">
                    <button className="button margin-top-primary background-primary color-primary welcome-text-button font-weight-primary text-transform-primary">
                        {home.button_label}
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default Home;
