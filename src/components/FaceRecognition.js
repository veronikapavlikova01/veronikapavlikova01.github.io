import * as faceapi from 'face-api.js';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import DataAPI from '../DataAPI';
import { Context } from "../Context"
import CameraIcon from '@mui/icons-material/Camera';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function FaceRecognition() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const faceRecognitionLabels = dataAPI.getFaceRecognition(context.language);
    const [who, setWho] = useState("");
    const [errorLabel, setErrorLabel] = useState("Error");
    const videoRef = React.useRef(null);
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //nacitani modelu pro face-api, obvykle trva trochu dele nez se nacte
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]).then(
            setModelsLoaded(true),
            setIsLoading(false),
            getVideo()
        );
    }, []);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: 'environment' }
        }).then(str => {
            videoRef.current.srcObject = str;
            videoRef.current.play();
        }).catch(err => {
            console.log("Not able to access webcam");
        });
    }

    const drawImage = () => {
        console.log("trying to detect face!");
        videoRef.current.pause();
        setIsLoading(true);
        handleImg();
    }

    const handleImg = async () => {
        if (modelsLoaded) {
            let fullFaceDescriptions = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors()

            if (fullFaceDescriptions.length === 0) {
                setErrorLabel(dialogs.no_face_detected);
                setIsLoading(false);
                setDialogOpen(true);
            }

            const labels = ['albrecht_valdstejn', 'antonin_pankrac_gallas', 'eduard_clamgallas', 'filip_josef_gallas', 'frantisek_ferdinand_gallas', 'jan_vaclav_gallas', 'katerina_redern', 'kristian_filip_clamgallas', 'kristian_krystof_clamgallas', 'matyas_gallas', 'melchior_redern', 'vilem_clamgallas']

            const labeledFaceDescriptors = await Promise.all(
                labels.map(async label => {
                    // fetch image data from urls and convert blob to HTMLImage element
                    const imgUrl = require(`../img/owners/${label}.jpg`);
                    const img = document.createElement('img');
                    img.src = imgUrl;

                    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                    const faceDescriptors = [fullFaceDescription.descriptor]
                    return new faceapi.LabeledFaceDescriptors(label, faceDescriptors)
                })
            ).catch(err => {
                setErrorLabel(dialogs.no_face_detected);
                setIsLoading(false);
                setDialogOpen(true);
            });


            const maxDescriptorDistance = 0.6
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

            const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

            if (results[0].label === 'unknown') {
                setErrorLabel(dialogs.no_known_face_detected);
                setIsLoading(false);
                setDialogOpen(true);
            }

            setIsLoading(false);
            setWho(results[0].label)
        }
    }

    return (
        <>
            { isLoading?
                <div className="spinner-container full-screen">
                    <div className="spinner" />
                </div>
                : <span/>
            }
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{errorLabel}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogs.try_again_label}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{dialogs.close_label}</Button>
                </DialogActions>
            </Dialog>
            <div className="full-screen">
                <video id="video" ref={videoRef} className="full-screen" />
                <div className="flex video-label margin-top text-medium color-primary font-weight-primary center-text">
                    <span>{faceRecognitionLabels.photo_label}</span>
                    <span>{who}</span>
                </div>
                <div className=" video-button padding-third">
                    <div className="flex round-item background-fourth bottom-label margin-auto cursor-primary">
                        <CameraIcon className="round-item-content color-primary" onClick={() => drawImage()} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FaceRecognition;