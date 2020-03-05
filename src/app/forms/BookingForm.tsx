// TODO refractor and take out some of the crud in here
import React from "react";

import {
    // eslint-disable-next-line
    FormEvent,
} from "react";

import {
    InputLabel,
    FormControlLabel,
    Checkbox,
    FormControl,
    Grid,
    Button,
    makeStyles,
    NativeSelect,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    TimePicker,
    DatePicker,
    DateTimePicker,
} from "@material-ui/pickers";
import {
    differenceInDays,
    differenceInMilliseconds,
    startOfDay,
    addDays,
    addWeeks,
    addMonths,
} from "date-fns";

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

    const [formIndex, setFormIndex] = React.useState(0);
    const [booking, setBooking] = React.useState({} as api.IHoundEvent);
    const apiAuth = React.useContext(ApiConfig);

    const onSelectDog = (dog: api.IHoundDog | api.IHoundEvent) => {
        dog = dog as api.IHoundDog;
        if (!dog.id) {
            // TODO alert error
            return;
        }

        setBooking({
            ...booking,
            id: dog.id,
        });
        setFormIndex(1);
    };
    const onSubmitBooking = (ev: api.IHoundEvent, repeat: boolean) => {
        if (differenceInMilliseconds(ev.endDate, ev.startDate) < 0) {
            // TODO popup toast w/ error
            return;
        }
        if (ev.type === "daycare" &&
                differenceInDays(ev.endDate, ev.startDate) != 0) {
            // TODO popup toast w/ error
            return;
        }
        if (!repeat) { // one event just call the api and exit
            api.addEvent(ev, apiAuth);
            props.onSubmit();
            return;
        }

        setBooking({
            ...booking,
            ...ev,
        });
        setFormIndex(2);
    };

    const onRepeatSubmit = (opts: RepeatOpts) => {
        const evlist: api.IHoundEvent[] = [];
        let ev = {
            ...booking,
        };
        while (differenceInDays(opts.stop, ev.startDate) >= 0) {
            evlist.push(ev);
            api.addEvent(ev, apiAuth);
            ev = {
                ...ev,
                startDate: opts.incFunc(ev.startDate),
                endDate: opts.incFunc(ev.endDate),
            };
        }

        props.onSubmit();
        console.log(opts);
        console.log(evlist);
    };

    const subForms = [
        <HoundsSearch key="houndsSearch"
            filter={(el: any) => el.name ? true : false}
            onSelect={onSelectDog}/>,
        <DogEventForm key="dogEvent" onSubmit={onSubmitBooking}/>,
        <RepeatEventForm key="repeatForm" onSubmit={onRepeatSubmit}/>,
    ];

    return subForms[formIndex];
}

export default BookingForm;

interface DogEventForm {
    onSubmit: (houndsEvent: api.IHoundEvent, repeat: boolean) => void
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
    const [type, setType] = React.useState("boarding");
    const [repeat, setRepeat] = React.useState(false);

    const changeDateState = (ndate: Date | null, setFn: (d: Date) => void) => {
        if (!ndate) {
            return;
        }
        setFn(ndate as any as Date);
    };

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        const timeEnd = end.valueOf() - startOfDay(end).valueOf();
        const uend = startOfDay(start).valueOf() + timeEnd;

        props.onSubmit({
            startDate: start,
            endDate: new Date(uend),
            type,
        }, repeat);

        setStart(null);
        setEnd(null);
        setType("boarding");
    };

    return <form onSubmit={onSubmit}
        className={classes.formWrapper}>
        <FormControl>
            <InputLabel>Type</InputLabel>
            <NativeSelect onChange={(ev: any) => setType(ev.target.value)}
                value={type}
                required
                variant="outlined">
                <option>boarding</option>
                <option>daycare</option>
            </NativeSelect>
        </FormControl>
        <Grid container
            justify="center"
            alignContent="center"
            direction="row">
            <DateTimePicker className={classes.dateInputs}
                required
                variant="inline"
                label="Start"
                onChange={(nval) => changeDateState(nval, setStart)}
                value={start}
            />
            {type === "boarding" &&
                    <DateTimePicker className={classes.dateInputs}
                        required
                        variant="inline"
                        label="End"
                        onChange={(nval) => changeDateState(nval, setEnd)}
                        value={end}
                    />}
            {type === "daycare" &&
                        <TimePicker className={classes.dateInputs}
                            required
                            variant="inline"
                            label="End"
                            onChange={(nval) => changeDateState(nval, setEnd)}
                            value={end}
                        />}
            {type === "daycare" && <FormControlLabel
                control={<Checkbox value={repeat} color="primary"
                    onChange={(ev) => setRepeat(ev.target.checked)}/>}
                label="Repeat Event"/>}
        </Grid>
        <Button className={classes.formItem}
            variant="contained"
            type="submit">
                    Submit
        </Button>
    </form>;
}

interface RepeatOpts {
    stop: Date,
    incFunc: (d: Date) => Date,
}

enum RepeatType {
    // eslint-disable-next-line
    UNDEF = "undef",
    // eslint-disable-next-line
    MONTHLY = "Monthly",
    // eslint-disable-next-line
    WEEKLY = "Weekly",
    // eslint-disable-next-line
    DAILY = "Daily",
}

interface RepeatEventFormProps {
    onSubmit: (opts: RepeatOpts) => void
}

/**
 * @param {RepeatEventFormProps} props
 * @return {React.ReactElement} el
 * */
function RepeatEventForm(props: RepeatEventFormProps) {
    const classes = useStyles();
    const [stop, setStop] = React.useState(null as any);
    const [repeatType, setRepeatType] = React.useState(RepeatType.UNDEF);

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        props.onSubmit({
            stop,
            incFunc: getIncFunc(repeatType),
        });
    };

    const getIncFunc = (repeatType: RepeatType): (d: Date) => Date => {
        switch (repeatType) {
        case RepeatType.DAILY:
            return (d: Date) => addDays(d, 1);
        case RepeatType.WEEKLY:
            return (d: Date) => addWeeks(d, 1);
        case RepeatType.MONTHLY:
            return (d: Date) => addMonths(d, 1);
        default:
            return (d: Date) => addDays(d, 1);
        }
    };

    const updateStop = (ustop: Date | null) => {
        if (!ustop) {
            return;
        }
        setStop(ustop as any as Date);
    };

    return <>
        <form onSubmit={onSubmit} className={classes.formWrapper}>
            <DatePicker required
                className={classes.formItem}
                variant="inline"
                label="Stop"
                onChange={(nval) => updateStop(nval)}
                value={stop}
            />
            <FormControl className={classes.formItem} >
                <NativeSelect required
                    onChange={(ev: any) => setRepeatType(ev.target.value) }
                    variant="outlined">
                    <option>{RepeatType.DAILY}</option>
                    <option>{RepeatType.WEEKLY}</option>
                    <option>{RepeatType.MONTHLY}</option>
                </NativeSelect>
            </FormControl>
            <Button className={classes.formItem}
                variant="contained"
                type="submit">
                                Submit
            </Button>
        </form>
    </>;
}
