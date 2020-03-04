import React from "react";
import {
    // eslint-disable-next-line
    MouseEvent
} from "react";

import {
    Typography,
    IconButton,
    Paper,
    Grid,
    makeStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Close,
} from "@material-ui/icons";
import Draggable from "react-draggable";

const useStyles = makeStyles((theme: Theme) => ({
    modalContainer: {
        zIndex: 2,
        position: "fixed",
        width: "50%",
        padding: theme.spacing(5),
        right: theme.spacing(3),
        bottom: theme.spacing(3),
    },
}));

interface FormModalProps {
    children: React.ReactElement
    open: boolean
    onClose?: (event: MouseEvent) => void
    title?: string
}

/**
 * @param {FormModalProps} props
 * @return {React.ReactElement}
 */
export function FormModal(props: FormModalProps) {
    const classes = useStyles();
    return <> { props.open &&
        <Draggable
            bounds="parent">
            <Paper className={classes.modalContainer}
                elevation={8}>
                <Grid container
                    justify="space-between">
                    <Typography variant="h5">
                        { props.title || "" }
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid container>
                    { props.children }
                </Grid>
            </Paper>
        </Draggable>
    }</>;
}
