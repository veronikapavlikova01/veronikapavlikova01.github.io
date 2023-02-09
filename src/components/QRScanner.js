import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useZxing } from "react-zxing";
import { Context } from "../Context"
import DataAPI from '../DataAPI'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function QRScanner() {
    const [result, setResult] = useState("");
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const scan = dataAPI.getScan(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const tourIds = dataAPI.getTourIds(context.language);
    const rooms = dataAPI.getRooms(context.language, context.tour);
    const navigate = useNavigate();

    const { ref } = useZxing({
        onResult(rslt) {
            setResult(rslt.getText());
            splitScannedText();
        },
    });

    function splitScannedText() {
        let tourAndRoom = result.split(" ");
        let tour = tourAndRoom[0].toLowerCase();
        let room = parseInt(tourAndRoom[1]);

        if (tourExists(tour)) {
            if ((room >= 1) && (room <= rooms.length)) {
                redirectToRoom(tour, room);
            }
        }
    }

    function tourExists(tour) {
        for (let i = 0; i < tourIds.length; i++) {
            if (tourIds[i] === tour) {
                return true;
            }
        }
        return false;
    }

    function redirectToRoom(tour, room) {
        console.log("redirecting");
        context.changeTour(tour);
        context.changeRoom(room);
        navigate("/room");
    }

    return (
        <>
            <video id="video" ref={ref} className="full-screen"/>
            <div className="video-label margin-top text-medium color-primary font-weight-primary center-text">
                <span>{scan.scan_label}</span>
            </div>
        </>
    );
}

export default QRScanner;