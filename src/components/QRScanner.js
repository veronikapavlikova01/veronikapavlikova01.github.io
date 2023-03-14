import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context"
import DataAPI from '../DataAPI'
import Header from "./Header";
import { useZxing } from "react-zxing";
import CustomDialog from "./dialogs/CustomDialog";
import WaitDialog from "./dialogs/WaitDialog";
import Tutorial from './content_components/Tutorial';
import Button from './content_components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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


    const { ref } = useZxing({
        onResult(rslt) {
            splitScannedText(rslt.getText());
        },
    });

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
            {
                !isScanning ?
                    (
                        <>
                            <Header header={scan.qr_scanner} />
                            <Tutorial title={scan.title} label={scan.label} step_1={scan.step_1} step_2={scan.step_2} step_3={scan.step_3} step_4={scan.step_4}>
                                <div className="align-self-primary" onClick={() => setIsScanning(true)}>
                                    <Button button={scan.button} />
                                </div>
                                <div id="reader" className="display-none" />
                            </Tutorial>
                        </>
                    )
                    :
                    (
                        <>
                            <video id="player" ref={ref} className="full-screen" />
                            <div className="video-label margin-top text-medium font-weight-primary center-text">
                                <span>{scan.qr_scanner}</span>
                            </div>
                            <div className="video-button flex-secondary padding-bottom-primary padding-top-primary align-items-primary">
                                <div className="flex round-item background-fourth margin-right-secondary" onClick={() => setIsScanning(false)}>
                                    <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" />
                                </div>
                                <p className="text-medium font-weight-primary">{scan.button_back}</p>
                            </div>
                        </>
                    )
            }
        </>
    );
}

export default QRScanner;