import * as faceapi from 'face-api.js';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Header from "./Header";
import DataAPI from '../DataAPI';
import { Context } from "../Context"
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
    const [errorLabel, setErrorLabel] = useState("");
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [recognitionDialogOpen, setRecognitionDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let isModelsLoaded = false;



    useEffect(() => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]).then(
            setIsLoading(false),
            isModelsLoaded = true
        );
        document
            .getElementById("native_camera")
            .addEventListener("change", function () {
                let file = document.getElementById('native_camera').files[0];
                let url = window.URL.createObjectURL(file);
                document.getElementById('person_picture').src = url;
                setIsLoading(true);
                handleImg();
            })
    }, []);

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const closeRecognitionDialog = () => {
        setRecognitionDialogOpen(false);
    };


    //funkce na detekovani a rozpoznani obliceje
    //detekce může trvat i několik sekund - proto byl zaveden spinner
    //prvni rozpoznavani trva i kolem 10s, dalsi uz jsou rychlejsi. Funguje rychleji, pokud je aplikace stažena
    const handleImg = async () => {
        console.log(isModelsLoaded);
        if(isModelsLoaded){
            console.log("handling img");
            let img = document.getElementById('person_picture');
            let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()

            console.log(fullFaceDescriptions);

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
            setWho(results[0].label);
            setRecognitionDialogOpen(true);
            console.log("done recognizing");
        }
    }

    return (
        <>
            <Header header={faceRecognitionLabels.face_recognition} />
            {isLoading ?
                <div className="spinner-container full-screen">
                    <div className="spinner" />
                </div>
                : <span />
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
            <Dialog open={recognitionDialogOpen} onClose={closeRecognitionDialog}>
                <DialogTitle>{dialogs.recognition_done}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogs.recognized_person_label}</DialogContentText>
                </DialogContent>
                <DialogContent>
                    <DialogContentText>{who}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeRecognitionDialog}>{dialogs.close_label}</Button>
                </DialogActions>
            </Dialog>
            <div className="flex content-container background-secondary padding-secondary border-radius-primary box-shadow">
                <h2 className="text-medium">{faceRecognitionLabels.title}</h2>
                <p className="margin-top-secondary margin-bottom-primary">{faceRecognitionLabels.label}</p>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">1.</span>
                    <span>{faceRecognitionLabels.step_1}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">2.</span>
                    <span>{faceRecognitionLabels.step_2}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">3.</span>
                    <span>{faceRecognitionLabels.step_3}</span>
                </div>
                <div className="flex-secondary margin-bottom-primary">
                    <span className="margin-right-secondary font-weight-primary text-medium">4.</span>
                    <span>{faceRecognitionLabels.step_4}</span>
                </div>
                <div className="center-text margin-primary ">
                    <label htmlFor="native_camera" className="text-medium button align-self-primary background-primary font-weight-primary color-primary cursor-primary">{faceRecognitionLabels.button}</label>
                    <input id="native_camera" type="file" accept="image/*" capture="environment" className="display-none" />
                </div>
                <img id="person_picture" src="" className="display-none" alt="person_picture" />
            </div>
        </>
    );
}

export default FaceRecognition;