import React from 'react';
import { useContext} from 'react';
import DataAPI from '../../DataAPI';
import { Context } from "../../Context"
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
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