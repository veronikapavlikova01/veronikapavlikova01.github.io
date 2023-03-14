import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context"
import DataAPI from '../DataAPI'
import Header from "./Header";
import Tutorial from './content_components/Tutorial';
import Button from './content_components/Button';

function ScanRoom() {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const scan = dataAPI.getQRScanner(context.language);

    return (
        <>
            <Header header={scan.qr_scanner} />
            <Tutorial title={scan.title} label={scan.label} step_1={scan.step_1} step_2={scan.step_2} step_3={scan.step_3} step_4={scan.step_4}>
                <Link to="/scanner" className="align-self-primary">
                    <Button button={scan.button} />
                </Link>
                <img id="picture" src="" className="display-none" alt="person_picture" />
            </Tutorial>
        </>
    );
}

export default ScanRoom;