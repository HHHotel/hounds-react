import React from "react";
import {
    useHistory,
} from "react-router-dom";
import {
    makeStyles,
} from "@material-ui/styles";
import {
    Fab,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Grid,
    Drawer,
    Menu,
    MenuItem,
    CircularProgress,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    Menu as MenuIcon,
    Add,
    ArrowLeft,
    ArrowRight,
    Home,
} from "@material-ui/icons";
import {addDays, format} from "date-fns";

import {getWeekArray} from "./utils";

import HoundsList from "./houndslist/HoundsList";
import HoundsSidebar from "./HoundsSidebar";
import DogForm from "../../forms/DogForm";
import EventForm from "../../forms/EventForm";
import BookingForm from "../../forms/BookingForm";
import {FormModal} from "../../components/FormModal";
import {ApiConfigContext} from "../../contexts";

import * as api from "@happyhoundhotel/hounds-ts";

const useStyles = makeStyles((theme: Theme) => ({
    sidebarHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    addFab: {
        position: "fixed",
        right: theme.spacing(3),
        bottom: theme.spacing(3),
    },
    weekContainer: {
        height: "calc(100vh - 4rem)",
        overflowY: "scroll",
    },
}));

interface WeekProps {
    dates: Date[],
    setDates: (d: Date[]) => void,
}

/**
 * @param props properties to render
 * @return react element to render
 */
function HoundsWeek(props: WeekProps) {
    const classes = useStyles();
    const history = useHistory();
    const {apiConfig, setAuth} = React.useContext(ApiConfigContext);

    const [week, updateWeek] = React.useState([] as api.IScheduleEvent[][]);

    const getWeek = async (d0: Date) => {
        try {
            const week = await api.getWeek(d0, apiConfig);
            updateWeek(week);
            console.log("Loaded week", d0.toDateString());
        } catch (er) {
            console.error(er);
            setAuth(null);
            history.replace("/login");
        }
    };

    const goToWeek = (d: Date) => {
        props.setDates(getWeekArray(d));
    };
    const nextWeek = () => {
        goToWeek(addDays(props.dates[0], 7));
    };
    const prevWeek = () => {
        goToWeek(addDays(props.dates[0], -7));
    };
    React.useEffect(() => {
        getWeek(props.dates[0]);
    }, [props.dates]);

    const [drawerOpen, setDrawer] = React.useState(false);
    const toggleDrawer = () => setDrawer(!drawerOpen);

    const FORM_METADATA = {
        "booking": {
            title: "New Booking",
            type: "booking",
            open: false,
        },
        "dog": {
            title: "New Dog",
            type: "dog",
            open: false,
        },
        "event": {
            title: "New Event",
            type: "event",
            open: false,
        },
    };
    const [modalForm, setModalForm] = React.useState(FORM_METADATA["booking"]);
    const modalFormClose = () => setModalForm({
        ...modalForm,
        open: false,
    });
    const modalFormOpen = (type?: "booking" | "dog" | "event") => {
        if (type) {
            setModalForm({...FORM_METADATA[type], open: true});
        } else {
            setModalForm({...modalForm, open: true});
        }
    };

    let mainview;
    if (week.length > 0) {
        mainview = <HoundsList className={classes.weekContainer}
            dates={props.dates} weekList={week}/>;
    } else {
        mainview = <Grid container justify="center">
            <CircularProgress />
        </Grid>;
    }

    return <>
        <Drawer open={drawerOpen} onClose={toggleDrawer} anchor="left">
            <HoundsSidebar initDate={props.dates[0]} onDateChange={goToWeek} />
        </Drawer>
        <AppBar position="sticky" color="default">
            <Toolbar>
                <IconButton onClick={() => toggleDrawer()} edge="start">
                    <MenuIcon />
                </IconButton>
                <Grid container
                    alignContent="center"
                    justify="center"
                    direction="row">
                    <Typography variant="h4"
                        color="inherit">
                        {
                            /** TODO make cross week date correct */
                            format(props.dates[0], "LLL Y")
                        }
                    </Typography>
                </Grid>
                <IconButton onClick={prevWeek} edge="end">
                    <ArrowLeft />
                </IconButton>
                <IconButton onClick={() => goToWeek(new Date())} edge="end">
                    <Home />
                </IconButton>
                <IconButton onClick={nextWeek}
                    edge="end">
                    <ArrowRight />
                </IconButton>
            </Toolbar>
        </AppBar>
        {mainview}
        <AddMenu openModal={modalFormOpen}/>
        <FormModals />
    </>;

    // eslint-disable-next-line
    function FormModals() {
        const GetTypedModal = () => {
            switch (modalForm.type) {
            case "booking":
                return <BookingForm onSubmit={modalFormClose}/>;
            case "dog":
                return <DogForm onSubmit={modalFormClose}/>;
            case "event":
                return <EventForm onSubmit={modalFormClose}/>;
            default:
                return null;
            }
        };
        return <FormModal disableDrag={true}
            open={modalForm.open}
            onClose={modalFormClose}
            title={modalForm.title}>
            <GetTypedModal />
        </FormModal>;
    }
}
export default HoundsWeek;

// eslint-disable-next-line
function AddMenu({openModal}: any) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div>
        <Fab color="primary" className={classes.addFab}
            onClick={handleClick}>
            <Add />
        </Fab>
        <Menu anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClick={handleClose}
            onClose={handleClose}>
            <MenuItem onClick={() => openModal("booking")}>Booking</MenuItem>
            <MenuItem onClick={() => openModal("event")}>Event</MenuItem>
            <MenuItem onClick={() => openModal("dog")}>Dog</MenuItem>
        </Menu>
    </div>;
}

