import {React} from "react";
import { useState, useEffect, useContext} from 'react';
import DataAPI from '../DataAPI';
import { Context } from "../Context"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function WaitDialog(props) {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const dialogs = dataAPI.getDialogs(context.language);

    return (
        <Dialog open={props.isOpen}>
            <DialogTitle disableTypography className="flex align-items-primary">
                <HourglassTopIcon className="color-secondary" />
                <h3>{dialogs.wait}</h3>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogs.wait_label}</DialogContentText>
            </DialogContent>
        </Dialog>
    );
}

export default WaitDialog;