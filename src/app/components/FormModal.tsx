import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";
import {
    Typography,
    IconButton,
    Paper,
    Grid,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Close,
} from "@material-ui/icons";
import Draggable from "react-draggable";

const useStyles = makeStyles((theme: Theme) => ({
    modalContainer: {
        zIndex: 1101,
        position: "fixed",
        padding: theme.spacing(5),
        right: theme.spacing(3),
        bottom: theme.spacing(3),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            height: "100%",
            left: theme.spacing(0),
            top: theme.spacing(0),
        },
        [theme.breakpoints.up("md")]: {
            width: "50%",
        },
        [theme.breakpoints.up("lg")]: {
            width: "40%",
        },
    },
}));

interface FormModalProps {
    children: React.ReactElement
    open: boolean
    disableDrag?: boolean
    onClose?: (event: React.MouseEvent) => void
    title?: string
}

/**
 * @param {FormModalProps} props element props
 * @return {React.ReactElement} element
 */
export function FormModal(props: FormModalProps) {
    const classes = useStyles();

    const closeModal = (ev: React.MouseEvent) => {
        if (props.onClose) {
            props.onClose(ev);
        }
    };

    if (!props.open) {
        return null;
    }

    return <Draggable disabled={props.disableDrag} bounds="parent">
        <Paper className={classes.modalContainer}
            elevation={8}>
            <Grid container>
                <Grid container
                    justify="space-between">
                    <Typography variant="h5">
                        { props.title || "" }
                    </Typography>
                    <IconButton onClick={closeModal}>
                        <Close />
                    </IconButton>
                </Grid>
                <>
                    { props.children }
                </>
            </Grid>
        </Paper>
    </Draggable>;
}
