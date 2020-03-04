import React from "react";

import {
    Divider,
    IconButton,
    Container,
    makeStyles,
    createStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

import {
    Settings,
} from "@material-ui/icons";

import {
    Calendar,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

import {HoundsSearch} from "../components";

const useStyles = makeStyles((theme: Theme) => createStyles({
    sidebarCalender: {
        padding: theme.spacing(1),
    },
    settingsButton: {
        position: "fixed",
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

interface SidebarProps {
    onDateChange?: (date: Date) => void
}

/**
 * @param {SidebarProps} props object to determine render
 * @return {React.ReactElement} React element to render
 */
function HoundsSidebar(props: SidebarProps) {
    // eslint-disable-next-line
    const classes = useStyles();
    const [date, updateDate] = React.useState(new Date());

    const onDateChange = (udate: Date | null) => {
        if (props.onDateChange) {
            const d = udate || date;
            props.onDateChange(d);
        }

        if (!udate) {
            return;
        }
        updateDate(udate);
    };

    return <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container className={classes.sidebarCalender}>
                <Calendar
                    date={date}
                    onChange={onDateChange}/>
            </Container>
            <Divider />
            <HoundsSearch />
        </MuiPickersUtilsProvider>
        <IconButton className={classes.settingsButton}>
            <Settings />
        </IconButton>
    </>;
}

export default HoundsSidebar;
