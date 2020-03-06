import React from "react";
import {
    makeStyles,
    Menu,
    MenuItem,
    Card,
    // eslint-disable-next-line
    Typography,
    Grid,
    IconButton,
    // eslint-disable-next-line
    Divider,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";
import {
    DateRange,
    Today,
    MoreVert,
} from "@material-ui/icons";
import {
    format,
} from "date-fns";
// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

const useStyles = makeStyles((theme: Theme) => ({
    bookingLabel: {
        flexGrow: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: "1.25rem",
    },
    bookingCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(1) / 2,
        width: "100%",
    },
}));

interface BookingProps {
    data: api.IHoundEvent
}

/**
 * @param {BookingProps} props
 * @return {React.ReactElement} el
 * */
function Booking(props: BookingProps) {
    const classes = useStyles();

    return <>
        <Card className={classes.bookingCard}>
            <Grid container
                alignContent="center"
                justify="center"
                direction="row">
                <div className={classes.bookingLabel}>
                    { props.data.type === "boarding" && <DateRange /> }
                    { props.data.type === "daycare" && <Today /> }
                    <div style={{width: "0.5rem"}} />
                    <Typography variant="overline" >
                        { formatBookingDates(props.data) }
                    </Typography>
                </div>
                <BookingMenu />
            </Grid>
        </Card>
    </>;
}

// eslint-disable-next-line
function formatBookingDates(booking: api.IHoundEvent) {
    const sameTOD =
        booking.startDate.getHours() >= 12 ===
        booking.endDate.getHours() >= 12;

    const start = booking.startDate;
    const end = booking.endDate;

    switch (booking.type) {
    case api.DEFAULT.CONSTANTS.BOARDING:
        return sameTOD ?
            `${format(start, "MM/d/y")} - ${format(end, "MM/d/y b")}` :
            `${format(start, "MM/d/y b")} - ${format(end, "MM/d/y b")}`;
    case api.DEFAULT.CONSTANTS.DAYCARE:
        return sameTOD ?
            format(end, "MM/d/y b") :
            `${format(start, "MM/d/y b")} - ${format(end, "b")}`;
    default:
        return "Error";
    }
}

// eslint-disable-next-line
function BookingMenu(props: any) {
    // eslint-disable-next-line
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // eslint-disable-next-line
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <div>
        <IconButton onClick={handleClick}>
            <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClick={handleClose}
            onClose={handleClose}>
            <MenuItem onClick={() => console.log()}>See</MenuItem>
            <MenuItem onClick={() => console.log()}>Edit</MenuItem>
            <MenuItem onClick={() => console.log()}>Delete</MenuItem>
        </Menu>
    </div>;
}

export default Booking;
