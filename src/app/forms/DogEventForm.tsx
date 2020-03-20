import React from "react";
import {
    makeStyles,
} from "@material-ui/styles";
import {
    InputLabel,
    FormControlLabel,
    Checkbox,
    FormControl,
    Grid,
    Button,
    NativeSelect,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    TimePicker,
    DateTimePicker,
} from "@material-ui/pickers";
import {
    startOfDay,
} from "date-fns";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

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

interface DogEventForm {
    onSubmit: (houndsEvent: api.IHoundEvent, repeat: boolean) => void
}

/**
 * @param {any} props element props
 * @return {React.ReactElement} el
 * */
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

    const onSubmit = (event: React.FormEvent) => {
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
            {type === "daycare" ?
                (<>
                    <TimePicker className={classes.dateInputs}
                        required
                        variant="inline"
                        label="End"
                        onChange={(nval) => changeDateState(nval, setEnd)}
                        value={end}
                    />
                    <FormControlLabel label="Repeat Event"
                        control = {
                            <Checkbox value={repeat}
                                color="primary"
                                onChange={(ev) =>
                                    setRepeat(ev.target.checked)}
                            />
                        }/>
                </>
                ) : (
                    <DateTimePicker className={classes.dateInputs}
                        required
                        variant="inline"
                        label="End"
                        onChange={(nval) => changeDateState(nval, setEnd)}
                        value={end}/>
                )}
        </Grid>
        <Button className={classes.formItem}
            variant="contained"
            type="submit">
                    Submit
        </Button>
    </form>;
}

export default DogEventForm;
