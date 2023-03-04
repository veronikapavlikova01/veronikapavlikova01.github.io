import * as faceapi from 'face-api.js';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import DataAPI from '../DataAPI';
import { Context } from "../Context"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import loading from '../img/other/loading.gif'

function FaceRecognition() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const faceRecognitionLabels = dataAPI.getFaceRecognition(context.language);
    const people = dataAPI.getFaceRecognitionPeople(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
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


    //funkce na detekovani a rozpoznani obliceje
    //detekce může trvat i několik sekund - proto byl zaveden spinner
    //prvni rozpoznavani trva i kolem 10s, dalsi uz jsou rychlejsi. Funguje rychleji, pokud je aplikace stažena
    const handleImg = async () => {
        if(isModelsLoaded){
            let img = document.getElementById('person_picture');
            let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()


            if (fullFaceDescriptions.length === 0) {
                setIsLoading(false);
                setDialogOpen(true);
                return
            }

            const labeledFaceDescriptors = await Promise.all(
                people.map(async human => {
                    const imgUrl = require(`../img${human.img}`);
                    //face api takes only html element
                    const img = document.createElement('img');          
                    img.src = imgUrl;

                    const fullFaceDescription = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()

                    const faceDescriptors = [fullFaceDescription.descriptor]
                    return new faceapi.LabeledFaceDescriptors(human.name, faceDescriptors)
                })
            ).catch(err => {
                setIsLoading(false);
                setDialogOpen(true);
            });


            const maxDescriptorDistance = 0.6
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

            const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

            if (results[0].label === 'unknown') {
                setIsLoading(false);
                setDialogOpen(true);
                return
            }

            setIsLoading(false);
            var peopleImg = getPeopleImg(results[0].label);
            context.setImageRecognitionName(results[0].label)
            context.setImageRecognitionImg(peopleImg)
            
            navigate('/image_recognition_result')
        }
    }

    //return image url
    const getPeopleImg = (name) =>{
        for(let i =0; i< people.length;i++){
            if(people[i].name===name){
                return people[i].img;
            }
        }
    }

    return (
        <>
            <Header header={faceRecognitionLabels.face_recognition} />
            <div className={isLoading? "spinner-container full-screen" : "display-none"}>
                <img src={loading} className="icon"/>
            </div>
            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>{dialogs.no_face_detected}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogs.try_again_label}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>{dialogs.close_label}</Button>
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
                    <input id="native_camera" type="file" accept="image/*" capture="environment" className="display-none"/>
                </div>
                <img id="person_picture" src="" className="display-none" alt="person_picture" />
            </div>
        </>
    );
}

export default FaceRecognition;