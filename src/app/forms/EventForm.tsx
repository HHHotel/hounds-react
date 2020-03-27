import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Button, Theme } from "@material-ui/core";
import * as api from "@happyhoundhotel/hounds-ts";
import { ApiConfigContext, SettingsContext } from "../contexts";
import {
    startOfDay,
    differenceInMilliseconds,
    addMilliseconds,
} from "date-fns";
import { TextInput, DateTimeInput, SelectInput, TimeInput } from "./FormInputs";

const useStyles = makeStyles((theme: Theme) => ({
    formWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
    formItem: {
        margin: theme.spacing(1, 0),
    },
    dateInputs: {
        margin: theme.spacing(0, 1, 1, 1),
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
        [theme.breakpoints.up("sm")]: {
            width: "45%",
        },
    },
}));

interface EventFormProps {
    onSubmit?: (ev: api.IHoundEvent) => void;
    initEvent?: api.IHoundEvent;
}

/**
 * @param {EventFormProps} props element props
 * @return {React.ReactElement} Element to render
 * */
function EventForm(props: EventFormProps) {
    const classes = useStyles();
    const { apiConfig } = React.useContext(ApiConfigContext);

    const startBind = React.useState(props.initEvent?.startDate || null);
    const endBind = React.useState(props.initEvent?.endDate || null);
    const textBind = React.useState(props.initEvent?.text ?? "");
    const typeBind = React.useState(props.initEvent?.type ?? "general");
    const start = startBind[0];
    const end = endBind[0];
    const text = textBind[0];
    const type = typeBind[0];

    const submitFunc = props.onSubmit
        ? props.onSubmit
        : (ev: api.IHoundEvent) => api.addEvent(ev, apiConfig);

    const createEvent = (s: Date, e: Date) => {
        const isolateTime = (d: Date) =>
            differenceInMilliseconds(d, startOfDay(d));
        const uend = addMilliseconds(startOfDay(s), isolateTime(e));
        return {
            id: props.initEvent?.id ?? "",
            startDate: (start as any) as Date,
            endDate: uend,
            text,
            type,
        };
    };

    const clearForm = () => {
        startBind[1](null);
        endBind[1](null);
        textBind[1]("");
        typeBind[1]("general");
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!start || !end) return; // TODO error beacuse inputs are required
        const ev = createEvent(start, end);
        clearForm();
        submitFunc(ev);
    };

    return (
        <form onSubmit={onSubmit} className={classes.formWrapper}>
            <Grid
                container
                justify="center"
                alignContent="center"
                direction="row"
            >
                <TextInput
                    label="Event Text"
                    required
                    name="eventText"
                    bind={textBind}
                />
                <DateTimeInput
                    required
                    label="Event Start"
                    name="eventStart"
                    className={classes.dateInputs}
                    bind={startBind}
                />
                <TimeInput
                    required
                    label="Event End"
                    name="eventEnd"
                    className={classes.dateInputs}
                    bind={endBind}
                />
            </Grid>
            <SelectInput
                required
                label="Event Type"
                name="eventType"
                bind={typeBind}
            >
                <option value="general">General</option>
                <option value="grooming">Grooming</option>
                <option value="visit">Visit</option>
                <option value="foster">Foster</option>
                <option value="eval">Eval</option>
                <option value="taxi">Taxi</option>
            </SelectInput>

            <Button
                className={classes.formItem}
                variant="contained"
                type="submit"
            >
                Submit
            </Button>
        </form>
    );
}

export default EventForm;
