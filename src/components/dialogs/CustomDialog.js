import { React, useContext } from "react";
import DataAPI from '../../DataAPI';
import { Context } from "../../Context"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

function CustomDialog(props) {
    const context = useContext(Context);
    const dataAPI = new DataAPI();
    const dialogs = dataAPI.getDialogs(context.language);

    return (
        <Dialog open={props.isOpen}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.closeDialog}>{dialogs.close_label}</Button>
        </DialogActions>
    </Dialog>
    );
}

export default CustomDialog;