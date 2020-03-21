import React from "react";
import {
    useParams,
} from "react-router-dom";
import {
// makeStyles,
} from "@material-ui/styles";

import {
    Grid,
    Typography,
    // eslint-disable-next-line
    Theme,
} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";
import {ApiConfigContext} from "../../contexts";

import BookingList from "./bookings/BookingsList";
import HoundsNav from "../../components/HoundsNav";

/*
const useStyles = makeStyles((theme: Theme) => ({
}));
*/

interface ListProps {
    dogId?: string,
}

/**
 * @param {ListProps} props element props
 * @return {React.ReactElement} el
 */
function DogProfile(props: ListProps) {
    // const classes = useStyles();
    const [dog, setDog] = React.useState({} as api.IHoundDog);
    const {apiConfig} = React.useContext(ApiConfigContext);
    const {dogId} = useParams();

    const updateDog = async () => {
        const id = props.dogId || dogId;
        if (!id) {
            return null;
        }

        const udog = await api.retrieveDog(id, apiConfig);
        setDog(udog);
    };

    React.useEffect(() => {
        updateDog();
    }, []);

    return <>
        <HoundsNav title="Profile"/>
        <Grid container>
            <Typography variant="h4">{dog.name}</Typography>
            <BookingList bookings={dog.bookings} />
        </Grid>
    </>;
}

export default DogProfile;
