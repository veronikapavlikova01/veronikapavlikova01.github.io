import { React, useState } from "react"
import { Link } from "react-router-dom"
import { Context } from "../Context"
import { useContext } from "react"
import Header from "./Header"
import DataAPI from '../DataAPI'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function FaceRecognitionResult() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const faceRecognitionLabels = dataAPI.getFaceRecognition(context.language);
    const people = dataAPI.getFaceRecognitionPeople(context.language);
    const [who, setWho] = useState("");


    return (
        <>
            <Header header={faceRecognitionLabels.face_recognition} />
            <div className="flex content-container background-secondary center-text padding-secondary box-shadow border-radius-primary">
                <div className="font-size-third medieval-first-letter">
                    <div className="flex-secondary align-items-primary">
                        <h2 className="margin-right-primary margin-left-primary">{context.image_name}</h2>
                    </div>
                    <div className="margin-top-secondary">
                        <img src={require(`../img${context.image_img}`)} alt="castle" className="page-image" />
                    </div>
                </div>
                <div className="flex-secondary padding-bottom-primary padding-top-primary align-items-primary">
                    <Link to="/image_recognition" className="flex round-item background-fourth margin-right-secondary">
                        <ArrowBackIcon className="round-item-content color-primary margin-top-third cursor-primary"/>
                    </Link>
                    <p className="text-medium font-weight-primary">{faceRecognitionLabels.button_back}</p>
                </div>
            </div>
        </>
    )

}

export default FaceRecognitionResult;



