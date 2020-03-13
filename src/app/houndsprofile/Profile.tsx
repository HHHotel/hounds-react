import React from "react";

import {
    Grid,
    Typography,
    // makeStyles,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import BookingList from "./bookings/BookingsList";

import {ApiContext} from "../..";

/*
const useStyles = makeStyles((theme: Theme) => ({
}));
*/

interface ListProps {
    dogId: string,
}

/**
 * @param {ListProps} props
 * @return {React.ReactElement} el
 */
function BookingsList(props: ListProps) {
    // const classes = useStyles();
    const [dog, setDog] = React.useState({} as api.IHoundDog);
    const apiAuth = React.useContext(ApiContext);

    const updateDog = async () => {
        const udog = await api.retrieveDog(props.dogId, apiAuth);
        console.log(udog);
        setDog(udog);
    };

    React.useEffect(() => {
        updateDog();
    }, []);

    return <Grid container>
        <Typography variant="h4">{dog.name}</Typography>
        <BookingList bookings={dog.bookings} />
    </Grid>;
}

export default BookingsList;
