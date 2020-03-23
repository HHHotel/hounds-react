import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";
import {
    FormControl,
    Grid,
    Button,
    TextField,
    Select,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    DateTimePicker,
    TimePicker,
} from "@material-ui/pickers";

import * as api from "@happyhoundhotel/hounds-ts";
import { ApiConfigContext, SettingsContext } from "../contexts";

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
 * @param {EventFormProps} props element props
 * @return {React.ReactElement} Element to render
 * */
function EventForm(props: EventFormProps) {
    const classes = useStyles();
    const { settings } = React.useContext(SettingsContext);
    const [start, setStart] = React.useState(null as any);
    const [end, setEnd] = React.useState(null as any);
    const [text, setText] = React.useState("");
    const [type, setType] = React.useState("general");
    const { apiConfig } = React.useContext(ApiConfigContext);

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

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        api.addEvent({
            id: "",
            startDate: start as any as Date,
            endDate: end as any as Date,
            text,
            type,
        }, apiConfig);

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
                minutesStep={settings.eventTimeStep}
                variant="inline"
                label="Start"
                onChange={(nval) => updateStart(nval)}
                value={start}
            />
            <TimePicker className={classes.dateInputs}
                minutesStep={settings.eventTimeStep}
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
