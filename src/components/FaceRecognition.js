import * as faceapi from 'face-api.js';
import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import DataAPI from '../DataAPI';
import { Context } from "../Context"
import CustomDialog from './dialogs/CustomDialog';
import WaitDialog from './dialogs/WaitDialog';
import Tutorial from './content_components/Tutorial';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FaceRecognition() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const frl = dataAPI.getFaceRecognition(context.language);
    const people = dataAPI.getFaceRecognitionPeople(context.language);
    const dialogs = dataAPI.getDialogs(context.language);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [waitDialogOpen, setWaitDialogOpen] = useState(false);
    const navigate = useNavigate();
    let isModelsLoaded = false;
    const [isResultDisplayed, setIsResultDisplayed] = useState(false);
    const [resultImage, setResultImage] = useState(false);
    const [resultName, setResultName] = useState(false);

    useEffect(() => {
        const MODEL_URL = process.env.PUBLIC_URL + '/models';
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]).then(
            isModelsLoaded = true
        );
        document
            .getElementById("native_camera")
            .addEventListener("change", function () {
                let file = document.getElementById('native_camera').files[0];
                let url = window.URL.createObjectURL(file);
                document.getElementById('person_picture').src = url;
                handleImg();
            })
    }, []);

    const dialogClose = () => {
        setDialogOpen(false);
    };

    const waitDialogClose = () => {
        setWaitDialogOpen(false);
    };


    //funkce na detekovani a rozpoznani obliceje
    //detekce může trvat i několik sekund - proto byl zaveden spinner
    //prvni rozpoznavani trva i kolem 10s, dalsi uz jsou rychlejsi. Funguje rychleji, pokud je aplikace stažena
    const handleImg = async () => {
        if (isModelsLoaded) {
            let img = document.getElementById('person_picture');
            let fullFaceDescriptions = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors()


            if (fullFaceDescriptions.length === 0) {
                waitDialogClose();
                setDialogOpen(true);
                return;
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
                waitDialogClose();
                setDialogOpen(true);
                return;
            });


            const maxDescriptorDistance = 0.6
            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, maxDescriptorDistance)

            const results = fullFaceDescriptions.map(fd => faceMatcher.findBestMatch(fd.descriptor))

            if (results[0].label === 'unknown') {
                waitDialogClose();
                setDialogOpen(true);
                return
            }

            setResultName(results[0].label);
            setResultImage(getPeopleImg(results[0].label));
            waitDialogClose();
            setIsResultDisplayed(true)

        }
    }

    //return image url
    const getPeopleImg = (name) => {
        for (let i = 0; i < people.length; i++) {
            if (people[i].name === name) {
                return people[i].img;
            }
        }
    }

    return (
        <>
            <Header header={frl.face_recognition} />
            <WaitDialog isOpen={waitDialogOpen} isClosed={waitDialogClose} />
            <CustomDialog isOpen={dialogOpen} closeDialog={dialogClose} title={dialogs.no_face_detected} content={dialogs.try_again_label} />
            {
                !isResultDisplayed ? 
                (
                    <Tutorial title={frl.title} label={frl.label} step_1={frl.step_1} step_2={frl.step_2} step_3={frl.step_3} step_4={frl.step_4} button={frl.button}>
                        <div className="center-text margin-primary ">
                            <label htmlFor="native_camera" className="text-medium button align-self-primary background-primary font-weight-primary color-primary cursor-primary">{frl.button}</label>
                            <input id="native_camera" type="file" accept="image/*" capture="environment" className="display-none" onClick={() => setWaitDialogOpen(true)} />
                        </div>
                        <img id="person_picture" src="." className="display-none" alt="person_picture" />
                    </Tutorial>
                ) 
                :
                (
                    <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                        <div className="font-size-third medieval-first-letter">
                            <div className="flex-secondary align-items-primary">
                                <h2 className="margin-right-primary margin-left-primary">{resultName}</h2>
                            </div>
                            <div className="margin-top-secondary">
                                <img src={require(`../img${resultImage}`)} alt="castle" className="page-image" />
                            </div>
                        </div>
                        <div className="flex-secondary padding-bottom-primary padding-top-primary align-items-primary">
                            <div className="flex round-item background-fourth margin-right-secondary" onClick={() =>setIsResultDisplayed(false)}>
                                <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary" />
                            </div>
                            <p className="text-medium font-weight-primary">{frl.button_back}</p>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default FaceRecognition;