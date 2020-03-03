// eslint-disable-next-line
import React from "react";
import "./ListItem.css";

import {Typography} from "@material-ui/core";
// eslint-disable-next-line
import {Theme} from "@material-ui/core";

// eslint-disable-next-line
import * as api from "@happyhoundhotel/hounds-ts";

interface IListItemProps {
    sevent: api.IHoundBooking
}

/**
 * @param {any} props object to determine render
 * @return {React.Node} React element to render
 */
function ListItem(props:any) {
    const classes = `event-text ${props.sevent.type}`;
    // eslint-disable-next-line
    return <Typography className={classes}>
        {getEventText(props.sevent)}
    </Typography>
    ;
}

// eslint-disable-next-line
function getEventText(sevent: api.IHoundAPIBooking) {
    if (!sevent.startDate) {
        return sevent.text;
    }
    const event = {
        ...sevent,
        startDate: new Date(sevent.startDate),
        endDate: new Date(sevent.endDate),
    };
    const prepend = event.startDate && api.getTimePrepend(event);
    return `${prepend} ${event.text}`;
}

export default ListItem;
