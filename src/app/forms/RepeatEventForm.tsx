import React from "react";
import {
    FormControl,
    Button,
    makeStyles,
    NativeSelect,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    DatePicker,
} from "@material-ui/pickers";
import {
    addDays,
    addWeeks,
    addMonths,
} from "date-fns";

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

export interface RepeatOpts {
    stop: Date,
    incFunc: (d: Date) => Date,
}

/* eslint-disable no-unused-vars */
enum RepeatType {
    UNDEF = "undef",
    MONTHLY = "Monthly",
    WEEKLY = "Weekly",
    DAILY = "Daily",
}
/* eslint-enable no-unused-vars */


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

    const onSubmit = (ev: React.FormEvent) => {
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

export default RepeatEventForm;
