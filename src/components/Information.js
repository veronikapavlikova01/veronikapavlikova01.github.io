import React from 'react';
import { Context } from "../Context";
import DataAPI from '../DataAPI';
import InfoIcon from '@mui/icons-material/Info';



function Information(props) {

    return (
        <div className="card box-shadow transition-primary padding-third margin-bottom-primary">
            <div className="flex">
                <div className="flex-secondary align-items-primary padding-bottom-primary">
                    <InfoIcon className="icon margin-right-secondary" />
                    <span className="font-weight-primary text-medium">{props.info}</span>
                </div>
                <span>{props.content}</span>
            </div>
        </div>
    )
}

export default Information;
