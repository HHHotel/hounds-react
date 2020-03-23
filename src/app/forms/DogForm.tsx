import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";

import {
    // eslint-disable-next-line
    FormEvent,
} from "react";

import {
    Button,
    TextField,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

import { ApiConfigContext } from "../contexts";

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
    onSubmit?: (dog: api.IHoundDog) => void
}

/**
 * @param {DogFormProps} props element props
 * @return {React.ReactElement} Element to render
 * */
function DogForm(props: DogFormProps) {
    const classes = useStyles();

    const [dogName, setDogName] = React.useState("");
    const [clientName, setClientName] = React.useState("");
    const { apiConfig } = React.useContext(ApiConfigContext);

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const dog = {
            activeClient: true,
            id: "",
            name: dogName,
            clientName: clientName,
            bookings: [],
        };
        setDogName("");
        setClientName("");

        if (!props.onSubmit) {
            api.addDog(dog, apiConfig);
        } else {
            props.onSubmit(dog);
        }
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
