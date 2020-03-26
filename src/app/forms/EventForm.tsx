import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/styles";
import {
    FormControl,
    Grid,
    Button,
    TextField,
    InputLabel,
    Select,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import { KeyboardDateTimePicker, TimePicker } from "@material-ui/pickers";

import * as api from "@happyhoundhotel/hounds-ts";
import { ApiConfigContext, SettingsContext } from "../contexts";
import {
    startOfDay,
    differenceInMilliseconds,
    addMilliseconds,
} from "date-fns";
import { MaterialUiPickersDate as OptDate } from "@material-ui/pickers/typings/date";

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
        width: "45%",
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
    const { settings } = React.useContext(SettingsContext);
    const { apiConfig } = React.useContext(ApiConfigContext);

    const today = startOfDay(new Date());

    const [start, setStart] = React.useState(
        props.initEvent?.startDate || null
    );
    const updateStart = (nd: OptDate) => {
        console.log("NEW STARTDATE", nd);
        setStart(nd || null);
    };
    const [end, setEnd] = React.useState(props.initEvent?.endDate || null);
    const updateEnd = (nd: OptDate) => setEnd(nd || null);

    const [text, setText] = React.useState(props.initEvent?.text ?? "");
    const updateText = (ev: ChangeEvent<HTMLInputElement>) =>
        setText(ev.target.value);
    const [type, setType] = React.useState(props.initEvent?.type ?? "general");
    const updateType = (ev: ChangeEvent<{ name?: string; value: unknown }>) =>
        setType(ev.target.value as string);

    const submitFunc = props.onSubmit
        ? props.onSubmit
        : (ev: api.IHoundEvent) => api.addEvent(ev, apiConfig);

    const createEvent = (s: Date, e: Date) => {
        const isolateTime = (d: Date) =>
            differenceInMilliseconds(d, startOfDay(d));
        const uend = addMilliseconds(startOfDay(s), isolateTime(e));
        return {
            id: "",
            startDate: (start as any) as Date,
            endDate: uend,
            text,
            type,
        };
    };

    const clearForm = () => {
        setStart(null);
        setEnd(null);
        setText("");
        setType("general");
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
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="eventText"
                label="Event Text"
                name="eventText"
                inputProps={{ "data-testid": "event-text" }}
                value={text}
                onChange={updateText}
            />
            <Grid
                container
                justify="center"
                alignContent="center"
                direction="row"
            >
                <KeyboardDateTimePicker
                    className={classes.dateInputs}
                    required
                    inputVariant="outlined"
                    name="startDate"
                    aria-label="Start Date"
                    data-testid="start-date"
                    minutesStep={settings.eventTimeStep}
                    variant="inline"
                    label="Start"
                    onChange={updateStart}
                    value={start}
                />
                <TimePicker
                    className={classes.dateInputs}
                    minutesStep={settings.eventTimeStep}
                    inputVariant="outlined"
                    name="endDate"
                    aria-label="End Date"
                    data-testid="end-date"
                    required
                    variant="inline"
                    label="End"
                    onChange={updateEnd}
                    value={end}
                />
            </Grid>
            <FormControl>
                <InputLabel>Type</InputLabel>
                <Select
                    native
                    aria-label="Event Type"
                    inputProps={{ "data-testid": "event-type" }}
                    name="eventType"
                    required
                    variant="outlined"
                    value={type}
                    onChange={updateType}
                >
                    <option>general</option>
                    <option>grooming</option>
                    <option>visit</option>
                    <option>foster</option>
                    <option>eval</option>
                    <option>taxi</option>
                </Select>
            </FormControl>
            <Button
                data-testid="event-submit-button"
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
