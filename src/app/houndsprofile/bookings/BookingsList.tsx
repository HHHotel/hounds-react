import React from "react";

import {
    Grid,
    Typography,
} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import Booking from "./Booking";

interface ListProps {
    bookings: api.IHoundEvent[],
}

/**
 * @param {ListProps} props
 * @return {React.ReactElement} el
 */
function BookingsList(props: ListProps) {
    if (!props.bookings || !props.bookings.map) {
        return null;
    }

    return <Grid container>
        <Typography variant="h5"> Bookings </Typography>
        {
            props.bookings.map((b) => <Booking key={b.id} data={b} />)
        }
    </Grid>;
}

export default BookingsList;
