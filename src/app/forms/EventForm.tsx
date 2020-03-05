import React from "react";

import {
    // eslint-disable-next-line
    FormEvent,
} from "react";

import {
    FormControl,
    Grid,
    Button,
    TextField,
    makeStyles,
    Select,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    DateTimePicker,
} from "@material-ui/pickers";

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
    formItem: {
        margin: theme.spacing(1, 0),
    },
    dateInputs: {
        margin: theme.spacing(0, 1, 1, 1),
        width: "45%",
    },
}));

interface EventFormProps {
    onSubmit: () => void
}

/**
 * @param {EventFormProps} props
 * @return {React.ReactElement} Element to render
 * */
function EventForm(props: EventFormProps) {
    const classes = useStyles();

    const [start, setStart] = React.useState(null as any);
    const [end, setEnd] = React.useState(null as any);
    const [text, setText] = React.useState("");
    const [type, setType] = React.useState("general");
    const apiAuth = React.useContext(ApiConfig);

    const updateStart = (ustart: Date | null) => {
        if (!ustart) {
            return;
        }
        setStart(ustart as any as Date);
    };
    const updateEnd = (uend: Date | null) => {
        if (!uend) {
            return;
        }
        setEnd(uend as any as Date);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        api.addEvent({
            id: "",
            startDate: start as any as Date,
            endDate: end as any as Date,
            text,
            type,
        }, apiAuth);

        setStart(null);
        setEnd(null);
        setText("");
        setType("general");
        props.onSubmit();
    };

    return <form onSubmit={onSubmit}
        className={classes.formWrapper}>
        <TextField variant="outlined"
            margin="normal"
            required
            fullWidth
            id="eventText"
            label="Event Text"
            name="eventText"
            value={text}
            onChange={(ev) => setText(ev.target.value)}
        />
        <Grid container
            justify="center"
            alignContent="center"
            direction="row">
            <DateTimePicker className={classes.dateInputs}
                required
                variant="inline"
                label="Start"
                onChange={(nval) => updateStart(nval)}
                value={start}
            />
            <DateTimePicker className={classes.dateInputs}
                required
                variant="inline"
                label="End"
                onChange={(nval) => updateEnd(nval)}
                value={end}
            />
        </Grid>
        <FormControl>
            <Select label="Type"
                native
                required
                variant="outlined">
                <option>general</option>
                <option>grooming</option>
                <option>visit</option>
                <option>foster</option>
                <option>eval</option>
                <option>taxi</option>
            </Select>
        </FormControl>
        <Button className={classes.formItem}
            variant="contained"
            type="submit">
            Submit
        </Button>
    </form>;
}

export default EventForm;
