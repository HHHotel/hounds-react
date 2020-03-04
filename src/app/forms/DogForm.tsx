import React from "react";

import {
    // eslint-disable-next-line
    FormEvent,
} from "react";

import {
    Button,
    TextField,
    makeStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

import {ApiConfig} from "../..";

const useStyles = makeStyles((theme: Theme) => ({
    formWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
}));

interface DogFormProps {
    onSubmit: () => void
}

/**
 * @param {DogFormProps} props
 * @return {React.ReactElement} Element to render
 * */
function DogForm(props: DogFormProps) {
    const classes = useStyles();

    const [dogName, setDogName] = React.useState("");
    const [clientName, setClientName] = React.useState("");
    const apiAuth = React.useContext(ApiConfig);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        api.addDog({
            activeClient: true,
            id: "",
            name: dogName,
            clientName: clientName,
            bookings: [],
        }, apiAuth);

        setDogName("");
        setClientName("");
        props.onSubmit();
    };

    return <form onSubmit={onSubmit}
        className={classes.formWrapper}>
        <TextField variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dogName"
            label="Dog name"
            name="name"
            autoFocus
            value={dogName}
            onChange={(ev) => setDogName(ev.target.value)}
        />
        <TextField variant="outlined"
            margin="normal"
            required
            fullWidth
            id="clientName"
            label="Client Name"
            name="clientName"
            autoFocus
            value={clientName}
            onChange={(ev) => setClientName(ev.target.value)}
        />
        <Button variant="contained"
            type="submit">
            Submit
        </Button>
    </form>;
}

export default DogForm;
