import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Button, Theme } from "@material-ui/core";
import * as api from "@happyhoundhotel/hounds-ts";
import { ApiConfigContext } from "../contexts";
import { TextInput } from "./FormInputs";

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
    onSubmit?: (dog: api.IHoundDog) => void;
}

/**
 * @param {DogFormProps} props element props
 * @return {React.ReactElement} Element to render
 * */
function DogForm(props: DogFormProps) {
    const classes = useStyles();
    const { apiConfig } = React.useContext(ApiConfigContext);

    const nameBind = React.useState("");
    const clientNameBind = React.useState("");
    const dogName = nameBind[0];
    const clientName = clientNameBind[0];

    const clearForm = () => {
        nameBind[1]("");
        clientNameBind[1]("");
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const dog = {
            activeClient: true,
            id: "",
            name: dogName,
            clientName: clientName,
            bookings: [],
        };
        clearForm();
        // TODO check that the name is not already taken
        props.onSubmit ? props.onSubmit(dog) : api.addDog(dog, apiConfig);
    };

    return (
        <form onSubmit={onSubmit} className={classes.formWrapper}>
            <TextInput
                required
                label="Dog name"
                name="dogName"
                bind={nameBind}
            />
            <TextInput
                required
                label="Client Name"
                name="clientName"
                bind={clientNameBind}
            />
            <Button variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
}

export default DogForm;
