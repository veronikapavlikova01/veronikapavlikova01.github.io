import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context"
import DataAPI from '../DataAPI'
import Header from "./Header";
import CustomDialog from "./dialogs/CustomDialog";
import WaitDialog from "./dialogs/WaitDialog";
import Tutorial from './content_components/Tutorial';
import { BrowserQRCodeReader } from "@zxing/browser";

function QRScanner() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const scan = dataAPI.getQRScanner(context.language);
    const tourIds = dataAPI.getTourIds(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [waitDialogOpen, setWaitDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false)

    useEffect(() => {
        document
            .getElementById("native_camera")
            .addEventListener("change", function () {
                let file = document.getElementById('native_camera').files[0];
                let url = window.URL.createObjectURL(file);
                const img = document.getElementById('picture');
                img.src=url;

                const reader = new BrowserQRCodeReader();
                reader.decodeFromImageElement(img).then((rslt) => {
                    console.log(rslt);
                    splitScannedText(rslt.text);
                }).catch((err) => {
                    console.error(err);
                    setDialogOpen(true);
                })
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
            } else {
                setWaitDialogOpen(false);
                setDialogOpen(true);
            }
        } else {
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

    const redirectToRoom = (tour, room) => {
        context.setTour(tour);
        context.setRoom(room);
        navigate("/room");
    }

    return (
        <>
            <WaitDialog isOpen={waitDialogOpen} isClosed={waitDialogClose} />
            <CustomDialog isOpen={dialogOpen} closeDialog={dialogClose} title={dialogs.error_label} content={dialogs.invalid_scan_label} />
            <Header header={scan.qr_scanner} />
            <Tutorial title={scan.title} label={scan.label} step_1={scan.step_1} step_2={scan.step_2} step_3={scan.step_3} step_4={scan.step_4}>
                <div className="center-text margin-primary ">
                    <label htmlFor="native_camera" className="text-medium button align-self-primary background-primary font-weight-primary color-primary cursor-primary">{scan.button}</label>
                    <input id="native_camera" type="file" accept="image/*" capture="environment" className="display-none" onClick={() => setWaitDialogOpen(true)} />
                </div>
                <img id="picture" src="" className="display-none" alt="person_picture" />
            </Tutorial>
        </>
    );
}

export default QRScanner;