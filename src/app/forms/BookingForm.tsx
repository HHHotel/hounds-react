// Basically its a search -> newevent form so yeah memes -> repeat thing
import React from "react";

import {
    // eslint-disable-next-line
    FormEvent,
} from "react";

import {
    FormControl,
    Grid,
    Button,
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
import {HoundsSearch} from "../components";

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
    searchContainer: {
        height: "50vh",
        width: "100%",
    },
}));

interface BookingFormProps {
    onSubmit: () => void
}

/**
 * @param {BookingFormProps} props
 * @return {React.ReactElement} Element to render
 * */
function BookingForm(props: BookingFormProps) {
    // eslint-disable-next-line
    const classes = useStyles();

    return <>
        <SearchForm />
    </>;
}

export default BookingForm;

interface DogEventForm {
    onSubmit: (houndsEvent: api.IHoundEvent) => void
}

/**
 * @param {any} props
 * @return {React.ReactElement} el
 * */
// eslint-disable-next-line
function DogEventForm(props: any) {
    const classes = useStyles();
    const [start, setStart] = React.useState(null as any);
    const [end, setEnd] = React.useState(null as any);
    const [type, setType] = React.useState("");
    // eslint-disable-next-line
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

        setStart(null);
        setEnd(null);
        setType("booking");
        props.onSubmit({
            startDate: start,
            endDate: end,
            type,
            id: "",
        });
    };

    return <form onSubmit={onSubmit}
        className={classes.formWrapper}>
        <FormControl>
            <Select label="Type"
                native
                required
                variant="outlined">
                <option>Boarding</option>
                <option>Daycare</option>
            </Select>
        </FormControl>
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
        <Button className={classes.formItem}
            variant="contained"
            type="submit">
            Submit
        </Button>
    </form>;
}

interface SearchForm {
    onSubmit: () => void
}

/**
 * @param {any} props
 * @return {React.ReactElement} el
 * */
function SearchForm(props: any) {
    const classes = useStyles();
    // eslint-disable-next-line
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        props.onSubmit();
    };

    return <div className={classes.searchContainer}>
        <HoundsSearch filter={(el: any) => el.name ? true : false} />
    </div>;
}
