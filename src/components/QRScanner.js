import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context"
import DataAPI from '../DataAPI'
import Header from "./Header";
import { Html5Qrcode } from "html5-qrcode";
import CustomDialog from "./CustomDialog";
import WaitDialog from "./WaitDialog";

function QRScanner() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const scan = dataAPI.getQRScanner(context.language);
    const tourIds = dataAPI.getTourIds(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [waitDialogOpen, setWaitDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document
            .getElementById("native_camera")
            .addEventListener("change", function () {
                setWaitDialogOpen(true);
                let file = document.getElementById('native_camera').files[0];
                let html5QrCode = new Html5Qrcode("reader");
                console.log(file);
                html5QrCode.scanFile(file, false)
                    .then(text => {
                        console.log("start splitting");
                        splitScannedText(text);
                    })
                    .catch(err => {
                        setWaitDialogOpen(false);
                        setDialogOpen(true);
                    });
            })
    }, []);

    const dialogClose = () => {
        setDialogOpen(false);
    };

    const waitDialogClose = () => {
        setWaitDialogOpen(false);
    };

    const splitScannedText = (text) => {
        let tourAndRoom = text.split(" ");
        let tour = tourAndRoom[0].toLowerCase();
        let room = parseInt(tourAndRoom[1]);

        if (tourExists(tour)) {
            if ((room >= 1) && (room <= dataAPI.getRooms(context.language, tour).length)) {
                redirectToRoom(tour, room);
            } else{
                setWaitDialogOpen(false);
                setDialogOpen(true);
            }
        } else{
            setWaitDialogOpen(false);
            setDialogOpen(true);
        }
    }

    const tourExists = (tour) => {
        for (let i = 0; i < tourIds.length; i++) {
            if (tourIds[i] === tour) {
                return true;
            }
        }
        return false;
    }

    function redirectToRoom(tour, room) {
        context.setTour(tour);
        context.setRoom(room);
        navigate("/room");
    }

    return (
        <>
            <WaitDialog isOpen={waitDialogOpen} isClosed={waitDialogClose}/>
            <CustomDialog isOpen={dialogOpen} closeDialog={dialogClose} title={dialogs.error_label} content={dialogs.invalid_scan_label}/>
            <Header header={scan.qr_scanner} />
            <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
                <h2 className="text-medium">{scan.title}</h2>
                <p className="margin-top-secondary margin-bottom-primary">{scan.label}</p>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">1.</span>
                    <span>{scan.step_1}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">2.</span>
                    <span>{scan.step_2}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">3.</span>
                    <span>{scan.step_3}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">4.</span>
                    <span>{scan.step_4}</span>
                </div>
                <div className="center-text margin-primary ">
                    <label htmlFor="native_camera" className="text-medium button align-self-primary background-primary font-weight-primary color-primary cursor-primary">{scan.button}</label>
                    <input id="native_camera" type="file" accept="image/*" capture="environment" className="display-none" />
                </div>
                <div id="reader" className="display-none" />
            </div>
        </>
    );
}

export default QRScanner;