import React from "react";
// eslint-disable-next-line
import {ReactElement} from "react";
import {
    Fab,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Grid,
    Drawer,
    makeStyles,
    createStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Menu,
    Add,
    ArrowLeft,
    ArrowRight,
    Home,
} from "@material-ui/icons";
import {
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    format,
    addDays,
    eachDayOfInterval,
} from "date-fns";
import HoundsList from "./houndslist/HoundsList";
import HoundsSidebar from "./sidebar/HoundsSidebar";
import DogForm from "./forms/DogForm";
import EventForm from "./forms/EventForm";
import {FormModal} from "./components";
import {ApiConfig} from "..";

import * as api from "@happyhoundhotel/hounds-ts";

const useStyles = makeStyles((theme: Theme) => createStyles({
    sidebarHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    addFab: {
        position: "fixed",
        right: theme.spacing(3),
        bottom: theme.spacing(3),
    },
}));

const FormTypes = {
    "dog": {
        open: false,
        formTitle: "New Dog",
        formEl: DogForm,
    },
    "event": {
        open: false,
        formTitle: "New Event",
        formEl: EventForm,
    },
};

interface WeekProps {
    logout: () => void
}

/**
 * @param {IHoundsWeekProps} props
 * @return {ReactElement} react element to render
 */
function HoundsWeek(props: WeekProps): ReactElement {
    // eslint-disable-next-line
    const classes = useStyles();
    const apiConfig = React.useContext(ApiConfig);

    const [dates, updateDates] = React.useState(getWeekArray(new Date()));
    const [week, updateWeek] = React.useState([] as api.IScheduleEvent[][]);
    const [drawerOpen, setDrawer] = React.useState(false);

    const [modalForm, setModalForm] = React.useState(FormTypes["event"]);
    const modalFormClose = () => setModalForm({...modalForm, open: false});
    const modalFormOpen = () => setModalForm({...modalForm, open: true});

    const toggleDrawer = () => setDrawer(!drawerOpen);

    React.useEffect(() => {
        goToWeek(new Date());
    }, []);

    // eslint-disable-next-line
    async function getWeek(d0: Date) {
        const week = await api.getWeek(d0, apiConfig);
        updateWeek(week);
        console.log("Loaded week", d0.toDateString());
    }

    // eslint-disable-next-line
    function goToWeek(d: Date) {
        const dArr = getWeekArray(d);
        updateDates(dArr);
        setDrawer(false);
        getWeek(dArr[0]);
    }

    // eslint-disable-next-line
    function getWeekArray(d: Date): Date[] {
        const day = d.getDay();
        // Monday is first day of week in this
        const distFromMon = (day === 0 ? 7 : day) - 1;
        const d0 = addDays(d, distFromMon * -1);
        const d6 = addDays(d0, 7);
        return eachDayOfInterval({
            start: d0,
            end: d6,
        });
    }

    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Drawer open={drawerOpen}
            onClose={() => toggleDrawer()}
            anchor="left">
            <HoundsSidebar onDateChange={goToWeek} logout={props.logout} />
        </Drawer>
        <AppBar position="sticky" color="default">
            <Toolbar>
                <IconButton onClick={() => toggleDrawer()} edge="start">
                    <Menu/>
                </IconButton>
                <Grid container
                    alignContent="center"
                    justify="center"
                    direction="row">
                    <Typography variant="h4"
                        color="inherit">
                        { format(dates[0], "LLL Y") }
                    </Typography>
                </Grid>
                <IconButton onClick={() => goToWeek(addDays(dates[0], -7))}
                    edge="end">
                    <ArrowLeft />
                </IconButton>
                <IconButton onClick={() => goToWeek(new Date())}
                    edge="end">
                    <Home />
                </IconButton>
                <IconButton onClick={() => goToWeek(addDays(dates[0], 7))}
                    edge="end">
                    <ArrowRight />
                </IconButton>
            </Toolbar>
        </AppBar>
        <HoundsList dates={dates} weekList={week}/>
        <FormModal open={modalForm.open}
            onClose={modalFormClose}
            title={modalForm.formTitle}>
            { modalForm.formEl({onSubmit: modalFormClose}) }
        </FormModal>
        <Fab color="primary" className={classes.addFab}
            onClick={modalFormOpen}>
            <Add />
        </Fab>
    </MuiPickersUtilsProvider>;
}
export default HoundsWeek;

