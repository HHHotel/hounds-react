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
 * @param {ListProps} props element props
 * @return {React.ReactElement} el
 */
function BookingsList(props: ListProps) {
    if (!props.bookings || !props.bookings.map) {
        return null;
    }

    return <Grid container>
        <Typography variant="h5"> Bookings </Typography>
        {
            /* TODO https://stackoverflow.com/questions/36708734/non-blocking-render-in-reactjs
            Dogs with many bookings blocks the main thread for a long time while
            while loading it should lazy render the bookings so as to not block
            */
            props.bookings
                .slice(0, 5)
                .map((b) => <Booking key={b.id} data={b} />)
        }
    </Grid>;
}

export default BookingsList;
